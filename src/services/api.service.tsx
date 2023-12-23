import {getIngredientsResponse, MakeOrderResponse} from "../models/burger-data.model";
let _baseUrl = 'https://norma.nomoreparties.space/api/'
interface FetchError extends Error {
    status?: number;
}


const fetchData = async (url: string, options?: RequestInit): Promise<any> => {
    try {
        const response = await fetch(url, options);
        if (!response.ok) {
            const error: FetchError = new Error(`Network response was not ok: ${response.status}`);
            error.status = response.status;
            throw error;
        }
        return await response.json();
    } catch (error) {
        if (error instanceof Error) {
            throw error;
        } else {
            throw new Error('An unknown error occurred');
        }
    }
};



export const getIngredients = (): Promise<getIngredientsResponse> => {

    return fetchData(`${_baseUrl}ingredients`);
};
type OrderData = {
    ingredients: string[]
};

export const makeOrder = (orderData: OrderData): Promise<MakeOrderResponse> => {
    return fetchData(`${_baseUrl}orders`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(orderData),
    });
};