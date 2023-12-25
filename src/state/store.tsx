import { configureStore } from '@reduxjs/toolkit';
import ingredientsReducer from './ingredients/ingredients-slice';
import constructorReducer from './constructor-data/constructor-slice';

export const store = configureStore({
    reducer: {
        ingredients: ingredientsReducer,
        constructorData: constructorReducer,
    },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;