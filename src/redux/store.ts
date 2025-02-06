import { configureStore } from '@reduxjs/toolkit';

import catReducer from './features/catSlice';

export const store = configureStore({
    reducer: {
        cats: catReducer,
    },
});
