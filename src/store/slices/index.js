import { combineReducers } from "redux";

import usersReducer from "./users";
import citiesReducer from "./cities";

export default combineReducers({
    cities: citiesReducer,
    users: usersReducer,
});
