import { createContext, useContext, useState } from "react";
import AuthService from "../services/AuthService";

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(AuthService.getUser());
  const [loading, setLoading] = useState(false);

  const login = async (username, password) => {
    setLoading(true);

    try {
      const data = await AuthService.login(username, password);

      setUser({
        userId: data.userId,
        username: data.username,
        email: data.email,
        role: data.role,
      });

      return data;
    } finally {
      setLoading(false);
    }
  };

  const logout = () => {
    AuthService.logout();
    setUser(null);
  };

  const value = {
    user,
    loading,
    isAuthenticated: Boolean(user),
    login,
    logout,
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error("useAuth must be used inside AuthProvider");
  }

  return context;
};