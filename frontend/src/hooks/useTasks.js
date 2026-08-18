import { useTaskContext } from "../context/TaskContext";

const useTasks = () => {
  return useTaskContext();
};

export default useTasks;