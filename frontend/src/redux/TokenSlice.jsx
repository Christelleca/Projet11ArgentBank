import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

export const loginUser = createAsyncThunk(
    "token/loginUser",
    async ({ email, password }) => {
        try {
            const response = await axios.post(
                "http://localhost:3001/api/v1/user/login",
                { email, password }
            );
            const token = response.data.body.token;
            localStorage.setItem("token", token);
            return { token };
        } catch (error) {
            console.error("Failed to log in:", error.response.data);
            throw new Error("Failed to log in");
        }
    }
);

const tokenSlice = createSlice({
    name: "token",
    initialState: {
        token: localStorage.getItem("token") || null,
        loading: false,
        error: null,
    },
    reducers: {
        logout: (state) => {
            state.token = null;
            localStorage.removeItem("token");
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(loginUser.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(loginUser.fulfilled, (state, action) => {
                state.loading = false;
                state.token = action.payload.token;
            })
            .addCase(loginUser.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message;
            });
    },
});

export const { logout } = tokenSlice.actions;
export default tokenSlice.reducer;
