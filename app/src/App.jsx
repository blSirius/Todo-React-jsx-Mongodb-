import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './App.css'

function App() {
  const [todos, setTodos] = useState([]);
  const [newTodo, setNewTodo] = useState('');
  const [updatedTodo, setUpdatedTodo] = useState('');

  useEffect(() => {
    fetchTodo()
  });

  const fetchTodo = () => {
    axios.get('/api/getTodos')
      .then((response) => setTodos(response.data))
      .catch((error) => console.error('Error fetching data:', error));
  };

  const handleAddTodo = () => {
    axios.post('/api/addTodo', { tasks: newTodo })
      .then((response) => { setNewTodo(''); })
      .catch((error) => console.error('Error adding todo:', error));
  };

  const handleDeleteTodo = (id) => {
    axios.delete(`/api/deleteTodo/${id}`)
      .catch((error) => console.error('Error deleting todo:', error));
  };

  const handleUpdateTodo = (id) => {
    axios.put(`/api/updateTodo/${id}`, { tasks: updatedTodo })
      .then((response) => {
        setUpdatedTodo('');
        fetchTodo();
      })
      .catch((error) => console.error('Error updating todo:', error));
  };

  return (
    <div>
      <h1>Todos</h1>
      <ul>
        {todos.map((todo) => (
          <li key={todo._id}>
            <strong>{todo.tasks}</strong>
            <button onClick={() => handleDeleteTodo(todo._id)}>Delete</button>
            <input
              type="text"
              placeholder="Update todo"
              onChange={(e) => setUpdatedTodo(e.target.value)}
            />
            <button onClick={() => handleUpdateTodo(todo._id)}>Update</button>
          </li>
        ))}
      </ul>
      <div>
        <input
          type="text"
          placeholder="Add a new todo"
          value={newTodo}
          onChange={(e) => setNewTodo(e.target.value)}
        />
        <button onClick={handleAddTodo}>Add Todo</button>
      </div>
    </div>
  );
}
export default App;