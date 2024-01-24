import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import {Order, OrdersState,} from "../../models/orders.model";

const initialState: OrdersState = {
    orders: [],
    isConnected: false,
};

const ordersSlice = createSlice({
    name: 'websocket',
    initialState,
    reducers: {
        setOrders(state, action: PayloadAction<Order[]>) {
            state.orders = action.payload;
        },
        setConnectionStatus(state, action: PayloadAction<boolean>) {
            state.isConnected = action.payload;
        },
    },
});

export const { setOrders, setConnectionStatus } = ordersSlice.actions;
export default ordersSlice.reducer;
