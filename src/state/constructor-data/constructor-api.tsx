import {createAsyncThunk} from "@reduxjs/toolkit";
import { MakeOrderResponse} from "../../models/burger-data.model";

let _baseUrl = 'https://norma.nomoreparties.space/api/'

export const makeOrder = createAsyncThunk<MakeOrderResponse, string[]>(
    'ingredients/makeOrder',
    async (ingredients) => {
        const response = await fetch(`${_baseUrl}orders`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ingredients}),
        });
        return response.json();
    }
);

