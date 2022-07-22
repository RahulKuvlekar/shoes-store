import { createContext, useEffect, useState } from "react";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "../Config/InitFirebase";

const AuthContext = createContext({
  isAuthenticated: Boolean,
  userInfo: Object,
  userLoading: Boolean,
  setUserLoading: () => {},
  userAddress: Array,
  setUserAddress: () => {},
});

const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [userLoading, setUserLoading] = useState(null);
  const [userAddress, setUserAddress] = useState([]);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        setUser(user);
        setIsAuthenticated(true);
      } else {
        setUser(null);
        setIsAuthenticated(false);
      }
    });

    return () => unsubscribe();
  }, []);

  return (
    <AuthContext.Provider
      value={{
        userInfo: user,
        isAuthenticated,
        userLoading,
        setUserLoading,
        userAddress,
        setUserAddress,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export { AuthContext, AuthProvider };
