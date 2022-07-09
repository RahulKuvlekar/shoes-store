import { useContext } from "react";
import { ToastContext } from "../Context/ToastContext";

export const useToastContext = () => useContext(ToastContext);
