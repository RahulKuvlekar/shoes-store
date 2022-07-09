import { createContext, useReducer } from "react";
import { toastReducer } from "../Reducer/toastReducer";

const ToastContext = createContext({
  toastState: [],
  dispatchToast: () => {},
});

const ToastProvider = ({ children }) => {
  const [toastState, dispatchToast] = useReducer(toastReducer, []);

  return (
    <ToastContext.Provider value={{ toastState, dispatchToast }}>
      {children}
    </ToastContext.Provider>
  );
};

export { ToastContext, ToastProvider };
