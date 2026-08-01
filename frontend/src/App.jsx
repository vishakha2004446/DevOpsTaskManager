import { useEffect, useState } from "react";
import API from "./services/api";
import TaskForm from "./components/TaskForm";
import TaskList from "./components/TaskList";
import "./App.css";

function App() {
  const [tasks, setTasks] = useState([]);

  const fetchTasks = async () => {
    try {
      const response = await API.get("/tasks");
      setTasks(response.data);
    } catch (error) {
      console.error("Error fetching tasks:", error);
    }
  };

  useEffect(() => {
    const loadTasks = async () => {
      try {
        const response = await API.get("/tasks");
        setTasks(response.data);
      } catch (error) {
        console.error("Error fetching tasks:", error);
      }
    };

    loadTasks();
  }, []);

  return (
    <div className="app-container">
      <div className="app-content">
        <h1 className="app-title">TODO LIST</h1>

        <div className="divider"></div>

        <TaskForm fetchTasks={fetchTasks} />

        <TaskList
          tasks={tasks}
          fetchTasks={fetchTasks}
        />
      </div>
    </div>
  );
}

export default App;