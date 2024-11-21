const { success, error } = require("../helper/baseResponse");
const { uploadImg } = require("../middleware/cloudinary");
const taskModel = require("../model/taskModel");

// API to create a Task
const createTask = async (req, res) => {
  console.log("req.body", req.body);
  console.log("req.file", req.file);
  try {
    const { title, description } = req.body;
    const uploadResult = await uploadImg(
      req?.file?.path,
      req?.file?.originalname
    );
    // console.log("uploadResult", uploadResult);
    if (!uploadResult.success) {
      return res
        .status(500)
        .json({ success: false, message: "Error uploading image" });
    }

    const newTask = new taskModel({
      title,
      description,
      avatar: uploadResult.url,
    });
    await newTask.save();

    return res
      .status(201)
      .json(success("Post Created Successfully", newTask, 201));
  } catch (err) {
    console.log(err);
    return res.status(500).json(error(err.message, 500));
  }
};

// API to get all the tasks
const getTask = async (req, res) => {
  try {
    const tasks = await taskModel.find({}).sort({ createdAt: -1 });
    return res
      .status(200)
      .json(success("Posts fetched successfully", tasks, 200));
  } catch (err) {
    return res.status(500).json(error(err.message, 500));
  }
};

//API to delete the task
const deleteTask = async (req, res) => {
  try {
    const taskId = req.params.id;
    const task = await taskModel.findOne({ _id: taskId });
    if (!task)
      return res.status(404).json(error("Post not found or unauthorized", 404));

    await taskModel.findByIdAndDelete(taskId);
    return res
      .status(200)
      .json({ message: "Post Deleted Successfully", status: 200 });
  } catch (err) {
    return res.status(500).json(error(err.message, 500));
  }
};

//API to update the task
const updateTask = async (req, res) => {
  try {
    const taskId = req.params.id;

    const task = await taskModel.findOne({ _id: taskId });
    if (!task)
      return res.status(404).json(error("Post not found or unauthorized", 404));

    const { title, description, avatar } = req.body;
    const uploadResult = await uploadImg(
      req?.file?.path,
      req?.file?.originalname
    );

    const updatedTask = await taskModel.findByIdAndUpdate(
      taskId,
      { title, description, avatar: uploadResult?.url || avatar },
      { new: true }
    );

    return res
      .status(200)
      .json(success("Post Updated successfully", updatedTask, 200));
  } catch (err) {
    return res.status(500).json(error(err.message, 500));
  }
};

module.exports = { createTask, getTask, deleteTask, updateTask };
