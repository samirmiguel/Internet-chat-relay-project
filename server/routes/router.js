const express = require("express");
const route = express.Router();
const UserController = require("../controller/UserController");
const MessageController = require("../controller/MessageController");
const RoomController = require("../controller/RoomController");

// API

// User

route.post("/api/login", UserController.login);
route.post("/api/user", UserController.create);
route.get("/api/users", UserController.find);
route.get("/api/user/:id", UserController.findOne);
route.get("/api/check-email", UserController.checkEmail);
route.put("/api/user/:id", UserController.update);
route.delete("/api/user/:id", UserController.delete);

// Message

route.post("/api/message", MessageController.create);
route.get("/api/messages", MessageController.find);
route.get("/api/message/:id", MessageController.findOne);
route.put("/api/message/:id", MessageController.update);
route.delete("/api/message/:id", MessageController.delete);

// Room

route.post("/api/room", RoomController.create);
route.get("/api/rooms", RoomController.find);
route.get("/api/room/:id", RoomController.findOne);
route.put("/api/room/:id", RoomController.update);
route.delete("/api/room/:id", RoomController.delete);

module.exports = route;

// SAMIR

// récupérer users pour create channel
// route.get('/users', async (req, res) => {
//     try {
//         // Récupérer tous les utilisateurs
//         const users = await People.find({}, 'firstname lastname');

//         res.json(users);
//     } catch (error) {
//         console.error('Erreur lors de la récupération des utilisateurs :', error);
//         res.status(500).json({ error: 'Erreur lors de la récupération des utilisateurs' });
//     }
// });

// // channel's list
// route.get('/channels', async (req, res)=>{
//     try{
//         // récupérer uniquement les rooms de type "channel"
//         const channels= await People.find({ 'rooms.type': 'channel', 'rooms.members': req.user._id});

//         res.json(channels);
//     } catch (error){
//         console.error('Erreur de récupération des channels')

//         res.status(500).json({ error: 'Erreur de récupération des channels '});
//     }
// });
// module.exports = route;
