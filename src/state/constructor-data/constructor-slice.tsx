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

export const initialState: ConstructorState = {
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
        addIngredient: {
            reducer: (state, action: PayloadAction<IngredientModel>) => {
                state.ingredientsConstructor.push(action.payload);
            },
            prepare: (ingredient: IngredientModel) => ({
                payload: { ...ingredient, unId: uuidv4() }
            })
        },
        clearOrderNumber: (state) => {
            state.orderNumber = null;
        },
        moveIngredient: (state, action: PayloadAction<{ dragIndex: number, hoverIndex: number }>) => {
            const dragCard = state.ingredientsConstructor[action.payload.dragIndex];
            state.ingredientsConstructor.splice(action.payload.dragIndex, 1);
            state.ingredientsConstructor.splice(action.payload.hoverIndex, 0, dragCard);
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
export const {setIngredientsConstructor,moveIngredient,addIngredient,clearOrderNumber,
    setBun ,deleteIngredient} = constructorSlice.actions;
export default constructorSlice.reducer;
