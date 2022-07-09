import { useContext } from "react";
import { AuthContext } from "../Context/AuthContext";

export const useAuthContext = () => useContext(AuthContext);
