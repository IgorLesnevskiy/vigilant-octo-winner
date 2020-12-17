import { createSlice } from "@reduxjs/toolkit";

const INITIAL_STATE = {
    entities: {},
    ids: [],
};

const citiesSlice = createSlice({
    name: "cities",
    initialState: INITIAL_STATE,
    reducers: {
        getCitiesRequest(state, payload) {
            return state;
        },
    },
});

export const { getCitiesRequest } = citiesSlice.actions;

export default citiesSlice.reducer;
