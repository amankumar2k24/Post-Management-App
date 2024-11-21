const mongoose = require("mongoose");

const taskSchema = mongoose.Schema(
  {
    title: { type: String, required: true },
    description: { type: String },
    avatar: { type: String },
  },
  { timestamps: true }
);

module.exports = taskModel = mongoose.model("taskModel", taskSchema);
