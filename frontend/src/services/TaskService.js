import AuthService from "./AuthService";

const API_BASE_URL = "http://localhost:8080/api/tasks";

const getHeaders = () => {
  const token = AuthService.getToken();

  return {
    "Content-Type": "application/json",
    Authorization: `Bearer ${token}`,
  };
};

const handleResponse = async (response) => {
  if (response.ok) {
    if (response.status === 204) {
      return null;
    }

    return response.json();
  }

  let message = "Request failed";

  try {
    const error = await response.json();

    message =
      error.message ||
      error.error ||
      message;
  } catch {
    // Ignore invalid error response
  }

  if (response.status === 401) {
    AuthService.logout();

    window.location.href = "/login";

    throw new Error(
      "Session expired. Please login again."
    );
  }

  if (response.status === 403) {
    throw new Error(
      "You are not authorized to perform this action."
    );
  }

  throw new Error(message);
};

const normalizeStatusForApi = (status) => {
  const normalized =
    status?.toString().trim().toLowerCase();

  return normalized === "completed"
    ? "COMPLETED"
    : "TODO";
};

const normalizePriorityForApi = (priority) => {
  const normalized =
    priority?.toString().trim().toLowerCase();

  switch (normalized) {
    case "high":
      return "HIGH";

    case "medium":
      return "MEDIUM";

    case "low":
      return "LOW";

    case "normal":
      return "MEDIUM";

    default:
      return "MEDIUM";
  }
};

const TaskService = {

  // =========================
  // GET ALL TASKS
  // =========================

  async getTasks() {
    const response = await fetch(API_BASE_URL, {
      method: "GET",
      headers: getHeaders(),
    });

    return handleResponse(response);
  },

  // =========================
  // GET TASK BY ID
  // =========================

  async getTaskById(taskId) {
    const response = await fetch(
      `${API_BASE_URL}/${taskId}`,
      {
        method: "GET",
        headers: getHeaders(),
      }
    );

    return handleResponse(response);
  },

  // =========================
  // GET TASK SUMMARY
  // =========================

  async getTaskSummary() {
    const response = await fetch(
      `${API_BASE_URL}/summary`,
      {
        method: "GET",
        headers: getHeaders(),
      }
    );

    return handleResponse(response);
  },

  // =========================
  // GET TODAY'S TASKS
  // =========================

  async getTodayTasks() {
    const response = await fetch(
      `${API_BASE_URL}/today`,
      {
        method: "GET",
        headers: getHeaders(),
      }
    );

    return handleResponse(response);
  },

  // =========================
  // GET TASKS BY DATE
  // =========================

  async getTasksByDate(date) {
    const response = await fetch(
      `${API_BASE_URL}/date/${date}`,
      {
        method: "GET",
        headers: getHeaders(),
      }
    );

    return handleResponse(response);
  },

  // =========================
  // CREATE TASK
  // =========================

  async addTask(task) {
    const response = await fetch(
      API_BASE_URL,
      {
        method: "POST",
        headers: getHeaders(),
        body: JSON.stringify({
          title: task.title,
          description: task.description || "",
          status: normalizeStatusForApi(
            task.status
          ),
          priority: normalizePriorityForApi(
            task.priority
          ),
          dueDate: task.dueDate,
        }),
      }
    );

    return handleResponse(response);
  },

  // =========================
  // UPDATE TASK
  // =========================

  async updateTask(task) {
    const response = await fetch(
      `${API_BASE_URL}/${task.id}`,
      {
        method: "PUT",
        headers: getHeaders(),
        body: JSON.stringify({
          title: task.title,
          description: task.description || "",
          status: normalizeStatusForApi(
            task.status
          ),
          priority: normalizePriorityForApi(
            task.priority
          ),
          dueDate: task.dueDate,
        }),
      }
    );

    return handleResponse(response);
  },

  // =========================
  // DELETE TASK
  // =========================

  async deleteTask(taskId) {
    const response = await fetch(
      `${API_BASE_URL}/${taskId}`,
      {
        method: "DELETE",
        headers: getHeaders(),
      }
    );

    return handleResponse(response);
  },

  // =========================
  // COMPLETE TASK
  // =========================

  async completeTask(taskId) {
    const response = await fetch(
      `${API_BASE_URL}/${taskId}/complete`,
      {
        method: "PATCH",
        headers: getHeaders(),
      }
    );

    return handleResponse(response);
  },
};

export default TaskService;