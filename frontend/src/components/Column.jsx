import { Droppable } from "@hello-pangea/dnd";
import TaskCard from "./TaskCard";

const Column = ({ droppableId, title, tasks }) => {
  return (
    <div className="flex-1 rounded bg-gray-100 p-3">
      <h3 className="mb-2 text-sm font-semibold">{title}</h3>
      <Droppable droppableId={droppableId}>
        {(provided) => (
          <div
            ref={provided.innerRef}
            {...provided.droppableProps}
            className="min-h-[100px]"
          >
            {tasks.map((task, index) => (
              <div key={task._id} className="mb-2">
                {/* Draggable wrapper is in Board page */}
                <TaskCard task={task} index={index} />
              </div>
            ))}
            {provided.placeholder}
          </div>
        )}
      </Droppable>
    </div>
  );
};

export default Column;
