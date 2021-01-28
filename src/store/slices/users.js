import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

import { usersAPI } from "../../tools/api";
import { usersNormalizer } from "../../tools/normalizers";

const INITIAL_STATE = {
    entities: {},
    ids: [],
    requests: {},
};

const getUserById = createAsyncThunk(
    "users/getUserById",
    async (userId, { rejectWithValue }) => {
        try {
            const response = await usersAPI.getUserById(userId);

            return response.data;
        } catch (err) {
            rejectWithValue(err.response.data);
        }
    },
    {
        condition: (userId, { getState, extra }) => {
            const { users } = getState();
            const fetchStatus = users.requests[userId];

            if (fetchStatus === "fulfilled" || fetchStatus === "loading") {
                // Already fetched or in progress, don't need to re-fetch
                return false;
            }
        },
    }
);

const usersSlice = createSlice({
    name: "users",
    initialState: INITIAL_STATE,
    reducers: {},
    extraReducers: {
        [getUserById.pending]: (state, action) => {
            const userId = action.meta.arg;

            state.requests[userId] = "pending";
        },
        [getUserById.fulfilled]: (state, action) => {
            const userId = action.meta.arg;

            if (!action.payload) {
                state.requests[userId] = "rejected";

                return;
            }

            const normalizedUser = usersNormalizer.normalizeUser(action.payload);

            if (!normalizedUser?.entities?.user) {
                return;
            }

            state.requests[userId] = "fulfilled";

            if (!state.ids.includes(userId)) {
                state.ids.push(userId);
            }

            state.entities = {
                ...state.entities,
                ...(normalizedUser?.entities?.user ?? {}),
            };
        },
        [getUserById.rejected]: (state, { error, meta }) => {
            const userId = meta.arg;

            state.requests[userId] = "rejected";
        },
    },
});

export const {} = usersSlice.actions;

export { getUserById };

export default usersSlice.reducer;
