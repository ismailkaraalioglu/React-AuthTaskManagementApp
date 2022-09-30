import { useSelector, useDispatch } from "react-redux";
import { showConfirmDeleteModal } from "../redux/event/eventSlice";
import { removeTask } from "../redux/task/services";

function ConfirmModal() {
  const { confirmDeleteModal } = useSelector((state) => state.event);
  const { currentDeleteTask } = useSelector((state) => state.event);
  const { token } = useSelector((state) => state.login);

  const dispatch = useDispatch();

  const taskDeleted = (task, token) => {
    dispatch(removeTask({ task, token }));
    dispatch(showConfirmDeleteModal());
  };

  return (
    <>
      {confirmDeleteModal && (
        <div>
          <div className="confirmModalContainer">
            <div className="confirmModalPage">
              <div className="confirmModalContent">
                <div className="confirmModalTitleSection">
                  <h3 className="confirmModalTitle">Are you sure?</h3>
                </div>

                <div className="confirmModalButtonSection">
                  <button
                    className="confirmModalNoButton"
                    type="button"
                    onClick={() => dispatch(showConfirmDeleteModal())}
                  >
                    No
                  </button>
                  <button
                    className="confirmModalYesButton"
                    type="button"
                    onClick={() => taskDeleted(currentDeleteTask, token)}
                  >
                    Yes
                  </button>
                </div>
              </div>
            </div>
          </div>
          <div className="confirmModalPageBackground"></div>
        </div>
      )}
    </>
  );
}

export default ConfirmModal;
