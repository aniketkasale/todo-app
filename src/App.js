import "./styles.css";
import { useEffect, useState } from "react";
import Footer from "./Components/Footer";
import TasksList from "./Components/TasksList";
import InputBox from "./Components/InputBox";
import LightIcon from "./Components/LightIcon";
import DarkIcon from "./Components/DarkIcon";
export default function App() {
  const [theme, setTheme] = useState("dark");
  const [newTask, setNewTask] = useState("");
  const [currentWindow, setCurrentWindow] = useState("All");
  const [todo, setTodo] = useState([]);

  const getTodoList = () => {
    const todoList = localStorage.getItem("todolist");
    if (todoList) {
      setTodo(JSON.parse(todoList));
    }
  };
  useEffect(() => {
    getTodoList();
  }, []);
  const handleAddTodo = (e) => {
    if (e.key === "Enter" && e.target.value !== "") {
      setTodo([
        { id: Date.now(), value: e.target.value, isComplete: false },
        ...todo
      ]);
      localStorage.setItem(
        "todolist",
        JSON.stringify([
          { id: Date.now(), value: e.target.value, isComplete: false },
          ...todo
        ])
      );
      setNewTask("");
    }
  };
  const handleDeleteTask = (id) => {
    setTodo(todo.filter((item) => item.id !== id));
    localStorage.setItem(
      "todolist",
      JSON.stringify(todo.filter((item) => item.id !== id))
    );
  };
  const handleMarkCompleteTask = (isChecked, taskId) => {
    let newTodo = todo.map((todo) => {
      if (todo.id === taskId) {
        return {
          ...todo,
          isComplete: isChecked
        };
      }
      return todo;
    });
    setTodo(newTodo);
    localStorage.setItem("todolist", JSON.stringify(newTodo));
  };
  console.log(theme);
  const getTasklistToRender = () => {
    const filteredTodo =
      currentWindow === "All"
        ? todo
        : currentWindow === "Active"
        ? todo.filter((item) => !item.isComplete)
        : todo.filter((item) => item.isComplete);
    return filteredTodo;
  };
  const getActiveTaskCount = () => {
    const count = todo.filter((item) => !item.isComplete).length;
    return count;
  };
  const clearCompletedTasks = () => {
    const activeTasks = todo.filter((item) => !item.isComplete);
    setTodo(activeTasks);
    localStorage.setItem("todolist", JSON.stringify(activeTasks));
  };
  return (
    <div className={`main-container ${theme}`}>
      <div className="container">
        <div className="header">
          <h1>Todo App</h1>
          {theme === "light" ? (
            <button onClick={() => setTheme("dark")}>
              <DarkIcon setTheme={setTheme} />
            </button>
          ) : (
            <button onClick={() => setTheme("light")}>
              <LightIcon setTheme={setTheme} />
            </button>
          )}
        </div>
        <InputBox
          newTask={newTask}
          setNewTask={setNewTask}
          handleAddTodo={handleAddTodo}
        />
        {todo.length > 0 && (
          <>
            <TasksList
              getTasklistToRender={getTasklistToRender}
              handleMarkCompleteTask={handleMarkCompleteTask}
              handleDeleteTask={handleDeleteTask}
              currentWindow={currentWindow}
            />
            <Footer
              getActiveTaskCount={getActiveTaskCount}
              currentWindow={currentWindow}
              setCurrentWindow={setCurrentWindow}
              clearCompletedTasks={clearCompletedTasks}
            />
          </>
        )}
      </div>
    </div>
  );
}
