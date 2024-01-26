import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import {RootState} from '../store';
import {Order, OrdersPayload} from '../../models/orders.model';
import {wsDisconnect, wsMessage, wsUserOrdersMessage} from "../middleware";

interface OrdersState {
    orders: Order[];
}

const initialState: OrdersState = {
    orders: [],
};

const ordersSlice = createSlice({
    name: 'orders',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(wsMessage, (state, action: PayloadAction<OrdersPayload>) => {
                state.orders = action.payload.orders;
            })
            .addCase(wsDisconnect, (state) => {
                console.log('WebSocket Disconnected manually')
            })
            .addCase(wsUserOrdersMessage, (state, action: PayloadAction<OrdersPayload>) => {
                state.orders = action.payload.orders;
            });
    },
});

export const selectOrders = (state: RootState) => state.orders.orders;

export default ordersSlice.reducer;
