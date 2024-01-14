import { configureStore } from '@reduxjs/toolkit';
import ingredientsReducer from './ingredients/ingredients-slice';
import constructorReducer from './constructor-data/constructor-slice';
import authReducer from './auth/auth-slice';
export const store = configureStore({
    reducer: {
        auth: authReducer,
        ingredients: ingredientsReducer,
        constructorData: constructorReducer,
    },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;