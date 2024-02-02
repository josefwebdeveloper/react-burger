import ingredientsReducer, {
    setIngredients,
    setSelectedIngredient,
    clearSelectedIngredient,
    incrementCount,
    decrementCount,
    clearCountIngredients,
    ingredientsSlice
} from './ingredients-slice';
import {fetchIngredients} from "./ingredients-api";

describe('ingredients reducer', () => {
    const initialState = {
        ingredients: [],
        selectedIngredient: null,
        loading: false,
        error: null
    };

    it('should handle initial state', () => {
        expect(ingredientsReducer(undefined, { type: 'unknown' })).toEqual({
            ingredients: [],
            selectedIngredient: null,
            loading: false,
            error: null
        });
    });

    it('should handle setIngredients', () => {
        const actual = ingredientsReducer(initialState, setIngredients([{ _id: '1', name: 'Ingredient 1', count: 0 }]));
        expect(actual.ingredients.length).toEqual(1);
    });

    // Add tests for other reducer functions like setSelectedIngredient, clearSelectedIngredient, etc.

    // Extra reducers tests
    describe('extra reducers', () => {
        it('should set loading true on fetchIngredients pending', () => {
            const action = { type: fetchIngredients.pending.type };
            const state = ingredientsReducer(initialState, action);
            expect(state.loading).toBe(true);
        });

        it('should update ingredients and set loading false on fetchIngredients fulfilled', () => {
            const action = { type: fetchIngredients.fulfilled.type, payload: [{ _id: '1', name: 'Ingredient 1', count: 0 }] };
            const state = ingredientsReducer(initialState, action);
            expect(state.ingredients.length).toEqual(1);
            expect(state.loading).toBe(false);
        });

        it('should set an error message and set loading false on fetchIngredients rejected', () => {
            const action = { type: fetchIngredients.rejected.type, error: { message: 'Error' } };
            const state = ingredientsReducer(initialState, action);
            expect(state.error).not.toBeNull();
            expect(state.loading).toBe(false);
        });
    });
});
describe('ingredients', () => {
    const initialState = {
        ingredients: [{ _id: '1', name: 'Ingredient 1', count: 0 }, { _id: '2', name: 'Ingredient 2', count: 2 }],
        selectedIngredient: null,
        loading: false,
        error: null
    };

    it('should handle setSelectedIngredient', () => {
        const ingredient = { _id: '1', name: 'Ingredient 1', count: 0 };
        const actual = ingredientsReducer(initialState, setSelectedIngredient(ingredient));
        expect(actual.selectedIngredient).toEqual(ingredient);
    });

    it('should handle clearSelectedIngredient', () => {
        // First set an ingredient, then clear it
        const ingredient = { _id: '1', name: 'Ingredient 1', count: 0 };
        let state = ingredientsReducer(initialState, setSelectedIngredient(ingredient));
        state = ingredientsReducer(state, clearSelectedIngredient());
        expect(state.selectedIngredient).toBeNull();
    });

    it('should handle incrementCount', () => {
        const ingredient = { _id: '1', name: 'Ingredient 1', count: 0 };
        const actual = ingredientsReducer(initialState, incrementCount(ingredient));
        const updatedIngredient = actual.ingredients.find(ing => ing._id === '1');
        expect(updatedIngredient.count).toBe(1);
    });

    it('should handle decrementCount', () => {
        const ingredient = { _id: '2', name: 'Ingredient 2', count: 2 };
        const actual = ingredientsReducer(initialState, decrementCount(ingredient));
        const updatedIngredient = actual.ingredients.find(ing => ing._id === '2');
        expect(updatedIngredient.count).toBe(1);
    });

    it('should handle clearCountIngredients', () => {
        const actual = ingredientsReducer(initialState, clearCountIngredients());
        actual.ingredients.forEach(ingredient => {
            expect(ingredient.count).toBe(0);
        });
    });

    // More tests can be added for different scenarios and edge cases
});
