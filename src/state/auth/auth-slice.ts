import {createAsyncThunk, createSlice, PayloadAction} from "@reduxjs/toolkit";
import {AxiosError} from "axios";
import axiosInstance from "../../services/axiosInstance";
import {ErrorResponse} from "../../constants";
import {User, UserRequest, UserResponse} from "../../models/auth.model";

export interface AuthApiState {
    basicUserInfo: any;
    status: string;
    error: any;
}

const initialState: AuthApiState = {
    basicUserInfo: localStorage.getItem("userInfo")
        ? JSON.parse(localStorage.getItem("userInfo") as string)
        : null,
    status: "idle",
    error: null,
};
export const login = createAsyncThunk(
    "login",
    async (data: User, {rejectWithValue}) => {
        try {
            const response = await axiosInstance.post("/auth/login", data);
            const resData = response.data;
            console.log()
            localStorage.setItem("userInfo", JSON.stringify(resData.user));
            localStorage.setItem("accessToken", JSON.stringify(resData.accessToken));
            localStorage.setItem("refreshToken", JSON.stringify(resData.refreshToken));

            return resData;
        } catch (error) {
            if (error instanceof AxiosError && error.response) {
                const errorResponse = error.response.data;

                return rejectWithValue(errorResponse);
            }

            throw error;
        }
    }
);
export const updateUser = createAsyncThunk(
    "updateUser",
    async (data: Partial<User>, thunkAPI) => {
        try {
            const accessToken = JSON.parse(localStorage.getItem("accessToken") as string);
            const response = await axiosInstance.patch("/auth/user", data, {
                headers: {
                    Authorization: accessToken
                },
            });
            const resData = response.data;
            localStorage.setItem("userInfo", JSON.stringify(resData.user));


            return resData;
        } catch (error) {
            if (error instanceof AxiosError && error.response) {
                const errorResponse = error.response.data;
                if (errorResponse.message === 'jwt expired') {
                    // Correctly using thunkAPI here
                    return thunkAPI.dispatch(refreshToken({
                        dispatchAction: 'updateUser',
                        userData: data
                    }));
                }
                return thunkAPI.rejectWithValue(errorResponse);
            }


            throw error;
        }
    }
);

export const refreshToken = createAsyncThunk(
    "refreshToken",
    async (data: { dispatchAction: 'getUser' | 'updateUser', userData?: Partial<User> },
           thunkAPI) => {
        try {
            const response = await axiosInstance.post("/auth/token", {
                token: JSON.parse(localStorage.getItem("refreshToken") as string)
            });
            const resData = response.data;

            localStorage.setItem("accessToken", JSON.stringify(resData.accessToken));
            localStorage.setItem("refreshToken", JSON.stringify(resData.refreshToken));

            switch (data.dispatchAction) {
                case 'getUser':
                    thunkAPI.dispatch(getUser());
                    break;

                case 'updateUser':
                    if (data.userData) {
                        thunkAPI.dispatch(updateUser(data.userData));
                    }
                    break;
                default:
                    break;
            }

            return resData;
        } catch (error) {
            if (error instanceof AxiosError && error.response) {
                const errorResponse = error.response.data;
                return thunkAPI.rejectWithValue(errorResponse);
            }
            throw error;
        }
    }
);
export const getUser = createAsyncThunk(
    "getUser",
    async (_, thunkAPI) => {
        try {

            const accessToken = JSON.parse(localStorage.getItem("accessToken") as string);
            const response = await axiosInstance.get("/auth/user", {
                headers: {
                    Authorization: accessToken
                },
            });
            const resData = response.data;


            return resData;
        } catch (error) {
            if (error instanceof AxiosError && error.response) {
                const errorResponse = error.response.data;
                console.log(errorResponse)
                if (errorResponse.message === 'jwt expired') {
                    return thunkAPI.dispatch(refreshToken({
                        dispatchAction: 'getUser'
                    }));
                }
                return null;
            }

            throw error;
        }
    }
);
export const register = createAsyncThunk(
    "register",
    async (data: User, {rejectWithValue}) => {
        try {
            const response = await axiosInstance.post("/auth/register", data);
            const resData = response.data;


            return resData;
        } catch (error) {
            if (error instanceof AxiosError && error.response) {
                const errorResponse = error.response.data;

                return rejectWithValue(errorResponse);
            }

            throw error;
        }
    }
);
export const logout = createAsyncThunk(
    "logout",
    async (_, {rejectWithValue}) => {
        try {
            const response = await axiosInstance.post("/auth/logout", {
                token: JSON.parse(localStorage.getItem("refreshToken") as string)
            });
            const resData = response.data;

            localStorage.removeItem("userInfo");
            localStorage.removeItem("accessToken");
            localStorage.removeItem("refreshToken");

            return resData;
        } catch (error) {
            if (error instanceof AxiosError && error.response) {
                const errorResponse = error.response.data;
                localStorage.removeItem("userInfo");
                localStorage.removeItem("accessToken");
                localStorage.removeItem("refreshToken");
                return rejectWithValue(errorResponse);
            }

            throw error;
        }
    }
);
const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(login.pending, (state) => {
                state.status = "loading";
                state.error = null;
            })
            .addCase(
                login.fulfilled,
                (state, action: PayloadAction<UserResponse>) => {
                    state.status = "idle";
                    console.log(action.payload.user)
                    state.basicUserInfo = action.payload.user;
                }
            )
            .addCase(login.rejected, (state, action) => {
                state.status = "failed";
                if (action.payload) {
                    state.error =
                        (action.payload as ErrorResponse).message || "Login failed";
                } else {
                    state.error = action.error.message || "Login failed";
                }
            })

            .addCase(getUser.pending, (state) => {
                state.status = "loading";
                state.error = null;
            })
            .addCase(
                getUser.fulfilled,
                (state, action: PayloadAction<UserResponse>) => {
                    state.status = "idle";
                    console.log(action.payload)
                    state.basicUserInfo = action.payload.user;
                }
            )
            .addCase(getUser.rejected, (state, action) => {
                state.status = "failed";
                if (action.payload) {
                    state.error =
                        (action.payload as ErrorResponse).message || "Login failed";
                } else {
                    state.error = action.error.message || "Login failed";
                }
            })

            .addCase(register.pending, (state) => {
                state.status = "loading";
                state.error = null;
            })
            .addCase(
                register.fulfilled,
                (state, action: PayloadAction<User>) => {
                    state.status = "idle";
                    state.basicUserInfo = action.payload;
                }
            )
            .addCase(register.rejected, (state, action) => {
                state.status = "failed";
                if (action.payload) {
                    state.error =
                        (action.payload as ErrorResponse).message || "Registration failed";
                } else {
                    state.error = action.error.message || "Registration failed";
                }
            })

            .addCase(logout.pending, (state) => {
                state.status = "loading";
                state.error = null;
            })
            .addCase(logout.fulfilled, (state, action) => {
                state.status = "idle";
                state.basicUserInfo = null;
            })
            .addCase(logout.rejected, (state, action) => {
                state.status = "failed";
                if (action.payload) {
                    state.error =
                        (action.payload as ErrorResponse).message || "Logout failed";
                } else {
                    state.error = action.error.message || "Logout failed";
                }
            })
    },
});
export default authSlice.reducer;