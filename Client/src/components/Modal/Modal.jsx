import React, { useState } from "react";
import { SyncLoader } from "react-spinners";
import { toast } from "react-toastify";
import { useDispatch } from "react-redux";
import {
  createTask,
  getTasks,
  setEditTaskData,
  updateTask,
} from "../../store/slices/taskSlice";

const Modal = ({ setShowModal, editTaskData }) => {
  console.log("editTaskData", editTaskData);
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();
  const [initialData, setInitialData] = useState({
    title: editTaskData ? editTaskData.title : "",
    description: editTaskData ? editTaskData.description : "",
    avatar: editTaskData ? editTaskData.avatar : null,
  });

  const handleInput = (event) => {
    const { value, id } = event.target;
    setInitialData((prev) => ({ ...prev, [id]: value }));
  };

  const handleFileInput = (event) => {
    const avatar = event.target.files[0];
    setInitialData((prev) => ({ ...prev, avatar }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!initialData.title.trim() || !initialData.description.trim()) {
      toast.error("Please fill all the required fields");
      return;
    }
    if (!initialData.avatar && !editTaskData.avatar) {
      toast.error("Please upload an image");
      return;
    }

    setLoading(true);
    try {
      const formData = new FormData();
      formData.append("title", initialData.title);
      formData.append("description", initialData.description);

      if (initialData.avatar) {
        formData.append("avatar", initialData.avatar);
      }

      if (editTaskData) {
        // Update existing task
        await dispatch(updateTask({ id: editTaskData._id, formData }));
      } else {
        // Create new task
        await dispatch(createTask(formData));
      }

      dispatch(getTasks());
      dispatch(setEditTaskData(null));
      setShowModal(false);
    } catch (error) {
      toast.error("An error occurred while submitting the form");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      id="crud-modal"
      tabIndex={-1}
      aria-hidden="true"
      className="overflow-y-auto overflow-x-hidden fixed top-0 right-0 left-0 z-50 flex justify-center items-center w-full h-full"
    >
      <div className="relative p-4 w-full max-w-md max-h-full">
        <div className="relative bg-[#1f2937] rounded-lg shadow-md shadow-black">
          {/* Modal Header */}
          <div className="flex items-center justify-between p-4 border-b">
            <h3 className="text-lg font-semibold text-white">
              {editTaskData ? "Edit Post" : "Create New Post"}
            </h3>
            <button
              type="button"
              className="text-red-500 hover:bg-gray-700 rounded-lg p-1"
              onClick={() => setShowModal(false)}
            >
              ✖
            </button>
          </div>
          {/* Modal Body */}
          <form className="p-4" onSubmit={handleSubmit}>
            <div className="grid gap-4 mb-4">
              <div>
                <label
                  htmlFor="avatar"
                  className="block mb-2 text-sm font-medium text-white"
                >
                  Upload Image
                </label>
                <div className="mb-3">
                  {initialData.avatar ? (
                    <img
                      src={
                        typeof initialData.avatar === "string"
                          ? initialData.avatar
                          : URL.createObjectURL(initialData.avatar)
                      }
                      alt="Post Avatar"
                      className="w-20 h-20 object-cover rounded-md"
                    />
                  ) : (
                    <div className="text-gray-500">No image selected</div>
                  )}
                </div>
                <input
                  type="file"
                  id="avatar"
                  className="block w-full text-sm text-gray-900 bg-gray-50 border border-gray-300 rounded-lg cursor-pointer"
                  onChange={handleFileInput}
                />
              </div>
              <div>
                <label
                  htmlFor="title"
                  className="block mb-2 text-sm font-medium text-white"
                >
                  Title
                </label>
                <input
                  type="text"
                  id="title"
                  placeholder="Type your title"
                  value={initialData.title}
                  onChange={handleInput}
                  className="w-full p-2.5 bg-gray-50 border border-gray-300 rounded-lg"
                  required
                />
              </div>
              <div>
                <label
                  htmlFor="description"
                  className="block mb-2 text-sm font-medium text-white"
                >
                  Description
                </label>
                <textarea
                  id="description"
                  placeholder="Write description here"
                  rows={4}
                  value={initialData.description}
                  onChange={handleInput}
                  className="w-full p-2.5 bg-gray-50 border border-gray-300 rounded-lg"
                  required
                />
              </div>
            </div>
            <button
              type="submit"
              className="w-full text-white bg-blue-700 hover:bg-blue-800 p-2.5 rounded-lg"
            >
              {loading ? (
                <SyncLoader size={8} color="#fff" />
              ) : editTaskData ? (
                "Update Post"
              ) : (
                "Add Post"
              )}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Modal;
