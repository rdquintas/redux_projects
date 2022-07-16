import { createSlice } from "@reduxjs/toolkit";

let lastId = 0;

// Esta é a forma preferida do Mosh criar REDUCERS+ACTIONS ao mesmo tempo
const slice = createSlice({
  name: "projects",
  initialState: [],
  reducers: {
    projectAdded: (projects, action) => {
      projects.push({
        id: ++lastId,
        name: action.payload.name,
      });
    },
  },
});

export const { projectAdded } = slice.actions;
export default slice.reducer;
