const API_BASE_URL = "http://localhost:8080/api/auth";

const TOKEN_KEY = "productivity-tracker-token";
const USER_KEY = "productivity-tracker-user";

const AuthService = {

  async login(username, password) {
    const response = await fetch(`${API_BASE_URL}/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        username,
        password,
      }),
    });

    if (!response.ok) {
      let message = "Login failed";

      try {
        const error = await response.json();
        message = error.message || message;
      } catch {
        // Keep default message
      }

      throw new Error(message);
    }

    const data = await response.json();

    localStorage.setItem(TOKEN_KEY, data.token);

    localStorage.setItem(
      USER_KEY,
      JSON.stringify({
        userId: data.userId,
        username: data.username,
        email: data.email,
        role: data.role,
      })
    );

    return data;
  },

  logout() {
    localStorage.removeItem(TOKEN_KEY);
    localStorage.removeItem(USER_KEY);
  },

  getToken() {
    return localStorage.getItem(TOKEN_KEY);
  },

  getUser() {
    const user = localStorage.getItem(USER_KEY);

    return user ? JSON.parse(user) : null;
  },

  isAuthenticated() {
    return Boolean(localStorage.getItem(TOKEN_KEY));
  },
};

export default AuthService;