import {createAsyncThunk} from "@reduxjs/toolkit";
import {_baseUrl} from "../../utils/constants";
import {AxiosError} from "axios";
import {refreshToken} from "../auth/auth-slice";
import axiosInstance from "../../services/axiosInstance";


export const makeOrder = createAsyncThunk(
    'ingredients/makeOrder',
    async (data:any, thunkAPI) => {
        try {
            const accessToken = JSON.parse(localStorage.getItem("accessToken") as string);
            const response = await axiosInstance.post(`${_baseUrl}orders`,data, {
                headers: {
                    'Content-Type': 'application/json',
                    "Accept": 'application/json',
                    Authorization: accessToken
                },
            });
            const resData = response.data;
            return resData;
        } catch (error) {
            if (error instanceof AxiosError && error.response) {
                const errorResponse = error.response.data;

                if (errorResponse.message === 'jwt expired') {
                    return thunkAPI.dispatch(refreshToken({
                        dispatchAction: 'makeOrder',
                        userData: data
                    }));
                }

                // Handle other types of error messages
                return thunkAPI.rejectWithValue(errorResponse);
            }

            // For non-Axios errors, or Axios errors without a response
            throw error;
        }
    }
);
