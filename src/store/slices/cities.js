import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import deepmerge from "deepmerge";

import { citiesAPI } from "../../tools/api";
import { citiesNormalizer } from "../../tools/normalizers";

const INITIAL_STATE = {
    entities: {},
    ids: [],
    requests: {},
};

const getCityById = createAsyncThunk(
    "cities/getCityById",
    async (cityId, { rejectWithValue }) => {
        try {
            const response = await citiesAPI.getCityById(cityId);

            return response.data;
        } catch (err) {
            rejectWithValue(err.response.data);
        }
    },
    {
        condition: (cityId, { getState, extra }) => {
            const { cities } = getState();
            const fetchStatus = cities.requests[cityId];

            if (fetchStatus === "fulfilled" || fetchStatus === "loading") {
                // Already fetched or in progress, don't need to re-fetch
                return false;
            }
        },
    }
);

const getCitiesList = createAsyncThunk(
    "cities/getCitiesList",
    async (arg, { rejectWithValue }) => {
        try {
            const response = await citiesAPI.getCitiesList();

            return response.data;
        } catch (err) {
            rejectWithValue(err.response.data);
        }
    },
    {
        condition: (arg, { getState, extra }) => {
            const { cities } = getState();
            const fetchStatus = cities.requests["list"];

            if (fetchStatus === "fulfilled" || fetchStatus === "loading") {
                // Already fetched or in progress, don't need to re-fetch
                return false;
            }
        },
    }
);

const citiesSlice = createSlice({
    name: "cities",
    initialState: INITIAL_STATE,
    reducers: {},
    extraReducers: {
        [getCityById.pending]: (state, action) => {
            const cityId = action.meta.arg;

            state.requests[cityId] = "pending";
        },
        [getCityById.fulfilled]: (state, action) => {
            const cityId = action.meta.arg;

            if (!action.payload) {
                state.requests[cityId] = "rejected";

                return;
            }

            const normalizedCity = citiesNormalizer.normalizeCity(action.payload);

            if (!normalizedCity?.entities?.cities) {
                return;
            }

            state.requests[cityId] = "fulfilled";

            if (!state.ids.includes(cityId)) {
                state.ids.push(cityId);
            }

            state.entities = {
                ...state.entities,
                ...(normalizedCity?.entities?.cities ?? {}),
            };
        },
        [getCityById.rejected]: (state, { error, meta }) => {
            const cityId = meta.arg;

            state.requests[cityId] = "rejected";
        },

        [getCitiesList.pending]: (state, action) => {
            state.requests["list"] = "pending";
        },
        [getCitiesList.fulfilled]: (state, action) => {
            if (!action.payload) {
                state.requests["list"] = "rejected";

                return;
            }

            const normalizedCitiesList = citiesNormalizer.normalizeCitiesList(action.payload);

            if (!normalizedCitiesList?.entities?.cities) {
                return;
            }

            state.requests["list"] = "fulfilled";

            state.ids = deepmerge(state.ids, normalizedCitiesList.result, {
                arrayMerge: (destinationArray, sourceArray, options) => [
                    ...new Set(destinationArray.concat(sourceArray)),
                ],
            });

            state.entities = deepmerge(state.entities, normalizedCitiesList?.entities?.cities ?? {});
        },
        [getCitiesList.rejected]: (state, { error, meta }) => {
            state.requests["list"] = "rejected";
        },
    },
});

export const {} = citiesSlice.actions;

export { getCityById, getCitiesList };

export default citiesSlice.reducer;
