import React, { useEffect, useState } from "react";
import Modal from "../components/Modal/Modal";
import { useDispatch, useSelector } from "react-redux";
import {
  deleteTask,
  deleteTaskOptimistic,
  getTasks,
  setEditTaskData,
} from "../store/slices/taskSlice";
import { SyncLoader } from "react-spinners";

const Home = () => {
  const [showModal, setShowModal] = useState(false);
  const [search, setSearch] = useState("");
  const dispatch = useDispatch();
  const { tasks, loading, error, editTaskData } = useSelector(
    (state) => state.root.task
  );

  const handleAddTask = () => {
    setShowModal(true);
    dispatch(setEditTaskData(null));
  };

  //Getting Task
  useEffect(() => {
    dispatch(getTasks());
  }, [dispatch]);

  //Delete Task
  const handleDeleteTask = (e, id) => {
    e.preventDefault();
    dispatch(deleteTask(id));
    dispatch(deleteTaskOptimistic(id));
  };

  //Handle Edit
  const handleEdit = (item) => {
    setShowModal(true);
    dispatch(setEditTaskData(item));
  };

  if (loading) {
    <div className="bg-red-500 text-lg">
      <SyncLoader size={8} color="#fff" />
    </div>;
  }
  if (error) {
    <div className="bg-red-500 mt-10">
      Error occuring while fetching the data
    </div>;
  }

  return (
    <div className="mt-20">
      <div className="flex flex-col w-full min-h-screen">
        <main className="flex flex-1 flex-col gap-4 p-2 sm:p-8 md:gap-8 md:p-10">
          <div className="mx-auto w-full grid gap-4 md:gap-6 ">
            <div className="flex flex-col md:flex-row justify-between gap-2">
              <div>
                <h1 className="text-3xl font-bold">My Posts</h1>
                <p className="text-gray-500 dark:text-gray-400">
                  Here are my current posts. I'll be productive today!
                </p>
              </div>

              <div className="relative">
                <input
                  type="search"
                  id="location-search"
                  className="block w-full max-w-xs px-4 py-2.5 border border-gray-300 rounded-lg shadow-sm focus:outline-none  text-sm bg-gray-50 text-gray-700 placeholder-gray-400 transition-all ease-in-out"
                  placeholder="Search your post"
                  required
                  onChange={(e) => setSearch(e.target.value)}
                />
              </div>

              <button
                type="button"
                className="text-white bg-gradient-to-r w-20 h-10 md:w-auto md:h-auto px-2 md:px-5 py-1 from-blue-500 via-blue-600 to-blue-700 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 font-medium rounded-lg text-sm text-center me-2 mb-2"
                onClick={handleAddTask}
              >
                Add Post
              </button>
            </div>

            <div className="flex flex-row flex-wrap gap-4 w-full justify-center">
              {tasks
                ?.filter((item) =>
                  item.title.toLowerCase().includes(search.toLowerCase())
                )
                .map((item) => (
                  <div
                    key={item._id}
                    className="relative flex flex-col my-6 bg-white shadow-sm border border-slate-200 rounded-lg min-w-64 sm:w-96 sm:min-h-[530px]"
                  >
                    {/* Image Section */}
                    <div className="relative h-56 m-2.5 overflow-hidden text-white rounded-md">
                      <img
                        src={item.avatar || "https://via.placeholder.com/800"} // Default placeholder image
                        alt={item.title}
                        className="w-full h-full object-cover"
                      />
                    </div>

                    {/* Title and Description Section */}
                    <div className="p-4">
                      <h6 className="mb-2 text-slate-800 text-xl font-semibold">
                        {item.title}
                      </h6>
                      <p className="text-slate-600 leading-normal font-light">
                        {item.description}
                      </p>
                    </div>

                    {/* Buttons Section */}
                    <div className="px-4 pb-4 pt-0 mt-2 flex justify-between items-center sm:absolute bottom-4 left-0 right-0">
                      <button
                        className="rounded-md bg-red-600 py-2 px-4 border border-transparent text-center text-sm text-white transition-all shadow-md hover:shadow-lg focus:bg-red-500 active:bg-red-500 disabled:pointer-events-none disabled:opacity-50"
                        type="button"
                        onClick={(e) => handleDeleteTask(e, item._id)}
                      >
                        Delete
                      </button>
                      <button
                        className="rounded-md bg-green-600 py-2 px-4 border border-transparent text-center text-sm text-white transition-all shadow-md hover:shadow-lg focus:bg-green-500 active:bg-green-500 disabled:pointer-events-none disabled:opacity-50"
                        type="button"
                        onClick={() => handleEdit(item)}
                      >
                        Edit
                      </button>
                    </div>
                  </div>
                ))}
            </div>
          </div>
        </main>
      </div>

      {showModal && (
        <Modal setShowModal={setShowModal} editTaskData={editTaskData} />
      )}
    </div>
  );
};

export default Home;
