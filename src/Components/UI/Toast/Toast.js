import React from "react";
import {
  FaCheck,
  FaExclamationCircle,
  FaExclamationTriangle,
  FaInfoCircle,
  FaRegWindowClose,
} from "react-icons/fa";
import "./Toast.css";
import { useToastContext } from "../../../Hooks/useToastContext";
import { DELETE_TOAST } from "../../../Constant/constant";

const Toast = ({ position, autoDeleteInterval }) => {
  const { toastState, dispatchToast } = useToastContext();

  const generateIcon = (type) => {
    switch (type) {
      case "INFO":
        return <FaInfoCircle />;
      case "WARNING":
        return <FaExclamationTriangle />;
      case "DANGER":
        return <FaExclamationCircle />;
      case "SUCCESS":
        return <FaCheck />;
      default:
        return;
    }
  };

  const generateBackgroundColor = (type) => {
    switch (type) {
      case "INFO":
        return "#5bc0de";
      case "WARNING":
        return "#f0ad4e";
      case "DANGER":
        return "#d9534f";
      case "SUCCESS":
        return "#5cb85c";
      default:
        return;
    }
  };
  const deleteToastNotification = (id) => {
    dispatchToast({ type: DELETE_TOAST, payload: id });
  };

  return (
    <div className={`notification-container ${position}`}>
      {toastState.length > 0 &&
        toastState.map((notification, i) => {
          let timer = null;
          if (autoDeleteInterval) {
            timer = setTimeout(() => {
              deleteToastNotification(notification?.id);
            }, autoDeleteInterval);
          }
          return (
            <div
              style={{
                backgroundColor: generateBackgroundColor(notification.type),
              }}
              key={notification.id}
              className={`notification toast ${position}`}
            >
              <FaRegWindowClose
                onClick={() => {
                  if (timer) clearTimeout(timer);
                  deleteToastNotification(notification?.id);
                }}
                className="close-button"
              />
              <div className="notification-image">
                {generateIcon(notification.type)}
              </div>
              <div>
                <p className="notification-title">{notification.title}</p>
                <p className="notification-message">{notification.message}</p>
              </div>
            </div>
          );
        })}
    </div>
  );
};

export default Toast;
