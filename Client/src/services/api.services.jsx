import axios from "axios";

const { VITE_BACKEND_PORT_DEVELOPMENT } = import.meta.env;

// Task
export const CreateTaskApi = async (data) => {
  return await axios.post(
    `${VITE_BACKEND_PORT_DEVELOPMENT}/task/create-task`,
    data
  );
};

export const GetTaskApi = async () => {
  return await axios.get(`${VITE_BACKEND_PORT_DEVELOPMENT}/task/get-task`);
};

export const DeleteTaskApi = async (id) => {
  return await axios.delete(
    `${VITE_BACKEND_PORT_DEVELOPMENT}/task/delete-task/${id}`
  );
};

export const UpdateTaskApi = async (id, data) => {
  return await axios.patch(
    `${VITE_BACKEND_PORT_DEVELOPMENT}/task/update-task/${id}`,
    data
  );
};
