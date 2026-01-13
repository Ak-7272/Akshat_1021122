import { useEffect, useState } from "react";
import api from "../api/axios";
import { DragDropContext, Draggable, Droppable } from "@hello-pangea/dnd";

const statusOrder = ["pending", "in-progress", "completed"];

const groupByStatus = (tasks) => {
  const columns = {
    pending: [],
    "in-progress": [],
    completed: []
  };
  tasks.forEach((task) => {
    columns[task.status].push(task);
  });
  return columns;
};

const Board = () => {
  const [columns, setColumns] = useState({
    pending: [],
    "in-progress": [],
    completed: []
  });
  const [loading, setLoading] = useState(true);
  const [form, setForm] = useState({
    title: "",
    description: "",
    due_date: ""
  });

  const fetchTasks = async () => {
    setLoading(true);
    try {
      const res = await api.get("/tasks");
      setColumns(groupByStatus(res.data));
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTasks();
  }, []);

  const handleDragEnd = async (result) => {
    const { source, destination, draggableId } = result;
    if (!destination) return;

    const sourceStatus = source.droppableId;
    const destStatus = destination.droppableId;

    if (sourceStatus === destStatus && source.index === destination.index) {
      return;
    }

    const sourceTasks = Array.from(columns[sourceStatus]);
    const [moved] = sourceTasks.splice(source.index, 1);

    const destTasks =
      sourceStatus === destStatus
        ? sourceTasks
        : Array.from(columns[destStatus]);

    destTasks.splice(destination.index, 0, moved);

    const newColumns = {
      ...columns,
      [sourceStatus]:
        sourceStatus === destStatus ? destTasks : sourceTasks,
      [destStatus]: destTasks
    };

    setColumns(newColumns);

    try {
      await api.patch(`/tasks/${draggableId}/status`, {
        status: destStatus
      });
    } catch (err) {
      console.error(err);
      fetchTasks(); // rollback on error
    }
  };

  const handleFormChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleCreateTask = async (e) => {
    e.preventDefault();
    try {
      const res = await api.post("/tasks", {
        ...form,
        status: "pending"
      });
      setColumns((prev) => ({
        ...prev,
        pending: [res.data, ...prev.pending]
      }));
      setForm({ title: "", description: "", due_date: "" });
    } catch (err) {
      console.error(err);
      alert("Failed to create task");
    }
  };

  return (
    <div className="p-4">
      {/* Create task form */}
      <div className="mb-4 rounded bg-white p-4 shadow">
        <h2 className="mb-2 text-lg font-semibold">Create new task</h2>
        <form
          onSubmit={handleCreateTask}
          className="flex flex-col gap-2 md:flex-row"
        >
          <input
            name="title"
            placeholder="Title"
            value={form.title}
            onChange={handleFormChange}
            className="flex-1 rounded border px-3 py-2 text-sm"
            required
          />
          <input
            name="description"
            placeholder="Short description"
            value={form.description}
            onChange={handleFormChange}
            className="flex-1 rounded border px-3 py-2 text-sm"
          />
          <input
            type="date"
            name="due_date"
            value={form.due_date}
            onChange={handleFormChange}
            className="rounded border px-3 py-2 text-sm"
            required
          />
          <button className="rounded bg-blue-600 px-4 py-2 text-sm font-semibold text-white hover:bg-blue-700">
            Add
          </button>
        </form>
      </div>

      {loading ? (
        <div className="text-center text-sm">Loading tasks...</div>
      ) : (
        <DragDropContext onDragEnd={handleDragEnd}>
          <div className="flex flex-col gap-4 md:flex-row">
            {statusOrder.map((statusKey) => (
              <div key={statusKey} className="flex-1 rounded bg-gray-100 p-3">
                <h3 className="mb-2 text-sm font-semibold capitalize">
                  {statusKey === "in-progress" ? "In Progress" : statusKey}
                </h3>
                <Droppable droppableId={statusKey}>
                  {(provided) => (
                    <div
                      ref={provided.innerRef}
                      {...provided.droppableProps}
                      className="min-h-[120px]"
                    >
                      {columns[statusKey].map((task, index) => (
                        <Draggable
                          key={task._id}
                          draggableId={task._id}
                          index={index}
                        >
                          {(dragProvided) => (
                            <div
                              ref={dragProvided.innerRef}
                              {...dragProvided.draggableProps}
                              {...dragProvided.dragHandleProps}
                            >
                              <div className="mb-2">
                                <div className="rounded border bg-white px-3 py-2 text-sm shadow-sm">
                                  <h4 className="font-semibold">
                                    {task.title}
                                  </h4>
                                  {task.description && (
                                    <p className="mt-1 text-xs text-gray-600 line-clamp-2">
                                      {task.description}
                                    </p>
                                  )}
                                  <p className="mt-1 text-xs text-gray-500">
                                    Due:{" "}
                                    {new Date(
                                      task.due_date
                                    ).toLocaleDateString()}
                                  </p>
                                </div>
                              </div>
                            </div>
                          )}
                        </Draggable>
                      ))}
                      {provided.placeholder}
                    </div>
                  )}
                </Droppable>
              </div>
            ))}
          </div>
        </DragDropContext>
      )}
    </div>
  );
};

export default Board;
