import { constructorSlice, initialState } from './constructor-slice'; // Adjust the import path as necessary
import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import {makeOrder} from './constructor-api';
import {ORDERS_MOCK} from "../../utils/mockData";
import axiosInstance from "../../services/axiosInstance"; // Adjust the import path as necessary

const middlewares = thunk
const mockStore = configureMockStore(middlewares);
describe('constructorSlice reducers', () => {
    it('should handle setIngredientsConstructor', () => {
        const exampleIngredients = [{ id: '1', type: 'bun' }, { id: '2', type: 'meat' }];
        const action = constructorSlice.actions.setIngredientsConstructor(exampleIngredients);
        const state = constructorSlice.reducer(initialState, action);
        expect(state.ingredientsConstructor).toEqual(exampleIngredients);
    });
});
jest.mock('../../services/axiosInstance', () => ({
    post: jest.fn()
}));
describe('constructorSlice actions', () => {
    it('should create an action to set a bun', () => {
        const bun = { id: '1', type: 'bun' };
        const expectedAction = {
            type: 'constructor/setBun',
            payload: bun,
        };
        expect(constructorSlice.actions.setBun(bun)).toEqual(expectedAction);
    });
});
describe('async actions', () => {
    it('creates MAKE_ORDER_SUCCESS when making an order has been done', async () => {
        const fakeOrderResponse = { order: { number: 1234 } };
        axiosInstance.post.mockResolvedValue({ data: fakeOrderResponse });

        const expectedActions = [
            { type: 'ingredients/makeOrder/pending' },
            { type: 'ingredients/makeOrder/fulfilled', payload: fakeOrderResponse }
        ];


    });
});
