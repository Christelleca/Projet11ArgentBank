import { configureStore } from "@reduxjs/toolkit";
import tokenReducer from "./TokenSlice";
import userProfileReducer from "./UserProfileSlice";
import updateUserProfileReducer from "./UpdateUserProfileSlice";

const store = configureStore({
    reducer: {
        token: tokenReducer,
        userProfile: userProfileReducer,
        updateUserProfile: updateUserProfileReducer,
    },
});

export default store;
