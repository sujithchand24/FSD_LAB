
import React, { useState, useEffect } from "react";

function App() {
    const [tasks, setTasks] = useState(JSON.parse(localStorage.getItem("tasks")) || []);
    const [input, setInput] = useState("");
    const [filter, setFilter] = useState("all");

    useEffect(() => {
        localStorage.setItem("tasks", JSON.stringify(tasks));
    }, [tasks]);

    function add() {
        if (!input.trim()) return;
        setTasks([...tasks, { id: Date.now(), name: input, done: false }]);
        setInput("");
    }

    function remove(id) {
        setTasks(tasks.filter(t => t.id !== id));
    }

    function toggle(id) {
        setTasks(tasks.map(t =>
            t.id === id ? { ...t, done: !t.done } : t
        ));
    }

    return (
        <div className="container">
            <h1>ToDo App</h1>

            <input value={input} onChange={e => setInput(e.target.value)}
                placeholder="Enter task" />
            <button onClick={add}>Add</button>

            <h3>Total: {tasks.length}</h3>
            <h3>Pending: {tasks.filter(t => !t.done).length}</h3>
            <h3>Completed: {tasks.filter(t => t.done).length}</h3>

            {["all", "pending", "completed"].map(f =>
                <button key={f} onClick={() => setFilter(f)}>{f}</button>
            )}

            {tasks.filter(t =>
                filter === "all" ||
                (filter === "pending" && !t.done) ||
                (filter === "completed" && t.done)
            ).map(t => (
                <p key={t.id}>
                    <span onClick={() => toggle(t.id)}
                        className={t.done ? "done" : ""}>
                        {t.name}
                    </span>
                    <button onClick={() => remove(t.id)}>Delete</button>
                </p>
            ))}
        </div>
    );
}

export default App;
  