import { createSlice } from "@reduxjs/toolkit";

let lastId = 0;

// Esta é a forma preferida do Mosh criar REDUCERS+ACTIONS ao mesmo tempo
const slice = createSlice({
  name: "users",
  initialState: [],
  reducers: {
    userAdded: (users, action) => {
        users.push({
        id: ++lastId,
        name: action.payload.name,
      });
    },
  },
});

export const { userAdded } = slice.actions;
export default slice.reducer;
