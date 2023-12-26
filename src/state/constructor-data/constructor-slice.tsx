import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import {IngredientModel} from "../../models/burger-data.model";
import {makeOrder} from "./constructor-api";
import {v4 as uuidv4} from 'uuid';


interface ConstructorState {
    ingredientsConstructor: IngredientModel[];
    bun: IngredientModel | null
    loading: boolean;
    error: any;
    orderNumber: number | null;
}

const initialState: ConstructorState = {
    ingredientsConstructor: [],
    bun: null,
    loading: false,
    error: null,
    orderNumber: null
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
            state.ingredientsConstructor = [...state.ingredientsConstructor, {...action.payload, unId: uuidv4()}];
        },
        clearOrderNumber: (state) => {
            state.orderNumber = null;
        }

    },
    extraReducers: (builder) => {
        builder
            .addCase(makeOrder.pending, (state) => {
            state.loading = true;
            })
            .addCase(makeOrder.fulfilled, (state, action) => {
                state.loading = false;
                state.ingredientsConstructor = [];
                state.bun = null;
                state.orderNumber = action.payload.order.number;
            })
            .addCase(makeOrder.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            });
    }

});
export const {setIngredientsConstructor,addIngredient,clearOrderNumber,
    setBun ,deleteIngredient} = constructorSlice.actions;
export default constructorSlice.reducer;
