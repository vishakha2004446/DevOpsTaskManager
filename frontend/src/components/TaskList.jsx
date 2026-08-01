import API from "../services/api";
import { useState } from "react";

const TaskList = ({ tasks, fetchTasks }) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  // Edit states
  const [editingId, setEditingId] = useState(null);
  const [editTitle, setEditTitle] = useState("");

  // Delete task
  const deleteTask = async (id) => {
    try {
      setLoading(true);
      setError("");

      await API.delete(`/tasks/${id}`);

      await fetchTasks();
    } catch (err) {
      setError(
        err.response?.data?.message || "Failed to delete task"
      );

      console.error("Error deleting task:", err);
    } finally {
      setLoading(false);
    }
  };

  // Start editing
  const startEdit = (task) => {
    setEditingId(task._id);
    setEditTitle(task.title);
    setError("");
  };

  // Cancel editing
  const cancelEdit = () => {
    setEditingId(null);
    setEditTitle("");
  };

  // Update task
  const updateTask = async (id) => {
    if (!editTitle.trim()) {
      setError("Title is required");
      return;
    }

    try {
      setLoading(true);
      setError("");

      await API.put(`/tasks/${id}`, {
        title: editTitle.trim(),
      });

      setEditingId(null);
      setEditTitle("");

      await fetchTasks();
    } catch (err) {
      setError(
        err.response?.data?.message || "Failed to update task"
      );

      console.error("Error updating task:", err);
    } finally {
      setLoading(false);
    }
  };

  if (tasks.length === 0) {
    return (
      <div className="task-list-empty">
        No tasks found. Create one to get started!
      </div>
    );
  }

  return (
    <div className="task-list">

      {error && (
        <div className="task-form-error">
          {error}
        </div>
      )}

      {tasks.map((task) => (
        <div key={task._id} className="task-item">

          <div className="task-item-content">

            {editingId === task._id ? (
              <input
                type="text"
                value={editTitle}
                onChange={(e) => setEditTitle(e.target.value)}
                className="task-edit-input"
              />
            ) : (
              <div className="task-item-title">
                {task.title}
              </div>
            )}

            {task.description && (
              <div className="task-item-description">
                {task.description}
              </div>
            )}

            <div className="task-item-meta">
              Status:{" "}
              <strong>{task.status || "pending"}</strong>
            </div>

          </div>

          <div className="task-item-actions">

            {editingId === task._id ? (
              <>
                <button
                  onClick={() => updateTask(task._id)}
                  disabled={loading}
                  className="task-button"
                >
                  {loading ? "Saving..." : "Save"}
                </button>

                <button
                  onClick={cancelEdit}
                  disabled={loading}
                  className="task-button delete"
                >
                  Cancel
                </button>
              </>
            ) : (
              <>
                <button
                  onClick={() => deleteTask(task._id)}
                  disabled={loading}
                  className="task-button delete"
                >
                  {loading ? "..." : "Delete"}
                </button>

                <button
                  onClick={() => startEdit(task)}
                  disabled={loading}
                  className="task-button"
                >
                  Edit
                </button>
              </>
            )}

          </div>

        </div>
      ))}
    </div>
  );
};

export default TaskList;