import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import axios from 'axios';
import { CatImageType } from '../../types/common/common';

interface CatsState {
    images: CatImageType[];
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

export const fetchCatImages = createAsyncThunk<CatImageType[], FetchCatImagesParams>(
    'cats/fetchImages',
    async ({ categoryId, limit }, { rejectWithValue }) => {
        try {
            const response = await axios.get<CatImageType[]>(
                `https://api.thecatapi.com/v1/images/search?category_ids=${categoryId}&limit=${limit}`,
                {
                    headers: { 'x-api-key': 'live_q3oWZGD4N3r4Gp260jMfg24LgEcftKy1JW4baXDF38C05EtSU5MKfojTI9QlFuGy' },
                },
            );
            return response.data;
        } catch (error: unknown) {
            if (error instanceof Error) {
                return rejectWithValue(error.message);
            }
            return rejectWithValue('Ошибка запроса');
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
            .addCase(fetchCatImages.fulfilled, (state, action: PayloadAction<CatImageType[]>) => {
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
