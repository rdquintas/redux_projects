import { createSlice } from "@reduxjs/toolkit";
import { createSelector } from "reselect";
import { apiCallBegan } from "./api";
// // Action Types
// const BUG_ADDED = "bugResolved";
// const BUG_REMOVED = "bugRemoved";
// const BUG_RESOLVED = "bugResolved";

// Action Creators
// export const bugAdded = (description) => {
//   return {
//     type: BUG_ADDED,
//     payload: { description: description },
//   };
// };
// export const bugRemoved = (id) => {
//   return {
//     type: BUG_REMOVED,
//     payload: { id: id },
//   };
// };
// export const bugResolved = (id) => {
//   return {
//     type: BUG_RESOLVED,
//     payload: { id: id },
//   };
// };

// Action Creators (usando o Redux Toolkit, mais simples portanto)
// export const bugAdded = createAction("bugAdded");
// export const bugRemoved = createAction("bugRemoved");
// export const bugResolved = createAction("bugResolved");

// let lastId = 0;

// Esta é a forma preferida do Mosh criar REDUCERS+ACTIONS ao mesmo tempo
const slice = createSlice({
  name: "bugs",
  // initialState: [],
  initialState: { list: [], loading: false, lastFetch: null },
  reducers: {
    bugsReceived: (bugs, action) => {
      bugs.list = action.payload;
      bugs.loading = false;
      bugs.lastFetch = Date.now();
    },
    bugAdded: (bugs, action) => {
      bugs.list.push(action.payload);
      // bugs.list.push({
      //   id: ++lastId,
      //   description: action.payload.description,
      //   resolved: false,
      // });
    },
    bugAssignedToUser: (bugs, action) => {
      const { id: bugId, userId } = action.payload;
      const index = bugs.list.findIndex((bug) => bug.id === bugId);
      bugs.list[index].userId = userId;
    },
    bugRemoved: (bugs, action) => {
      bugs.list = bugs.list.filter((bug) => bug.id !== action.payload.id);
    },
    bugResolved: (bugs, action) => {
      const index = bugs.list.findIndex((bug) => bug.id === action.payload.id);
      bugs.list[index].resolved = true;
    },
  },
});

const { bugAdded, bugResolved, bugRemoved, bugAssignedToUser, bugsReceived } =
  slice.actions;
export default slice.reducer;

// Action Creators
const url = "/bugs";
// versao 1 do loadBugs
export const loadBugs = () =>
  apiCallBegan({
    url,
    onSuccess: bugsReceived.type,
  });

// // versao 2 do loadBugs
// export const loadBugs = () => (dispatch, getState) => {
//   const { lastFetch } = getState().entities.bugs;

//   const diffInMinutes = moment().diff(moment(lastFetch), "minutes");

//   if (diffInMinutes < 10) {
//     return;
//   }

//   dispatch(
//     apiCallBegan({
//       url,
//       onSuccess: bugsReceived.type,
//     })
//   );
// };

// versao do addBug
export const addBug = (bug) =>
  apiCallBegan({
    url,
    method: "post",
    data: bug,
    onSuccess: bugAdded.type,
  });

export const resolveBug = (id) =>
  apiCallBegan({
    url: url + "/" + id,
    method: "patch",
    data: { resolved: true },
    onSuccess: bugResolved.type,
  });

export const assignBugToUser = (bugId, userId) =>
  apiCallBegan({
    url: url + "/" + bugId,
    method: "patch",
    data: { userId },
    onSuccess: bugAssignedToUser.type,
  });

// // Selector function
// export const getUnresolvedBugs = (state) => {
//   return state.entities.bugs.filter((bug) => !bug.resolved);
// };

// Selector function - mas usando o npm reselect com base em Memoization
// ou seja, dados guardados em cache
// se ja tiver sido chamado uma 1a vez.... e se voltarmos a chamar esta funcao
// novamente para o mesmo input, entao ele nao vai executer a linha do bugs.filter()
export const getUnresolvedBugs = createSelector(
  (state) => state.entities.bugs,
  (bugs) => bugs.list.filter((bug) => !bug.resolved)
);

export const getBugsByUser = (userId) =>
  createSelector(
    (state) => state.entities.bugs,
    (bugs) => bugs.list.filter((bug) => bug.userId === userId)
  );

// // Esta é a alternativa em criar um reducer usando redux toolkit
// // IMPORTANTE: o redux toolkit utiliza Immer lá dentro
// // https://github.com/immerjs/immer
// // Isto quer dizar que utliza o Immer para lidar com a Immutability do Functional Programming.
// // Por isso é que ele faz no codigo em baixo coisas como state.push() ou state[index].resolved = true como se estivessemos a usar plain vanilla JavaScript… mas é o Immer que esta ali por tras a garantir que o state não é alterado directamente mas sim através de uma copia.
// // Mas o resultado final é podermos criar codigo como se fosse JS “normal”.
// export default createReducer([], {
//   [bugAdded.type]: (bugs, action) => {
//     bugs.push({
//       id: ++lastId,
//       description: action.payload.description,
//       resolved: false,
//     });
//   },
//   [bugRemoved.type]: (bugs, action) => {
//     bugs = bugs.filter((bug) => bug.id !== action.payload.id);
//   },
//   [bugResolved.type]: (bugs, action) => {
//     const index = bugs.findIndex((bug) => bug.id === action.payload.id);
//     bugs[index].resolved = true;
//   },
// });

// export default function reducer(state = [], action) {
//   switch (action.type) {
//     case bugAdded.type:
//       return [
//         ...state,
//         {
//           id: ++lastId,
//           description: action.payload.description,
//           resolved: false,
//         },
//       ];
//     case bugRemoved.type:
//       return state.filter((bug) => bug.id !== action.payload.id);
//     case bugResolved.type:
//       return state.map((bug) =>
//         bug.id !== action.payload.id ? bug : { ...bug, resolved: true }
//       );
//     default:
//       return state;
//   }
// }
