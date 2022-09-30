import { BiMessageAltError } from "react-icons/bi";
import { useSelector } from "react-redux";

function TaskListError() {
  const { getAllTaskError } = useSelector((state) => state.task);

  return (
    <div className="taskListErrorContainer">
      <BiMessageAltError size={35} />
      <p className="taskListErrorTitle">Todo List {getAllTaskError}</p>
    </div>
  );
}

export default TaskListError;
