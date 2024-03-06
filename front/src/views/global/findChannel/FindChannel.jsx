import "./style/FindChannel.scss";
import axios from "axios";
import { useState, useEffect } from "react";
import { useAuth } from "../../../store/auth/AuthContext";

export default function FindChannel() {
  const { userId } = useAuth();

  console.log(userId);

  return (
    <div className="find-channels__container">
      <h2>Trouve ton channel dès maintenant !</h2>
    </div>
  );
}
