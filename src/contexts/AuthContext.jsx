import React, { createContext, useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { auth } from "../firebase";

const AuthContext = createContext();
export const useAuth = () => useContext(AuthContext);

const AuthProvider = ({ children }) => {
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    auth.onAuthStateChanged((user) => {
      setUser(user);
      setLoading(false);

      if (user) navigate("/chats");
    });
  }, [user, navigate]);

  const value = { user };

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
