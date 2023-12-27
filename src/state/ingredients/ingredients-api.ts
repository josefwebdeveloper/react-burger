import {createAsyncThunk} from "@reduxjs/toolkit";
import {IngredientModel} from "../../models/burger-data.model";
import {_baseUrl} from "../../utils/constants";
import {request} from "../../utils/utils";


const fetchIngredientsFromAPI = async (): Promise<any> => {
    return await request(`${_baseUrl}ingredients`);
};

export const fetchIngredients = createAsyncThunk<IngredientModel[]>(
    'ingredients/fetchIngredients',
    async () => {
        const response = await fetchIngredientsFromAPI();
        return response.data;
    }
);
