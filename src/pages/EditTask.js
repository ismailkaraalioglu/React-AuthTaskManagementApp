import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  changeEditTitleInput,
  changeEditDescInput,
  removeSelectUserId,
  changeEditStatus,
} from "../redux/task/taskSlice";
import { editTask, getAllTasks } from "../redux/task/services";
import UsersDropdown from "../components/UsersDropdown";
import { Toaster } from "react-hot-toast";
import toast from "react-hot-toast";

function EditTask() {
  const {
    editTitleInputValue,
    editDescInputValue,
    currentEditTask,
    editSelectUserIdValue,
    editTaskStatus,
    editTaskError,
  } = useSelector((state) => state.task);
  const { token } = useSelector((state) => state.login);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    if (editTaskError !== null && editTaskStatus === "failed") {
      toast.error(editTaskError, { duration: 1200 });
      dispatch(changeEditStatus());
    }
  }, [dispatch, editTaskError, editTaskStatus]);

  const closeEditPage = () => {
    navigate("/");
    dispatch(removeSelectUserId(""));
  };

  const saveChange = async (title, desc, userid, token, task) => {
    const ownerId = parseFloat(userid);
    await dispatch(editTask({ title, desc, ownerId, token, task }));
    await dispatch(getAllTasks(token));
    await dispatch(removeSelectUserId(""));
    navigate("/");
  };

  return (
    <div>
      <Toaster />
      <div className="editTaskPageContainer">
        <div className="editTaskPagePage">
          <div className="editTaskPageContent">
            <div className="editTaskPageTitleSection">
              <h3 className="editTaskPageTitle">Edit Task</h3>
            </div>
            <div className="editTaskPageInputSection">
              <input
                className="editTaskPageInput"
                placeholder="Title"
                value={editTitleInputValue}
                onChange={(e) => dispatch(changeEditTitleInput(e.target.value))}
              />
              <input
                className="editTaskPageInput"
                placeholder="Description"
                value={editDescInputValue}
                onChange={(e) => dispatch(changeEditDescInput(e.target.value))}
              />
              <UsersDropdown />
            </div>
            <div className="editTaskPageButtonSection">
              <button
                className="editTaskPageCloseButton"
                type="button"
                onClick={closeEditPage}
              >
                Close
              </button>
              <button
                className="editTaskPageSaveButton"
                type="button"
                onClick={() =>
                  saveChange(
                    editTitleInputValue,
                    editDescInputValue,
                    editSelectUserIdValue,
                    token,
                    currentEditTask
                  )
                }
              >
                Save Changes
              </button>
            </div>
          </div>
        </div>
      </div>
      <div className="newTaskBackground"></div>
    </div>
  );
}

export default EditTask;
