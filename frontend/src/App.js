import { useEffect, useState } from 'react';
import axios from 'axios';
import TodoItem from './TodoItem';

function App() {
  const [todos, setTodos] = useState([]);
  const [text, setText] = useState('');

  const fetchTodos = async () => {
    const res = await axios.get('/api/todos');
    setTodos(res.data);
  };

  useEffect(() => {
    fetchTodos();
    console.log('App Mounted');
  }, []);

  const addTodo = async () => {
    if (text.trim()) {
      await axios.post('/api/todos', { text });
      setText('');
      fetchTodos();
    }
  };

  const toggleTodo = async (id) => {
    await axios.put(`/api/todos/${id}`);
    fetchTodos();
  };

  const deleteTodo = async (id) => {
    await axios.delete(`/api/todos/${id}`);
    fetchTodos();
  };

  return (
    <div style={{ padding: '2rem', fontFamily: 'Arial' }}>
      <h1>📝 To-Do List</h1>
      <input
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder="Add a new task"
      />
      <button onClick={addTodo}>Add</button>
      <ul>
        {todos.map(todo => (
          <TodoItem
            key={todo._id}
            todo={todo}
            onToggle={() => toggleTodo(todo._id)}
            onDelete={() => deleteTodo(todo._id)}
          />
        ))}
      </ul>
    </div>
  );
}

export default App;
