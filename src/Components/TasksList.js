import TaskCard from "./TaskCad";

const TasksList = ({
  getTasklistToRender,
  handleMarkCompleteTask,
  handleDeleteTask,
  currentWindow
}) => {
  return (
    <div className="task-list-container">
      {getTasklistToRender().length > 0 ? (
        getTasklistToRender().map((item, i) => {
          return (
            <TaskCard
              key={item.id}
              item={item}
              handleMarkCompleteTask={handleMarkCompleteTask}
              handleDeleteTask={handleDeleteTask}
            />
          );
        })
      ) : (
        <div className="task-card not-found">
          {currentWindow} tasks not found!
        </div>
      )}
    </div>
  );
};
export default TasksList;
