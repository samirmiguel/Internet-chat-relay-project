import { useAuth, AuthProvider } from "../store/auth/AuthContext";
import { Routes, Route } from "react-router-dom";
import ProtectedRoute from "../routeProtection/protectedRoute/ProtectedRoute";
import Login from "../views/global/login/Login";
import Infos from "../views/global/infos/Infos";
import Sidebar from "../views/global/sidebar/Sidebar";
import Header from "../views/global/header/Header";
import AddFriends from "../views/global/addFriends/AddFriends";
import Home from "../views/global/home/Home";
import Friends from "../views/global/friends/Friends";
import PrivateRoom from "../views/global/rooms/private/PrivateRoom";
import CreateChannel from "../views/global/createChannel/CreateChannel";
import ChannelsList from "../views/global/channelList/ChannelList";
import FindChannel from "../views/global/findChannel/FindChannel";

const RoutingComponent = () => {
  const { isAuth, userRole, logout, userId } = useAuth();
  return (
    <>
      {isAuth && userRole === "user" && <Sidebar />}
      {isAuth && <Header />}
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/home" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/infos" element={<ProtectedRoute component={Infos} />} />
        <Route
          path="/add-friends"
          element={<ProtectedRoute component={AddFriends} />}
        />
        <Route
          path="/friends"
          element={<ProtectedRoute component={Friends} />}
        />
        <Route
          path="/create-channel"
          element={<ProtectedRoute component={CreateChannel} />}
        />
        <Route
          path="/my-channels"
          element={<ProtectedRoute component={ChannelsList} />}
        />
        <Route
          path="/room/:id"
          element={<ProtectedRoute component={PrivateRoom} />}
        />
        <Route
          path="/find-channels"
          element={<ProtectedRoute component={FindChannel} />}
        />
      </Routes>
    </>
  );
};

export default RoutingComponent;
