import React, { useState, useEffect } from "react";
import axios from 'axios';
import { useAuth } from "../../../store/auth/AuthContext";

import "./style/ChannelsList.scss";

export default function ChannelsList() {
    const [userConnected, setUserConnected] = useState([]);
    const [userChannels, setUserChannels] = useState([]);
    const { userId } = useAuth();

    console.log(userConnected);
    const fetchUserChannels = async () => {

        try {
            const userResponse = await axios.get(
                `http://localhost:3002/api/user/${userId}`
            );
            setUserConnected(userResponse.data);
            const channels = userResponse.data.rooms;
            

            const userChannelsListing = channels.filter(
                (rooms) => rooms.status === "channel"
            );

            const fetchChannelDetails = async (userChannelsList) => {
                return await Promise.all(
                    userChannelsList.map((rooms) =>
                        axios.get(`http://localhost:3002/api/user/rooms/${rooms._id}`)
                    )
                );
            };

            const userChannelsDetails = await fetchChannelDetails(userChannelsListing);

            setUserChannels(userChannelsDetails.map((response) => response.data));
            fetchUserChannels();
        } catch (error) {
            console.error("Erreur lors de la récupération des channels:", error);
        }
    };
    useEffect(() => {
        fetchUserChannels();
    }, [userId]
    );
    return (
        <div className="channels-list-container">
            <h2>Mes channels</h2>
            <ul className="channels-list">
                {userChannels.map((rooms) => (
                    <li key={rooms._id} className="channel-item">
                        <span className="channel-name">{rooms.title}</span>
                        <button className="join-button">Rejoindre</button>
                    </li>
                ))}
            </ul>
        </div>
    );
}
