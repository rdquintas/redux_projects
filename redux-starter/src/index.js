import initStore from "./store/configureStore";
import * as bugActions from "./store/bugs";
import * as projectsActions from "./store/projects";
import * as usersActions from "./store/users";
import * as actions from "./store/api";
import { loadBugs, addBug } from "./store/bugs";
const store = initStore();

const unsubscribe = store.subscribe(() => {
  console.log("store changed", store.getState());
});

// store.dispatch(usersActions.userAdded({ name: "User1" }));
// store.dispatch(usersActions.userAdded({ name: "User2" }));

// // este dispacth é interessante - pois passa uma funcao em vez
// // de uma action. Mas para poder fazer isso tenho que configurar
// // a minha store com
// //    middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(logger),
// // na pratica estou a usar o "Thunk" que o redux toolkit me oferece
// store.dispatch((dispatch, getState) => {
//   // Passo 1
//   // Call an API. E depois vou querer validar no passo 2
//   // o que é que veio da API e depois fazer novo dispatch com outra action

//   // Passo 2
//   // por exemplo, aqui estou a simular como se tivesse recebido um
//   // array de bugs vindo da API, e faço dispatch novamente mas com outra action
//   dispatch({ type: "bugsReceived", bugs: [1, 2, 3] });
// });

// store.dispatch(projectsActions.projectAdded({ name: "Project1" }));

// store.dispatch({ type: "error", payload: { message: "An error occurred" } });

// store.dispatch(bugActions.bugAdded({ description: "Bug1" }));
// store.dispatch(bugActions.bugAdded({ description: "Bug2" }));
// store.dispatch(bugActions.bugResolved({ id: 2 }));
// store.dispatch(bugActions.bugAssignedToUser({ bugId: 1, userId: 1 }));
// store.dispatch(bugActions.bugAdded({ description: "Bug3" }));
// store.dispatch(bugActions.bugResolved({ id: 1 }));

// Como usear o middleware para chmara uma API rest ?
// temos varias alternativas de implementacao

// Alternativa 1
// store.dispatch({
//   type: "apiCallBegan", // ou por exemplo 'apiRequest'
//   payload: {
//     url: "/buxgs",
//     onSuccess: "bugReceived",
//     onError: "apiRequestFailed",
//   },
// });

// Alternativa 2 - mais simples
// store.dispatch(
//   actions.apiCallBegan({
//     url: "/bugs",
//     onSuccess: "bugs/bugsReceived", //- caso eu queira tratar algo Specific (ver o api.js no middleware)
//     // onError: actions.apiCallFailed.type, - caso eu queira tratar algo Specific (ver o api.js no middleware)
//   })
// );

// Alternativa 3 - ainda mais simples
// store.dispatch(loadBugs());

store.dispatch(addBug({ description: "Novo BUG" }));

// se eu chamar aqui o unsubscribe(), o proximo dispatch ja nao
// vai fazer nada. isto pode ser util quando saio de uma
// view por exemplo e nao quero ter subsribes() pendurados
// pois pode dar memory-leaks etc...
//unsubscribe();

// store.dispatch(bugActions.bugRemoved(1));

console.log(
  "getUnresolvedBugs:",
  bugActions.getUnresolvedBugs(store.getState())
);

console.log("getBugsByUser:", bugActions.getBugsByUser(1)(store.getState()));
