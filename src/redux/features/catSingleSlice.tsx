import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import axios from 'axios';

interface CatImage {
    id: string;
    url: string;
    width: number;
    height: number;
}

interface CatsState {
    images: CatImage[];
    status: 'idle' | 'loading' | 'succeeded' | 'failed';
    error: string | null;
}
const initialState: CatsState = {
    images: [],
    status: 'idle',
    error: null,
};
interface FetchCatImagesParams {
    categoryId: number;
    limit: number;
}

export const fetchCatImages = createAsyncThunk<CatImage[], FetchCatImagesParams>(
    'cats/fetchImages',
    async ({ categoryId, limit }, { rejectWithValue }) => {
        try {
            const response = await axios.get<CatImage[]>(
                `https://api.thecatapi.com/v1/images/search?category_ids=${categoryId}&limit=${limit}`,
                {
                    headers: { 'x-api-key': 'live_q3oWZGD4N3r4Gp260jMfg24LgEcftKy1JW4baXDF38C05EtSU5MKfojTI9QlFuGy' },
                },
            );
            return response.data;
        } catch (error: any) {
            return rejectWithValue(error.response?.data?.message || 'Ошибка запроса');
        }
    },
);
const catsSlice = createSlice({
    name: 'cats',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchCatImages.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(fetchCatImages.fulfilled, (state, action: PayloadAction<CatImage[]>) => {
                state.status = 'succeeded';
                state.images = action.payload;
            })
            .addCase(fetchCatImages.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.error.message || 'Ошибка загрузки';
            });
    },
});

export default catsSlice.reducer;
