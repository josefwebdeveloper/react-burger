import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import {IngredientModel} from "../../models/burger-data.model";

interface ConstructorState {
    ingredientsConstructor: IngredientModel[];
    bun: IngredientModel | null
    loading: boolean;
    error: string | null;
}

const initialState: ConstructorState = {
    ingredientsConstructor: [],
    bun: null,
    loading: false,
    error: null,
};

export const constructorSlice = createSlice({
    name: 'constructor',
    initialState,
    reducers: {
        setIngredientsConstructor: (state, action: PayloadAction<IngredientModel[]>) => {
            state.ingredientsConstructor = action.payload;
        },
        setBun: (state, action: PayloadAction<IngredientModel>) => {
            state.bun = action.payload;
        },

        deleteIngredient: (state, action: PayloadAction<IngredientModel>) => {
            state.ingredientsConstructor = state.ingredientsConstructor.filter(item => {
                return item.unId !== action.payload.unId
            } );
        },
        addIngredient: (state, action: PayloadAction<IngredientModel>) => {
            state.ingredientsConstructor = [...state.ingredientsConstructor, action.payload];
        },

    },

});
export const {setIngredientsConstructor,addIngredient,
    setBun ,deleteIngredient} = constructorSlice.actions;
export default constructorSlice.reducer;
