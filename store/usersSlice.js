import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

export const fetchUsers = createAsyncThunk(
  "users/fetchUsers",
  async ({ page = 1, limit = 10 }) => {
    const skip = (page - 1) * limit;
    const res = await fetch(
      `https://dummyjson.com/users?limit=${limit}&skip=${skip}`
    );
    const data = await res.json();
    return {
      users: data.users || [],
      total: data.total || 0,
    };
  }
);

const usersSlice = createSlice({
  name: "users",
  initialState: {
    list: [],
    total: 0,
    limit: 10,
    page: 1,
    status: "idle",
  },
  reducers: {
    setPage(state, action) {
      state.page = action.payload;
    },
    addUser(state, action) {
      state.list.unshift({
        ...action.payload,
        id: Date.now(),
      });
      state.total += 1;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchUsers.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchUsers.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.list = action.payload.users;
        state.total = action.payload.total;
      })
      .addCase(fetchUsers.rejected, (state) => {
        state.status = "failed";
      });
  },
});

export const { setPage, addUser } = usersSlice.actions;
export default usersSlice.reducer;
