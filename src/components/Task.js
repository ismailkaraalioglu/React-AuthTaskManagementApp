import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { FiEdit } from "react-icons/fi";
import { IoTrashBinOutline } from "react-icons/io5";
import { useDispatch, useSelector } from "react-redux";
import { showConfirmDeleteModal } from "../redux/event/eventSlice";
import { changeRemoveStatus, currentEdit } from "../redux/task/taskSlice";
import toast from "react-hot-toast";

function Task({ task }) {
  const { removeTaskStatus, removeTaskError } = useSelector(
    (state) => state.task
  );
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    if (removeTaskError !== null && removeTaskStatus === "failed") {
      toast.error(removeTaskError, { duration: 1200 });
      dispatch(changeRemoveStatus());
    }
  }, [removeTaskError, dispatch, removeTaskStatus]);

  const handleTaskRemove = (task) => {
    dispatch(showConfirmDeleteModal(task));
  };

  const editingTask = () => {
    navigate("/edittask");
    dispatch(currentEdit(task));
  };

  return (
    <div className="taskContainer">
      <div className="taskLeftSection">
        <div className="taskLeftTitle">{task.title}</div>
        <div className="taskLeftDescription">{task.description}</div>
        <div className="taskOwnerContainer">
          <p className="taskOwner">
            {task.owner.firstName} {task.owner.lastName}
          </p>
          <p className="taskOwnerTitle">Task Owner</p>
        </div>
      </div>

      <div className="taskRightSection">
        <button className="taskEditButton" onClick={() => editingTask(task)}>
          <FiEdit size={25} />
        </button>
        <button
          className="taskRemoveButton"
          onClick={() => handleTaskRemove(task)}
        >
          <IoTrashBinOutline size={25} />
        </button>
      </div>
    </div>
  );
}

export default Task;
