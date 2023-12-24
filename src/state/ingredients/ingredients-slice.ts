import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import {IngredientModel} from "../../models/burger-data.model";
import {fetchIngredients} from "./ingredients-api";

interface IngredientsState {
    ingredients: IngredientModel[];
    loading: boolean;
    error: string | null;
}

const initialState: IngredientsState = {
    ingredients: [],
    loading: false,
    error: null,
};

export const ingredientsSlice = createSlice({
    name: 'ingredients',
    initialState,
    reducers: {
        setIngredients: (state, action: PayloadAction<IngredientModel[]>) => {
            state.ingredients = action.payload;
        },
    },
        extraReducers: (builder) => {
            builder
                .addCase(fetchIngredients.pending, (state) => {
                    state.loading = true;
                    state.error = null;
                })
                .addCase(fetchIngredients.fulfilled, (state, action: PayloadAction<IngredientModel[]>) => {
                    state.ingredients = action.payload;
                    state.loading = false;
                })
                .addCase(fetchIngredients.rejected, (state, action) => {
                    state.loading = false;
                    state.error = action.error.message || 'Неизвестная ошибка';
                });
        },
    });

export default ingredientsSlice.reducer;
