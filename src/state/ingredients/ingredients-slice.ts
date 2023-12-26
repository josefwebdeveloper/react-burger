import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import {IngredientModel} from "../../models/burger-data.model";
import {fetchIngredients} from "./ingredients-api";
import {v4 as uuidv4} from 'uuid';

interface IngredientsState {
    ingredients: IngredientModel[];
    selectedIngredient: IngredientModel | null;
    loading: boolean;
    error: string | null;
}

const initialState: IngredientsState = {
    ingredients: [],
    selectedIngredient: null,
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
        setSelectedIngredient: (state, action: PayloadAction<IngredientModel>) => {
            state.selectedIngredient = action.payload;
        },
        clearSelectedIngredient: (state) => {
            state.selectedIngredient = null;
        },
        decrementCount: (state, action: PayloadAction<IngredientModel>) => {
            state.ingredients = state.ingredients.map((item) => {
                if (item._id === action.payload._id) {
                    if (item.type === 'bun') {
                        return item
                    }
                    return {...item, count: item.count - 1};
                }
                return item;
            });
        },
        incrementCount: (state, action: PayloadAction<IngredientModel>) => {
            state.ingredients = state.ingredients.map((item) => {
                if (item._id === action.payload._id) {
                    if (item.type === 'bun') {
                        return item.count === 2 ? item : {...item, count: 2}
                    }
                    return {...item, count: item.count + 1};
                } else if (item.type === 'bun') {
                    return {...item, count: 0}
                }
                return item;
            });
        },


    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchIngredients.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchIngredients.fulfilled, (state, action: PayloadAction<IngredientModel[]>) => {
                state.ingredients = action.payload.map((item) => {
                    const unId = item.unId ? item.unId : uuidv4()
                    return {...item, unId: unId, count: 0};
                });
                state.loading = false;
            })
            .addCase(fetchIngredients.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message || 'Неизвестная ошибка';
            });
    },
});
export const {
    setIngredients, setSelectedIngredient, incrementCount,decrementCount
    , clearSelectedIngredient
} = ingredientsSlice.actions;
export default ingredientsSlice.reducer;
