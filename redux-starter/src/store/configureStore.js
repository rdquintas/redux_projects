import { configureStore } from "@reduxjs/toolkit";
import reducer from "./reducer";
import logger from "./middleware/logger";
import func from "./middleware/func";
import toast from "./middleware/toast";
import api from './middleware/api';

export default function initStore() {
  return configureStore({
    reducer: reducer,
    middleware: [logger("teste"), func, toast, api],
    // middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(logger),
    devTools: true,
    trace: true,
  });
}
