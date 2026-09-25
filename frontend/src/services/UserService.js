import AuthService from "./AuthService";

const API_BASE_URL = "http://localhost:8080/api/users";

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

  let message = "Request failed";

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

const UserService = {

  // Get currently authenticated user's profile
  async getCurrentUser() {
    const response = await fetch(`${API_BASE_URL}/me`, {
      method: "GET",
      headers: getHeaders(),
    });

    return handleResponse(response);
  },

  // Update currently authenticated user's profile
  async updateProfile(profile) {
    const response = await fetch(`${API_BASE_URL}/me`, {
      method: "PUT",
      headers: getHeaders(),
      body: JSON.stringify({
        name: profile.name,
        email: profile.email,
        phone: profile.phone || "",
        occupation: profile.occupation || "",
        bio: profile.bio || "",
        profileImage: profile.profileImage || "",
      }),
    });

    return handleResponse(response);
  },
};

export default UserService;