import { useState, useEffect } from "react";

export default function TodoList() {
  const [todos, setTodos] = useState(["Add Your Tasks here"]);
  const [newTodo, setNewTodo] = useState("");
  const [theme, setTheme] = useState("light");

  useEffect(() => {
    const savedTheme = localStorage.getItem("theme");
    if (savedTheme) setTheme(savedTheme);
  }, []);

  useEffect(() => {
    document.body.setAttribute("data-theme", theme);
    localStorage.setItem("theme", theme);
  }, [theme]);

  const addNewTask = () => {
    if (newTodo.trim() === "") return;
    setTodos([...todos, newTodo]);
    setNewTodo("");
  };

  const updateInputBox = (event) => {
    setNewTodo(event.target.value);
  };

  const toggleTheme = () => {
    setTheme(theme === "light" ? "dark" : "light");
  };

  return (
    <div className="todo-container">
      <div className="header-row">
        <h2 className="title">Todo App</h2>

        {/* Toggle Switch */}
        <div className="toggle-switch">
          <label className="switch">
            <input
              type="checkbox"
              checked={theme === "dark"}
              onChange={toggleTheme}
            />
            <span className="slider"></span>
          </label>
          <span className="mode-label">
            {theme === "dark" ? "Dark Mode" : "Light Mode"}
          </span>
        </div>
      </div>

      <div className="input-area">
        <input
          placeholder="Add a Task"
          value={newTodo}
          onChange={updateInputBox}
        />
        <button onClick={addNewTask}>Add</button>
      </div>

      <ul className="todo-list">
        {todos.map((todo, index) => (
          <li key={index}>{todo}</li>
        ))}
      </ul>
    </div>
  );
}
