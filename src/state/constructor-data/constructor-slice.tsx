import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import {IngredientModel} from "../../models/burger-data.model";

interface ConstructorState {
    ingredientsConstructor: IngredientModel[];
    loading: boolean;
    error: string | null;
}

const initialState: ConstructorState = {
    ingredientsConstructor: [],
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

    },

});
export const {setIngredientsConstructor } = constructorSlice.actions;
export default constructorSlice.reducer;
