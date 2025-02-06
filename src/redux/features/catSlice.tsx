import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';

interface Category {
    id: number;
    name: string;
}
interface CatState {
    categories: Category[];
    loading: boolean;
    error: string | null;
}
const initialState: CatState = {
    categories: [],
    loading: false,
    error: null,
};

export const fetchCategories = createAsyncThunk<Category[]>('cats/fetchCategories', async (_, { rejectWithValue }) => {
    try {
        const response = await axios.get('https://api.thecatapi.com/v1/categories');
        return response.data;
    } catch (error: any) {
        return rejectWithValue(error.message);
    }
});
const catSlice = createSlice({
    name: 'cats',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchCategories.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchCategories.fulfilled, (state, action) => {
                state.loading = false;
                state.categories = action.payload;
            })
            .addCase(fetchCategories.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload as string;
            });
    },
});

export default catSlice.reducer;
