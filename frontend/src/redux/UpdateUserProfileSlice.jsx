import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

export const updateUserName = createAsyncThunk(
    "updateUserProfile/updateUserName",
    async (newUserName, { getState }) => {
        const token = localStorage.getItem("token");
        if (!token) {
            throw new Error("No token found");
        }

        try {
            const response = await axios.put(
                "http://localhost:3001/api/v1/user/profile",
                { userName: newUserName },
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }
            );
            return response.data.body;
        } catch (error) {
            console.error("Failed to update user name:", error.response.data);
            throw new Error("Failed to update user name");
        }
    }
);

const updateUserProfileSlice = createSlice({
    name: "updateUserProfile",
    initialState: {
        loading: false,
        error: null,
    },
    extraReducers: (builder) => {
        builder
            .addCase(updateUserName.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(updateUserName.fulfilled, (state, action) => {
                state.loading = false;
                state.userName = action.payload.userName;
            })
            .addCase(updateUserName.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message;
            });
    },
});

export default updateUserProfileSlice.reducer;
