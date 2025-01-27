import { createSlice } from "@reduxjs/toolkit";

export const servicesSlice = createSlice({
    name: "services",
    initialState: [],
    reducers: {
        setServices: (state, action) => {
            return action.payload;
        },
    },
});

export const { setServices } = servicesSlice.actions;
export default servicesSlice.reducer;
