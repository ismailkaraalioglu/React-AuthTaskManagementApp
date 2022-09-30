import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  changeDescInput,
  changeTitleInput,
  changeSelectUser,
  changeCreateStatus,
} from "../redux/task/taskSlice";
import { createTask } from "../redux/task/services";
import { getAllTasks } from "../redux/task/services";
import UsersDropdown from "../components/UsersDropdown";
import { Toaster } from "react-hot-toast";
import toast from "react-hot-toast";

function NewTask() {
  const {
    titleInput,
    descInput,
    selectUserId,
    createTaskError,
    createTaskStatus,
  } = useSelector((state) => state.task);
  const { token } = useSelector((state) => state.login);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    if (createTaskError !== null && createTaskStatus === "failed") {
      toast.error(createTaskError, { duration: 1200 });
      dispatch(changeCreateStatus());
    }
  }, [dispatch, createTaskError, createTaskStatus]);

  const closeNewTaskPage = () => {
    navigate("/");
  };

  const addNewTask = async (title, desc, userid, token) => {
    const userID = parseFloat(userid);
    await dispatch(createTask({ title, desc, userID, token }));
    await dispatch(getAllTasks(token));
    dispatch(changeTitleInput(""));
    dispatch(changeDescInput(""));
    dispatch(changeSelectUser(""));
    navigate("/");
  };

  return (
    <div>
      <Toaster />
      <div className="newTaskContainer">
        <div className="newTaskPage">
          <div className="newTaskContent">
            <div className="newTaskTitleSection">
              <h3 className="newTaskTitle">New Task</h3>
            </div>
            <div className="newTaskInputSection">
              <input
                className="newTaskInput"
                placeholder="Title"
                value={titleInput}
                onChange={(e) => dispatch(changeTitleInput(e.target.value))}
              />
              <input
                className="newTaskInput"
                placeholder="Description"
                value={descInput}
                onChange={(e) => dispatch(changeDescInput(e.target.value))}
              />
              <UsersDropdown />
            </div>
            <div className="newTaskButtonSection">
              <button
                className="newTaskCloseButton"
                type="button"
                onClick={closeNewTaskPage}
              >
                Close
              </button>
              <button
                className="newTaskSaveButton"
                type="button"
                onClick={() =>
                  addNewTask(titleInput, descInput, selectUserId, token)
                }
              >
                Add Task
              </button>
            </div>
          </div>
        </div>
      </div>
      <div className="newTaskBackground"></div>
    </div>
  );
}

export default NewTask;
