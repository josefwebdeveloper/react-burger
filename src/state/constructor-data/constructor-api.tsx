import {createAsyncThunk} from "@reduxjs/toolkit";
import { MakeOrderResponse} from "../../models/burger-data.model";
import {_baseUrl} from "../../utils/constants";
import {request} from "../../utils/utils";


export const makeOrder = createAsyncThunk<MakeOrderResponse, string[]>(
    'ingredients/makeOrder',
    async (ingredients) => {
       return  request(`${_baseUrl}orders`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ingredients}),
        });
    }
);

