import { ImSpinner9 } from "react-icons/im";

function TaskListLoading() {
  return (
    <div className="taskListLoadingContainer">
      <ImSpinner9 size={30} className="taskListLoadingIcon" />
      <p className="taskListLoadingTitle">Task List Loading...</p>
    </div>
  );
}

export default TaskListLoading;
