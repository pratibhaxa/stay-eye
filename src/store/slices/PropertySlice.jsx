import { createSlice } from "@reduxjs/toolkit";
const { properties } = require("../../data/properties");

const propertySlice = createSlice({
    name: "property",
    initialState: properties,
    reducers: {
        addProperty(state, action) {},
        editProperty(state, action) {},
        deleteProperty(state, action) {},
    }
})

export default propertySlice.reducer;
export const { addProperty, editProperty, deleteProperty } = propertySlice.actions;