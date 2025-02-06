import { configureStore } from '@reduxjs/toolkit';

import catReducer from './features/catSlice';

export const store = configureStore({
    reducer: {
        cats: catReducer,
    },
});
export type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;
