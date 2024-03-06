let Room = require("../model/RoomModel");

// create and save room

exports.create = (req, res) => {
  if (!req.body) {
    res.status(400).send({ message: "Content can't be empty !" });
    return;
  }

  // new room

  const room = new Room({
    type: req.body.type,
    members: req.body.members,
  });

  // save the room in the db

  room
    .save()
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message:
          err.message || "Some error occured while doing a create operation",
      });
    });
};

// find and return all rooms

exports.find = (req, res) => {
  Room.find()
    .populate("messages")
    .then((room) => {
      res.send(room);
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || "Error occured while finding all rooms",
      });
    });
};

// find and return only one room

exports.findOne = (req, res) => {
  const id = req.params.id;

  Room.findById(id)
    .populate("messages")
    .then((data) => {
      if (!data) {
        res.status(404).send({
          message: `We can't find the room with id ${id}. Maybe it doesn't exist`,
        });
      } else {
        res.send(data);
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || "Error when finding room information",
      });
    });
};

// Update a room thanks its id

exports.update = (req, res) => {
  if (!req.body) {
    return res.status(400).send({ message: "Data to update can't be empty" });
  }

  const id = req.params.id;

  Room.findByIdAndUpdate(id, req.body, { useFindAndModify: false })
    .then((data) => {
      if (!data) {
        res.status(404).send({
          message: `We can't update room with ID : ${id}. Maybe it doesn't exist`,
        });
      } else {
        res.send(data);
      }
    })
    .catch((err) => {
      res
        .status(500)
        .send({ message: "Error when updating room informations" });
    });
};

// Delete a room thanks id

exports.delete = (req, res) => {
  const id = req.params.id;

  Room.findByIdAndDelete(id)
    .then((data) => {
      if (!data) {
        res.status(404).send({
          message: `We can't delete room with ID : ${id}. Maybe it doesn't exist`,
        });
      } else {
        res.status(200).send({ message: "Room has been delete successfully" });
      }
    })
    .catch((err) => {
      res
        .status(500)
        .send({ message: `Error when deleting room with id : ${id}` });
    });
};
