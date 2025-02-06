import { configureStore } from '@reduxjs/toolkit';

import catReducer from './features/catSlice';
import catsImageReducer from './features/catSingleSlice';

export const store = configureStore({
    reducer: {
        cats: catReducer,
        catsImage: catsImageReducer,
    },
});
export type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;
