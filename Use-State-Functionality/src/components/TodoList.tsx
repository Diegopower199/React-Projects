import { useState } from "react";
import { Link } from "react-router-dom";

interface Task {
  id: string;
  title: string;
  completed: boolean;
}

export const TodoList = () => {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [newTaskTitle, setNewTaskTitle] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const addTask = (title: string) => {
    if (title.trim() === "") {
      setErrorMessage("Task title cannot be empty.");
      return;
    }

    setErrorMessage("");
    const newTask: Task = {
      id: Date.now().toString(),
      title,
      completed: false,
    };
    setTasks([...tasks, newTask]);

    setNewTaskTitle("");
  };

  const deleteTask = (id: string) => {
    setTasks(tasks.filter((task) => task.id !== id));
  };

  return (
    <>
      <h1>
        <Link to="/">Home</Link>
      </h1>
      <h1>Todo List</h1>
      <input
        type="text"
        placeholder="Put a title."
        value={newTaskTitle}
        onChange={(e) => setNewTaskTitle(e.target.value)}
      />
      <button onClick={() => addTask(newTaskTitle)}>Add Task</button>
      {errorMessage && <p style={{ color: "red" }}>{errorMessage}</p>}

      {tasks.length > 0 && (
        <div>
          <p>ALL TASKS</p>
          {tasks.map((task) => (
            <div
              style={{ display: "flex", alignItems: "center", gap: "10px", backgroundColor: "orange", padding: "10px", borderRadius: "5px" }}
              key={task.id}
            >
              <p key={task.id}>{task.title}</p>
              <button onClick={() => deleteTask(task.id)}>Delete Task</button>
            </div>
          ))}
        </div>
      )}
    </>
  );
};
