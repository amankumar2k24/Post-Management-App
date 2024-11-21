import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import {
  CreateTaskApi,
  DeleteTaskApi,
  GetTaskApi,
  UpdateTaskApi,
} from "../../services/api.services";
import { toast } from "react-toastify";

//Created Thunk Middleware
export const createTask = createAsyncThunk(
  "tasks/createTask",
  async (taskData, { rejectWithValue }) => {
    try {
      const response = await CreateTaskApi(taskData);
      console.log("response", response);
      toast.success(response.data.message);
      return response.data.results;
    } catch (err) {
      toast.error(err.response.data.message);
      return rejectWithValue(err.response.data.message);
    }
  }
);

export const getTasks = createAsyncThunk("tasks/getTask", async () => {
  try {
    const response = await GetTaskApi();
    return response.data.results;
  } catch (err) {
    toast.error(err.response.data.message);
    return rejectWithValue(err.response.data.message);
  }
});

export const deleteTask = createAsyncThunk("tasks/deleteTask", async (id) => {
  try {
    const response = await DeleteTaskApi(id);
    toast.success(response.data.message);
    // console.log("delete Response", response)
  } catch (err) {
    toast.error(err.response.data.message);
    return rejectWithValue(err.response.data.message);
  }
});

export const updateTask = createAsyncThunk(
  "tasks/updateTask",
  async ({ id, formData }) => {
    try {
      const response = await UpdateTaskApi(id, formData);
      // console.log("res coming from updateTask =>", response)
      toast.success(response.data.message);
      return response.data.results;
    } catch (err) {
      toast.error(err.response.data.message);
      return rejectWithValue(err.response.data.message);
    }
  }
);

const initialState = {
  tasks: [],
  loading: false,
  error: null,
  editTaskData: null,
};

const taskSlice = createSlice({
  name: "tasks",
  initialState,
  reducers: {
    deleteTaskOptimistic: (state, action) => {
      state.tasks = state.tasks.filter((task) => task._id !== action.payload);
    },

    setEditTaskData: (state, action) => {
      state.editTaskData = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(createTask.pending, (state) => {
        state.loading = true;
      })
      .addCase(createTask.fulfilled, (state, action) => {
        state.loading = false;
        state.tasks.push(action.payload);
      })
      .addCase(createTask.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      .addCase(getTasks.pending, (state) => {
        state.loading = true;
      })
      .addCase(getTasks.fulfilled, (state, action) => {
        state.loading = false;
        state.tasks = action.payload;
      })
      .addCase(getTasks.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      .addCase(deleteTask.pending, (state, action) => {
        state.loading = true;
      })
      .addCase(deleteTask.fulfilled, (state, action) => {
        state.loading = false;
      })
      .addCase(deleteTask.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      .addCase(updateTask.pending, (state, action) => {
        state.loading = true;
      })
      .addCase(updateTask.fulfilled, (state, action) => {
        state.loading = false;
        state.tasks = state.tasks.map((task) =>
          task._id === action.payload._id ? action.payload : task
        );
      })
      .addCase(updateTask.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  },
});

export const { deleteTaskOptimistic, setEditTaskData } = taskSlice.actions;
export default taskSlice.reducer;
