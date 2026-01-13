import { useState } from "react";
import api from "../api/axios";
import { useAuth } from "../context/AuthContext";

const Profile = () => {
  const { user, setUser, logout } = useAuth();
  const [form, setForm] = useState({
    name: user?.name || "",
    email: user?.email || ""
  });
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleUpdate = async (e) => {
    e.preventDefault();
    setError("");
    setMessage("");
    try {
      const res = await api.put("/auth/me", form);
      setUser(res.data);
      setMessage("Profile updated successfully");
    } catch (err) {
      console.error(err);
      setError(err.response?.data?.message || "Update failed");
    }
  };

  const handleDelete = async () => {
    if (!window.confirm("Are you sure you want to delete your account?")) {
      return;
    }
    try {
      await api.delete("/auth/me");
      logout();
    } catch (err) {
      console.error(err);
      setError("Failed to delete account");
    }
  };

  return (
    <div className="mx-auto mt-6 max-w-xl rounded bg-white p-6 shadow">
      <h1 className="mb-4 text-2xl font-semibold">Profile</h1>
      {message && (
        <div className="mb-3 rounded bg-green-100 px-3 py-2 text-sm text-green-700">
          {message}
        </div>
      )}
      {error && (
        <div className="mb-3 rounded bg-red-100 px-3 py-2 text-sm text-red-700">
          {error}
        </div>
      )}
      <form onSubmit={handleUpdate} className="space-y-3">
        <div>
          <label className="text-sm font-medium">Name</label>
          <input
            name="name"
            value={form.name}
            onChange={handleChange}
            className="mt-1 w-full rounded border px-3 py-2 text-sm"
            required
          />
        </div>
        <div>
          <label className="text-sm font-medium">Email</label>
          <input
            name="email"
            type="email"
            value={form.email}
            onChange={handleChange}
            className="mt-1 w-full rounded border px-3 py-2 text-sm"
            required
          />
        </div>
        <button className="rounded bg-blue-600 px-4 py-2 text-sm font-semibold text-white hover:bg-blue-700">
          Save changes
        </button>
      </form>
      <hr className="my-4" />
      <button
        onClick={handleDelete}
        className="rounded bg-red-500 px-4 py-2 text-sm font-semibold text-white hover:bg-red-600"
      >
        Delete account
      </button>
    </div>
  );
};

export default Profile;
