import { configureStore } from "@reduxjs/toolkit";
import propertySlice from "./slices/PropertySlice";
import userSlice from "./slices/UserSlice";

const store = configureStore({
    reducer: {
        properties: propertySlice,
        users: userSlice,
    }
})

export default store;