import { createSlice } from "@reduxjs/toolkit";

export const showBalanceSlice = createSlice({
    name: "showBalance",
    initialState: false,
    reducers: {
        toggleShowBalance: (state) => {
            return !state;
        },
    },
});

export const { toggleShowBalance } = showBalanceSlice.actions;
export default showBalanceSlice.reducer;
