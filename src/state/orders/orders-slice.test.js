import ordersReducer, {
    selectOrders,
    selectTotal,
    selectTotalToday
} from './orders-slice';
import {wsMessage, wsUserOrdersMessage} from "../middleware";
import {ORDERS_MOCK} from "../../utils/mockData";
import {initialState} from "./orders-slice";
describe('orders slice', () => {

    it('should handle initial state', () => {
        expect(ordersReducer(undefined, { type: 'unknown' })).toEqual(initialState);
    });
    it('should handle wsMessage', () => {
        const payload = {
            orders: ORDERS_MOCK,
            total: 100,
            totalToday: 5
        };
        const action = { type: wsMessage.type, payload };
        const expectedState = {
            orders: payload.orders,
            total: payload.total,
            totalToday: payload.totalToday
        };
        expect(ordersReducer(initialState, action)).toEqual(expectedState);
    });
    it('should handle wsUserOrdersMessage', () => {
        const payload = {
            orders:ORDERS_MOCK,
            total: initialState.total,
            totalToday: initialState.totalToday
        };
        const action = { type: wsUserOrdersMessage.type, payload };
        const expectedState = {
            ...initialState,
            orders: payload.orders
        };
        expect(ordersReducer(initialState, action)).toEqual(expectedState);
    });


}   )
describe('orders selectors', () => {
    const state = {
        orders: {
            orders: ORDERS_MOCK,
            total: 100,
            totalToday: 5
        }
    };

    it('selectOrders should return the orders', () => {
        expect(selectOrders(state)).toEqual(state.orders.orders);
    });

    it('selectTotal should return the total', () => {
        expect(selectTotal(state)).toEqual(state.orders.total);
    });

    it('selectTotalToday should return the total today', () => {
        expect(selectTotalToday(state)).toEqual(state.orders.totalToday);
    });
});
