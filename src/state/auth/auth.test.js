import authReducer, {

} from './auth-slice';
describe('authSlice async actions', () => {
   const initialState = {
    user: null,
    status: 'idle',
    error: null,
    };

    it('should handle initial state', () => {
        expect(authReducer(undefined, { type: 'unknown' })).toEqual({
            user: null,
            status: 'idle',
            error: null,
        });
    });



});
