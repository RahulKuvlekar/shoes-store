import { Routes, Route, useLocation } from "react-router-dom";
import "./App.css";
import NavigationBar from "./Components/NavigationBar/NavigationBar";
import PrivateRoute from "./Components/PrivateRoutes/PrivateRoutes";
import Toast from "./Components/UI/Toast/Toast";
import Login from "./Pages/Authentication/Login";
import Signup from "./Pages/Authentication/Signup";
import Home from "./Pages/Home/Home";
import MyOrder from "./Pages/Profile/MyOrder";
import MyProfile from "./Pages/Profile/MyProfile";
import Profile from "./Pages/Profile/Profile";
import MyAddress from "./Pages/Profile/MyAddress";
import Setting from "./Pages/Profile/Setting";

function App() {
  const { pathname } = useLocation();

  return (
    <div className="App">
      <Toast position={"top-left"} autoDeleteInterval={3000} />
      {!(pathname === "/login" || pathname === "/signup") && <NavigationBar />}
      <Routes>
        <Route path="/" element={<Home />} />
        <Route
          path="/profile"
          element={
            <PrivateRoute>
              <Profile />
            </PrivateRoute>
          }
        >
          <Route path="" element={<MyProfile />} />
          <Route path="order" element={<MyOrder />} />
          <Route path="address" element={<MyAddress />} />
          <Route path="setting" element={<Setting />} />
        </Route>
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
      </Routes>
    </div>
  );
}

export default App;
