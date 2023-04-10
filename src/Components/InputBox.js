const InputBox = ({ newTask, setNewTask, handleAddTodo }) => {
  return (
    <input
      value={newTask}
      placeholder="Create New Task..."
      onChange={(e) => {
        setNewTask(e.target.value);
      }}
      type="text"
      onKeyDown={(e) => handleAddTodo(e)}
    />
  );
};

export default InputBox;
