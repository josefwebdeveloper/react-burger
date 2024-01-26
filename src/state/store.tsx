import {configureStore, Middleware} from '@reduxjs/toolkit';
import ingredientsReducer from './ingredients/ingredients-slice';
import constructorReducer from './constructor-data/constructor-slice';
import authReducer from './auth/auth-slice';
import ordersReducer from './orders/orders-slice';
import createWebSocketMiddleware from "./middleware";
import {GET_ORDERS_BASE_URL} from "../constants";

const webSocketMiddleware = createWebSocketMiddleware();
export const store = configureStore({
    reducer: {
        auth: authReducer,
        ingredients: ingredientsReducer,
        constructorData: constructorReducer,
        orders: ordersReducer,
    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware().concat(webSocketMiddleware as Middleware),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;