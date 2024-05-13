import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

export const loginUser = createAsyncThunk(
    "user/loginUser",
    async ({ email, password }) => {
        try {
            const response = await axios.post(
                "http://localhost:3001/api/v1/user/login",
                { email, password }
            );

            localStorage.setItem("token", response.data.token); // Stocke le token dans le stockage local

            return response.data;
        } catch (error) {
            throw new Error("Failed to log in");
        }
    }
);

const userSlice = createSlice({
    name: "user",
    initialState: {
        loading: false,
        user: null,
        error: null,
    },
    extraReducers: (builder) => {
        builder
            .addCase(loginUser.pending, (state) => {
                state.loading = true;
                state.user = null;
                state.error = null;
            })
            .addCase(loginUser.fulfilled, (state, action) => {
                state.loading = false;
                state.user = action.payload;
                state.error = null;
            })
            .addCase(loginUser.rejected, (state, action) => {
                state.loading = false;
                state.user = null;
                console.log(action.error.message);
                if (
                    action.error.message ===
                    "Request failed with status code 401"
                ) {
                    state.error = "Acces denied! Invalid Credentials";
                } else {
                    state.error = action.error.message;
                }
            });
    },
});

export default userSlice.reducer;
