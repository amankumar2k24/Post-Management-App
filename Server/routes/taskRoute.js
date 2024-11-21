const bodyParser = require("body-parser");
const express = require("express");
const {
  createTask,
  getTask,
  deleteTask,
  updateTask,
} = require("../controller/taskController");
const { validate } = require("../middleware/validateMiddleware");
const upload = require("../middleware/upload");
const { taskValidator } = require("../validator/task");

const router = express.Router();

router.post(
  "/create-task",
  upload.single("avatar"),
  validate(taskValidator),
  createTask
);
router.get("/get-task", getTask);
router.delete("/delete-task/:id", deleteTask);
router.patch("/update-task/:id", upload.single("avatar"), updateTask);

module.exports = router;
