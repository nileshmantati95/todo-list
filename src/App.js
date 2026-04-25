import React, { useState } from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import "./App.css";
import { Container } from 'react-bootstrap';

const App = () => {
  const [tasks, setTasks] = useState([]);
  const [input, setInput] = useState("");
  const [editId, setEditId] = useState(null);

  const handleAdd = () => {
    if (input.trim() === "") return;

    if (editId !== null) {
      const updatedTasks = tasks.map((task, index) =>
        index === editId ? input : task
      );
      setTasks(updatedTasks);
      setEditId(null);
    } else {
      setTasks([...tasks, input]);
    }

    setInput("");
  };

  const handleDelete = (index) => {
    const updated = tasks.filter((_, i) => i !== index);
    setTasks(updated);
  };

  const handleEdit = (index) => {
    setInput(tasks[index]);
    setEditId(index);
  };

  const handleClearAll = () => {
    setTasks([]);
    setInput("");
    setEditId(null);
  };

  return (
    <div className="main">
      <Container className="px-3 px-md-0">
        <div className="todo_section d-flex col justify-content-center align-items-center">
          <div className="todo-container col col-md-10 col-lg-6 px-2 px-sm-3 px-md-5 py-3 py-md-5 rounded-4 d-flex flex-column align-items-center">
            <h2 className="fs-2 mb-4">To-Do List</h2>
            <div className="input-group col d-flex justify-content-center">
              <input
                type="text"
                placeholder="Enter task..."
                value={input}
                onChange={(e) => setInput(e.target.value)}
                className="border-0 px-3 col"
              />
              <button onClick={handleAdd}>{editId !== null ? "Update" : "Add"}</button>
            </div>

            {tasks.length === 0 ? (
              <p className="no-task mt-4">No tasks available</p>
            ) : (
              <ul className="task-list col-12 d-flex justify-content-center mt-2">
                {tasks.map((task, i) => (
                  <li key={i} className="task-item px-3 py-2 col">
                    <span>{task}</span>
                    <div className="btn-group gap-3">
                      <button className="edit-btn px-3 rounded-2" onClick={() => handleEdit(i)}>
                        Edit
                      </button>
                      <button className="delete-btn p-2 rounded-2" onClick={() => handleDelete(i)}>
                        ❌
                      </button>
                    </div>
                  </li>
                ))}
              </ul>
            )}

            {tasks.length > 0 && (
              <button className="clear-btn" onClick={handleClearAll}>
                Clear All
              </button>
            )}
          </div>
        </div>
      </Container>
    </div>
  );
};

export default App;