import { configureStore } from "@reduxjs/toolkit";
import { combineReducers } from "redux";
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";
import {
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from "redux-persist";

import uiReducer from "./slices/uiSlice";
import authReducer from "./slices/authSlice";
import courseReducer from "./slices/courseSlice";
import chatReducer from "./slices/chatSlice";
import courseCreationReducer from "./slices/courseCreationSlice"

const nonPersistedReducer = combineReducers({
    course: courseReducer,
    chat: chatReducer,
    courseCreation: courseCreationReducer
});

const persistConfig = {
  key: "simesta-web",
  storage,
  whitelist: ["ui", "auth"], 
};

const persistedReducers = combineReducers({
    ui: uiReducer,
    auth: authReducer,
});

const rootPersistedReducer = persistReducer(persistConfig, persistedReducers);

const rootReducer = combineReducers({
    persisted: rootPersistedReducer, 
    nonPersisted: nonPersistedReducer, 
});


export const store = configureStore({
  reducer: rootReducer, 
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
});

export const persistor = persistStore(store);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;