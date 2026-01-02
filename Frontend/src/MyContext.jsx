import { createContext, useEffect, useState } from "react";
import { authFetch, logout as authLogout } from "./auth.js";

export const MyContext = createContext();

export const MyProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(localStorage.getItem("token"));
  const [loading, setLoading] = useState(true);

  // Load user from token on refresh
  // useEffect(() => {
  //   if (token) {
  //     // Here we can fetch full user info from backend later
  //     setUser({ token });
  //   }
  //   setLoading(false);
  // }, [token]);

  useEffect(() => {
    const savedUser = JSON.parse(localStorage.getItem("user"));
    const savedToken = localStorage.getItem("token");

    if (savedToken) setToken(savedToken);
    if (savedUser) setUser(savedUser);

    setLoading(false);
  }, []);

  // REGISTER
  // const register = async (username, email, password) => {
  //   const res = await fetch("http://localhost:8080/api/auth/register", {
  //     method: "POST",
  //     headers: { "Content-Type": "application/json" },
  //     body: JSON.stringify({ username, email, password }),
  //   });
  //   const data = await res.json();
  //   if (!res.ok) {
  //     throw new Error(data.error);
  //   }

  //   localStorage.setItem("token", data.token);
  //   setToken(data.token);
  //   setUser({ username: data.username, email: data.email });
  // };

  const register = async (username, email, password) => {
    try {
      const res = await fetch("http://localhost:8080/api/auth/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, email, password }),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error);
      }

      // Save token
      localStorage.setItem("token", data.token);
      setToken(data.token);

      // Save user info
      const userInfo = { username: data.username, email: data.email };
      setUser(userInfo);
      localStorage.setItem("user", JSON.stringify(userInfo)); // <-- Persist username & email
    } catch (error) {
      console.error("Registration failed:", error.message);
    }
  };

  //LOGIN
  const login = async (email, password) => {
    const res = await fetch("http://localhost:8080/api/auth/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password }),
    });
    const data = await res.json();
    if (!res.ok) {
      throw new Error(data.error);
    }

    localStorage.setItem("token", data.token);
    setToken(data.token);
    setUser({ username: data.username, email: data.email });
  };

  // LOGOUT
  const logout = () => {
    authLogout();
    setToken(null);
    setUser(null);
  };

  return (
    <MyContext.Provider
      value={{
        user,
        setUser,
        token,
        loading,
        login,
        register,
        logout,
        authFetch,
      }}
    >
      {!loading && children}
    </MyContext.Provider>
  );
};
