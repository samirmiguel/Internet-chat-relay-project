import "./style/Sidebar.scss";
import { Link } from "react-router-dom";
import { useAuth } from "../../../store/auth/AuthContext";
import { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export default function Sidebar() {
  const [userConnected, setUserConnected] = useState({});
  const [privateRoomsWithMemberInfo, setPrivateRoomsWithMemberInfo] = useState(
    []
  );
  const [channels, setChannels] = useState([]);

  const { userId } = useAuth();

  const navigate = useNavigate();

  const fetchMemberInfo = async (otherMemberId) => {
    try {
      const response = await axios.get(
        `http://localhost:3002/api/user/${otherMemberId}`
      );
      return response.data;
    } catch (error) {
      console.error("Error fetching member info:", error);
      return null;
    }
  };

  const fetchInfosUserConnected = async () => {
    try {
      const userResponse = await axios.get(
        `http://localhost:3002/api/user/${userId}`
      );
      setUserConnected(userResponse.data);

      const sortedRooms = userResponse.data.rooms.sort(
        (a, b) => new Date(b.created_at) - new Date(a.created_at)
      );
      const lastUpdatedPrivateRooms = sortedRooms
        .filter((room) => room.type === "private")
        .slice(0, 5);
      const lastUpdatedChannels = sortedRooms
        .filter((room) => room.type === "channel")
        .slice(0, 5);

      for (const room of lastUpdatedPrivateRooms) {
        const otherMemberId = room.members.find((id) => id !== userId);
        if (otherMemberId) {
          const memberInfo = await fetchMemberInfo(otherMemberId);
          room.otherMemberUsername = memberInfo
            ? memberInfo.username
            : "Unknown";
        }
      }

      setPrivateRoomsWithMemberInfo(lastUpdatedPrivateRooms);
      setChannels(lastUpdatedChannels);
    } catch (error) {
      console.error("Error fetching user connected info:", error);
    }
  };

  const handleMessageIconClick = (roomID) => {
    navigate(`/room/${roomID}`);
  };

  useEffect(() => {
    fetchInfosUserConnected();
  }, []);

  return (
    <>
      <div className="sidebar">
        <div className="user-section">
          <img
            src={
              userConnected.profileImage ||
              "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_640.png"
            }
            alt="user-profile"
            className="user-avatar"
          />
          <div className="user-details">
            <p className="user-username">{userConnected.username}</p>
          </div>
        </div>

        <Link to={"/home"}>
          <div className="onglet">
            <i className="fa-solid fa-house"></i>
            <p>Accueil</p>
          </div>
        </Link>

        <Link to={"/add-friends"}>
          <div className="onglet">
            <i className="fa-solid fa-user-plus"></i>
            <p>Ajouter un ami</p>
          </div>
        </Link>

        <Link to={"/find-channels"}>
          <div className="onglet">
            <i className="fa-solid fa-magnifying-glass"></i>
            <p>Trouver un channel</p>
          </div>
        </Link>

        <Link to={"/friends"}>
          <div className="onglet">
            <i className="fa-solid fa-users"></i>
            <p>Mes amis</p>
          </div>
        </Link>

        <Link to={"/my-channels"}>
          <div className="onglet">
            <i class="fa-solid fa-person-booth"></i>
            <p>Mes channels</p>
          </div>
        </Link>

        <div className="rooms-section">
          <h4>Private Rooms</h4>
          {privateRoomsWithMemberInfo.map((room) => (
            <div key={room._id} className="room-onglet">
              <button onClick={() => handleMessageIconClick(room._id)}>
                <p>{room.otherMemberUsername}</p>

                <i className="fa-solid fa-message"></i>
              </button>
            </div>
          ))}
        </div>

        <div className="rooms-section">
          <h4>Channels</h4>
          {channels.map((channel) => (
            <div key={channel._id} className="room-onglet">
              <p>{channel._id} - Channel</p>{" "}
            </div>
          ))}
        </div>
      </div>
    </>
  );
}
