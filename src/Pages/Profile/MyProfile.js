import React from "react";
import { useAuthContext } from "../../Hooks/useAuthContext";

const MyProfile = () => {
  const { userInfo } = useAuthContext();
  return (
    <React.Fragment>
      <h1 className="profile-title">My Profile</h1>
      <div className="profile-description">
        <p className="profile-info">
          <span>FULLNAME</span>
          <span>{userInfo?.displayName}</span>
        </p>
        <p className="profile-info">
          <span>EMAIL</span>
          <span>{userInfo?.email}</span>
        </p>
      </div>
    </React.Fragment>
  );
};

export default MyProfile;
