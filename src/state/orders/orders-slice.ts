import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import {RootState} from '../store';
import {Order, OrdersPayload} from '../../models/orders.model';
import {wsDisconnect, wsMessage, wsUserOrdersMessage} from "../middleware";

interface OrdersState {
    orders: Order[];
    total: number;
    totalToday: number;
}

const initialState: OrdersState = {
    orders: [],
    total: 0,
    totalToday: 0,
};

const ordersSlice = createSlice({
    name: 'orders',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(wsMessage, (state, action: PayloadAction<OrdersPayload>) => {
                state.orders = action.payload.orders;
                state.total = action.payload.total;
                state.totalToday = action.payload.totalToday;
            })
            .addCase(wsDisconnect, (state) => {

            })
            .addCase(wsUserOrdersMessage, (state, action: PayloadAction<OrdersPayload>) => {
                state.orders = action.payload.orders;
            });
    },
});

export const selectOrders = (state: RootState) => state.orders.orders;
export const selectTotal = (state: RootState) => state.orders.total;
export const selectTotalToday = (state: RootState) => state.orders.totalToday;

export default ordersSlice.reducer;
