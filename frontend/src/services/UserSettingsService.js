import AuthService from "./AuthService";

const API_BASE_URL = "http://localhost:8080/api/users/settings";

const getHeaders = () => {
  const token = AuthService.getToken();

  return {
    "Content-Type": "application/json",
    Authorization: `Bearer ${token}`,
  };
};

const handleResponse = async (response) => {
  if (response.ok) {
    return response.json();
  }

  let message = "Settings request failed";

  try {
    const error = await response.json();
    message = error.message || error.error || message;
  } catch {
    // Ignore JSON parsing errors
  }

  if (response.status === 401) {
    AuthService.logout();
    window.location.href = "/login";
    throw new Error("Session expired. Please login again.");
  }

  if (response.status === 403) {
    throw new Error(
      "You are not authorized to perform this action."
    );
  }

  throw new Error(message);
};

const UserSettingsService = {

  async getSettings() {
    const response = await fetch(API_BASE_URL, {
      method: "GET",
      headers: getHeaders(),
    });

    return handleResponse(response);
  },

  async updateSettings(settings) {
    const response = await fetch(API_BASE_URL, {
      method: "PUT",
      headers: getHeaders(),
      body: JSON.stringify({
        defaultPriority: settings.defaultPriority.toUpperCase(),
        showCompletedTasks: settings.showCompletedTasks,
      }),
    });

    return handleResponse(response);
  },
};

export default UserSettingsService;