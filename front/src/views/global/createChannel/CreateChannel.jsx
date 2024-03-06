import React, { useState, useEffect } from "react";
import axios from "axios";
import "./style/CreateChannel.scss";

export default function CreateChannel() {
  const [channelName, setChannelName] = useState("");
  const [description, setDescription] = useState("");
  const [selectedMembers, setSelectedMembers] = useState([]);
  const [members, setMembers] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    // Requête API pour récupérer la liste des utilisateurs depuis le serveur
    axios
      .get("http://localhost:3002/api/users")
      .then((response) => {
        const filteredUsers = response.data.filter(
          (user) => user.status !== "admin"
        );
        setMembers(filteredUsers);
      })
      .catch((error) =>
        console.error("Erreur lors de la récupération des utilisateurs:", error)
      );
  }, []);

  const handleCreateChannel = () => {
    // Check if channelName and selectedMembers are not empty
    if (channelName.trim() === "" || selectedMembers.length === 0) {
      alert("Please provide a channel name and select members.");
      return;
    }
    // channel creation logic

    console.log(`Création du channel : ${channelName}`);
    console.log(`Description : ${description}`);
    console.log("Membres :", selectedMembers);
    // Display alert after channel creation
    alert("Channel created successfully!");
    // Clear the form
    setChannelName("");
    setDescription("");
    setSelectedMembers([]);
    setSearchTerm("");
  };

  const handleMemberSelection = (e) => {
    const selectedMemberIds = Array.from(
      e.target.selectedOptions,
      (option) => option.value
    );
    console.log("Selected Member IDs:", selectedMemberIds);
    setSelectedMembers(selectedMemberIds);
  };

  const filteredMembers = members.filter(
    (member) =>
      member.firstname.toLowerCase().includes(searchTerm.toLowerCase()) ||
      member.lastname.toLowerCase().includes(searchTerm.toLowerCase())
  );
  return (
    <div className="c-channel-page-container">
      <div className="c-channel-content-container">
        <div className="create-channel-container">
          <h2>Créer un nouveau channel</h2>
          <form>
            <label>Nom du channel:</label>
            <input
              type="text"
              value={channelName}
              onChange={(e) => setChannelName(e.target.value)}
            />
            <label>Description : </label>
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            ></textarea>
            <label>Membres :</label>
            <input
              type="text"
              placeholder="Rechercher des membres"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            <select
              multiple
              value={selectedMembers}
              onChange={handleMemberSelection}
            >
              {filteredMembers.map((member) => (
                <option key={member.id} value={member.id}>
                  {" "}
                  {member.firstname} {member.lastname}
                </option>
              ))}
            </select>
            <button type="button" onClick={handleCreateChannel}>
              Créer le channel
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
