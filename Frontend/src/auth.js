//Get JWT token from localStorage
export const getToken = () => localStorage.getItem("token");

//Authenticated fetch that automatically includes JWT in headers
export const authFetch = async (url, options = {}) => {
  const token = getToken();

  //Merge headers
  const headers = {
    "Content-Type": "application/json",
    ...options.headers,
  };

  if (token) {
    headers["Authorization"] = `Bearer ${token}`;
  }

  return fetch(url, {
    ...options,
    headers,
  });
};

//Logout function: clears JWT
export const logout = () => {
  localStorage.removeItem("token");
  localStorage.removeItem("user");
};
