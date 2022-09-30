import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getAllTasks } from "../redux/task/services";
import { getAllUser } from "../redux/user/services";
import Task from "./Task";
import TaskListError from "./TaskListError";
import TaskListLoading from "./TaskListLoading";

function Tasks() {
  const { getAllUsersStatus } = useSelector((state) => state.user);
  const { token } = useSelector((state) => state.login);
  const { getAllTaskStatus, tasks } = useSelector((state) => state.task);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    if (getAllTaskStatus === "idle") {
      dispatch(getAllTasks(token));
    }
  }, [dispatch, token, getAllTaskStatus]);

  useEffect(() => {
    if (getAllUsersStatus === "idle") {
      dispatch(getAllUser(token));
    }
  }, [dispatch, getAllUsersStatus, token]);

  const addedNewTask = () => {
    navigate("/newtask");
  };

  const taskListEmpty = tasks.length === 0 && getAllTaskStatus === "succeeded";
  const taskListNotEmpty =
    tasks.length !== 0 && getAllTaskStatus === "succeeded";

  return (
    <div className="tasksContainer">
      <div className="newTaskAddContainer">
        <button className="newTaskAddButton" onClick={addedNewTask}>
          New Task
        </button>
      </div>
      <h1 className="tasksTitle">Task List</h1>
      {getAllTaskStatus === "failed" && <TaskListError />}
      {getAllTaskStatus === "loading" && <TaskListLoading />}
      {taskListEmpty && (
        <div className="taskListEmpty">Please add tasks to be done...</div>
      )}
      {taskListNotEmpty && (
        <div className="taskListContent">
          {tasks.map((task, idx) => (
            <Task key={idx} task={task} />
          ))}
        </div>
      )}
    </div>
  );
}

export default Tasks;
