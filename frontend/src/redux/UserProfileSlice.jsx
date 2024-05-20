import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

export const fetchUserProfile = createAsyncThunk(
    "userProfile/fetchUserProfile",
    async () => {
        const token = localStorage.getItem("token");
        if (!token) {
            throw new Error("No token found");
        }

        try {
            const response = await axios.post(
                "http://localhost:3001/api/v1/user/profile",
                {},
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }
            );
            return response.data.body;
        } catch (error) {
            console.error("Failed to fetch user profile:", error.response.data);
            throw new Error("Failed to fetch user profile");
        }
    }
);

const userProfileSlice = createSlice({
    name: "userProfile",
    initialState: {
        user: null,
        loading: false,
        error: null,
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchUserProfile.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchUserProfile.fulfilled, (state, action) => {
                state.loading = false;
                state.user = action.payload;
            })
            .addCase(fetchUserProfile.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message;
            });
    },
});

export default userProfileSlice.reducer;
