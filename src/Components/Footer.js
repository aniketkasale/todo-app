const Footer = ({
  getActiveTaskCount,
  currentWindow,
  setCurrentWindow,
  clearCompletedTasks
}) => {
  return (
    <div className="todo-footer">
      <p>{getActiveTaskCount()} tasks left</p>
      <div>
        <button
          style={{ color: currentWindow === "All" && "#3b82f6" }}
          onClick={() => {
            setCurrentWindow("All");
          }}
        >
          All
        </button>
        <button
          style={{ color: currentWindow === "Active" && "#3b82f6" }}
          onClick={() => {
            setCurrentWindow("Active");
          }}
        >
          Active
        </button>
        <button
          style={{ color: currentWindow === "Completed" && "#3b82f6" }}
          onClick={() => {
            setCurrentWindow("Completed");
          }}
        >
          Completed
        </button>
      </div>
      <button onClick={clearCompletedTasks}>Clear Completed</button>
    </div>
  );
};
export default Footer;
