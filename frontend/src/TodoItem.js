function TodoItem({ todo, onToggle, onDelete }) {
  return (
    <li style={{ margin: '1rem 0' }}>
      <span
        onClick={onToggle}
        style={{
          textDecoration: todo.completed ? 'line-through' : 'none',
          cursor: 'pointer',
        }}
      >
        {todo.text}
      </span>
      <button onClick={onDelete} style={{ marginLeft: '1rem' }}>❌</button>
    </li>
  );
}

export default TodoItem;
