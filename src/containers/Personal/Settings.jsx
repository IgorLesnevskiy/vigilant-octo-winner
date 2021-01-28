import { connect } from "react-redux";
import { createSelector } from "reselect";

import { getUserById } from "../../store/slices/users";
import { getCitiesList } from "../../store/slices/cities";

import Settings from "../../components/Personal/Settings";

const mapStateToProps = function (state, ownProps) {
    return {
        user: state.users.entities[ownProps.userId],
        cities: filteredCitiesSelector(state),

        loading: loadingStatusSelector(state, ownProps),
        error: errorStatusSelector(state, ownProps),
    };
};

const mapDispatchToProps = (dispatch, ownProps) => {
    return {
        getCitiesList: () => dispatch(getCitiesList()),
        getUserInfo: () => dispatch(getUserById(ownProps.userId)),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Settings);

const getCities = (state) => state.cities.entities;

const getCitiesRequestStatus = (state) => state.cities.requests["list"] || undefined;
const getUserRequestStatus = (state, props = {}) => {
    return state.users.requests[props?.userId] || undefined;
};

const filteredCitiesSelector = createSelector(getCities, function (cities = {}) {
    const filteredCities = Object.entries(cities).filter(filterCityByPopulation).map(getCityName);

    return Object.fromEntries(filteredCities);

    //*****
    function filterCityByPopulation([id, data]) {
        return data.population >= 5000;
    }

    function getCityName([id, data]) {
        return [id, data.name];
    }
});

const loadingStatusSelector = createSelector(getCitiesRequestStatus, getUserRequestStatus, function (
    citiesStatus,
    userStatus
) {
    if (!citiesStatus) {
        return true;
    }

    if (!userStatus) {
        return true;
    }

    return citiesStatus === "pending" || userStatus === "pending";
});

const errorStatusSelector = createSelector(getCitiesRequestStatus, getUserRequestStatus, function (
    citiesStatus,
    userStatus
) {
    return citiesStatus === "rejected" || userStatus === "rejected";
});
