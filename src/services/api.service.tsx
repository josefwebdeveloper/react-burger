import {getIngredientsResponse} from "../models/burger-data.model";

const _baseUrl = 'https://norma.nomoreparties.space/api/';
const fetchData = async (url: string): Promise<any> => {
    try {
        const response = await fetch(url);
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        return await response.json() as Promise<any>;
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