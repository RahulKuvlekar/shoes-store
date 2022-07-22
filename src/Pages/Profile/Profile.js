import React from "react";
import "./Profile.css";
import { NavLink, Outlet } from "react-router-dom";

const menu = [
  { name: "My Profile", path: "" },
  { name: "Order", path: "order" },
  { name: "Addresses", path: "address" },
  { name: "Setting", path: "setting" },
];
const Profile = () => {
  return (
    <div className="main-section custom-scrollbar">
      <h1 className="page-title page-title-center">Account</h1>
      <div className="profile-section">
        <ul className="profile-sidebar">
          {menu.length > 0 &&
            menu.map((menu) => (
              <li
                className="profile-sidebar-menu"
                key={`profile-sidebar-menu-${menu.name}`}
              >
                <NavLink
                  to={menu.path}
                  className={({ isActive }) => (isActive ? "menu-active" : "")}
                  end
                >
                  {menu.name}
                </NavLink>
              </li>
            ))}
        </ul>
        <div className="profile-main">
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default Profile;
