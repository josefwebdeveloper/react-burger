import { configureStore } from '@reduxjs/toolkit';
import authReducer, {login, logout, updateUser, register} from './auth-slice';
import axiosInstance from '../../services/axiosInstance';
import MockAdapter from 'axios-mock-adapter';

// Initialize mock axios adapter
const mock = new MockAdapter(axiosInstance);

// Sample user data
const userData = { email: 'user@example.com', password: 'password' };
const registerData = { email: 'newuser@example.com', password: 'newpassword', name: 'New User' };
const updateData = { name: 'Updated User' };
const logoutResponse = { success: true };

const mockResponse = { user: { id: 1, name: 'Test User' }, accessToken: 'token', refreshToken: 'refreshToken' };
mock.onPost('/auth/login').reply(200, mockResponse);
mock.onPost('/auth/register').reply(200, { user: { id: 2, ...registerData }, accessToken: 'newToken', refreshToken: 'newRefreshToken' });

mock.onPost('/auth/logout').reply(200, logoutResponse);

// Create a store for testing purposes
const store = configureStore({ reducer: { auth: authReducer } });

describe('authSlice tests', () => {
    beforeEach(() => {
        // Clear all actions before each test
        store.dispatch({ type: 'unknown' });
    });

    it('should handle login action fulfilled state', async () => {
        await store.dispatch(login(userData));

        const state = store.getState().auth;
        expect(state.basicUserInfo).toEqual(mockResponse.user);
        expect(state.status).toEqual('idle');
        expect(state.error).toBeNull();
    });

    it('should handle login action rejected state', async () => {
        // Mock a failed login attempt
        mock.onPost('/auth/login').networkError();

        await store.dispatch(login(userData));

        const state = store.getState().auth;
        expect(state.status).toEqual('failed');
        // Expect some error message, depending on your implementation
        expect(state.error).not.toBeNull();
    });
    it('should handle register action fulfilled state', async () => {
        mock.onPatch('/auth/user').reply(200, { user: { id: 1, ...updateData } });
        await store.dispatch(register(registerData));

        const state = store.getState().auth;
        expect(state.basicUserInfo).toEqual(expect.objectContaining(registerData));
        expect(state.status).toEqual('idle');
        expect(state.error).toBeNull();
    });



    it('should handle logout action fulfilled state', async () => {
        await store.dispatch(logout());

        const state = store.getState().auth;
        expect(state.basicUserInfo).toBeNull();
        expect(state.status).toEqual('idle');
        expect(state.error).toBeNull();
    });

    // Example of testing rejected state for register action
    it('should handle register action rejected state', async () => {
        // Mock a failed registration attempt
        mock.onPost('/auth/register').networkError();

        await store.dispatch(register(registerData));

        const state = store.getState().auth;
        expect(state.status).toEqual('failed');
        expect(state.error).not.toBeNull();
    });

});

