import { configureStore } from '@reduxjs/toolkit';

import { firestoreApi } from './firestoreApi';

export const setupStore = () =>
  configureStore({
    reducer: {
      [firestoreApi.reducerPath]: firestoreApi.reducer,
  
    },
    middleware: (getDefaultMiddleware) => {
      return getDefaultMiddleware().concat(firestoreApi.middleware);
    },
  });

export const store = setupStore();

export type AppStore = ReturnType<typeof setupStore>;
export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
