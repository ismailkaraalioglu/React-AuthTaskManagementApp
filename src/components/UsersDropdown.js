import { useSelector, useDispatch } from "react-redux";
import {
  changeSelectUser,
  changeEditSelectUserId,
} from "../redux/task/taskSlice";

function UsersDropdown() {
  const { users, getAllUsersStatus, getAllUsersError } = useSelector(
    (state) => state.user
  );
  const { selectUserId, editSelectUserIdValue } = useSelector(
    (state) => state.task
  );

  const dispatch = useDispatch();

  const handleChangeSelect = (e) => {
    if (editSelectUserIdValue) {
      dispatch(changeEditSelectUserId(e.target.value));
    } else {
      dispatch(changeSelectUser(e.target.value));
    }
  };

  return (
    <div className="userDropdownContainer">
      <select
        className="userDropdown"
        value={editSelectUserIdValue ? editSelectUserIdValue : selectUserId}
        onChange={handleChangeSelect}
      >
        <option>Select User</option>
        {getAllUsersStatus === "succeeded" &&
          users.map((user, idx) => (
            <option key={idx} value={user.id}>
              {user.firstName} {user.lastName}
            </option>
          ))}
      </select>
      {getAllUsersStatus === "failed" && <div>{getAllUsersError}</div>}
    </div>
  );
}

export default UsersDropdown;
