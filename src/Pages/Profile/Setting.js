import React from "react";
import { useNavigate } from "react-router-dom";
import { ADD_TOAST, DANGER, INFO } from "../../Constant/constant";
import { useAuthContext } from "../../Hooks/useAuthContext";
import { useToastContext } from "../../Hooks/useToastContext";
import { signOutUser } from "../../Utils/authentication";
import { createToast } from "../../Utils/toast";

const Setting = () => {
  const { userInfo } = useAuthContext();
  const { dispatchToast } = useToastContext();
  const navigate = useNavigate();

  const signOutHandler = async () => {
    try {
      await signOutUser();
      dispatchToast({
        type: ADD_TOAST,
        payload: createToast(
          INFO,
          `${
            userInfo?.displayName !== null ? userInfo?.displayName : ""
          } Logout Successfully 🎉`
        ),
      });
      navigate("/", { replace: true });
    } catch (error) {
      dispatchToast({
        type: ADD_TOAST,
        payload: createToast(DANGER, error.message),
      });
    }
  };
  return (
    <React.Fragment>
      <h1 className="profile-title">Setting</h1>
      <button className="btn signout" onClick={signOutHandler}>
        Logout
      </button>
    </React.Fragment>
  );
};

export default Setting;
