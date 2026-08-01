import { useState } from "react";
import API from "../services/api"

const TaskForm = ({ fetchTasks }) => {
  const [title, setTitle] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    if (!title.trim()) {
      setError("Title is required");
      return;
    }

    try {
      setLoading(true);
      await API.post("/tasks", {
        title: title.trim(),
        description: "",
      });

      setTitle("");
      await fetchTasks();
    } catch (err) {
      setError(err.response?.data?.message || "Failed to add task");
      console.error("Error creating task:", err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="task-form">
      {error && <div className="task-form-error">{error}</div>}
      
      <input
        type="text"
        placeholder="add item ..."
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        disabled={loading}
        required
        className="task-form-input"
      />

      <button type="submit" disabled={loading} className="task-form-button">
        {loading ? "ADDING..." : "ADD"}
      </button>
    </form>
  );
};

export default TaskForm;
