import dailyTasks from "../data/dailyTasks";

const STORAGE_KEY = "productivity-tracker-tasks";

class TaskService {
  // ==========================================
  // GET ALL TASKS
  // ==========================================

  getTasks() {
    const storedTasks = localStorage.getItem(
      STORAGE_KEY
    );

    if (storedTasks) {
      return JSON.parse(storedTasks);
    }

    // First time opening application
    localStorage.setItem(
      STORAGE_KEY,
      JSON.stringify(dailyTasks)
    );

    return dailyTasks;
  }

  // ==========================================
  // SAVE ALL TASKS
  // ==========================================

  saveTasks(tasks) {
    localStorage.setItem(
      STORAGE_KEY,
      JSON.stringify(tasks)
    );
  }

  // ==========================================
  // ADD TASK
  // ==========================================

  addTask(newTask) {
    const tasks = this.getTasks();

    tasks.push(newTask);

    this.saveTasks(tasks);

    return tasks;
  }

  // ==========================================
  // UPDATE TASK
  // ==========================================

  updateTask(updatedTask) {
    const tasks = this.getTasks().map((task) =>
      task.id === updatedTask.id
        ? updatedTask
        : task
    );

    this.saveTasks(tasks);

    return tasks;
  }

  // ==========================================
  // DELETE TASK
  // ==========================================

  deleteTask(taskId) {
    const tasks = this.getTasks().filter(
      (task) => task.id !== taskId
    );

    this.saveTasks(tasks);

    return tasks;
  }

  // ==========================================
  // RESET TO DEFAULT TASKS
  // ==========================================

  resetTasks() {
    localStorage.setItem(
      STORAGE_KEY,
      JSON.stringify(dailyTasks)
    );

    return dailyTasks;
  }
}

export default new TaskService();