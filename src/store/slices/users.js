import { createSlice } from "@reduxjs/toolkit";

const INITIAL_STATE = {
    entities: {},
    ids: [],
};

const usersSlice = createSlice({
    name: "users",
    initialState: INITIAL_STATE,
    reducers: {
        getByIdRequest(state, payload) {
            return state;
        },
        getByIdSuccess(state, payload) {
            return state;
        },
        getByIdFailure(state, payload) {
            return state;
        },
    },
});

export const { usersGetByIdRequest, usersGetByIdSuccess, usersGetByIdFailure } = usersSlice.actions;

export default usersSlice.reducer;
