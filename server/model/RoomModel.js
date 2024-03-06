const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const roomSchema = new Schema({
  type: {
    type: String,
    required: true,
    enum: ["private", "channel"],
  },
  owner: {
    type: Schema.Types.ObjectId,
    ref: "People",
  },
  members: [
    {
      type: Schema.Types.ObjectId,
      ref: "People",
      required: true,
    },
  ],
  messages: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Message",
    },
  ],
  created_at: {
    type: Date,
    default: Date.now,
  },
});

const Room = mongoose.model("Room", roomSchema);

module.exports = Room;
