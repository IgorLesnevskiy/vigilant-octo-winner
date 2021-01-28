import { useEffect, useState, useCallback } from "react";

import "./Settings.scss";

import SettingsForm from "../SettingsForm";
import UserInfo from "../UserInfo";

function Settings(props) {
    const {
        user = {},
        cities = {},
        getCitiesList = Function.prototype,
        getUserInfo = Function.prototype,
        error = false,
        loading = true,
    } = props;

    const [userStatus, setUserStatus] = useState(user.status);

    const [defaultFormData, setDefaultFormData] = useState({
        city: "",
        password: "",
        repeatPassword: "",
        email: "",
        personalAgreement: false,
    });

    useEffect(() => {
        getCitiesList();
        getUserInfo();
    }, [getCitiesList, getUserInfo]);

    useEffect(() => {
        setDefaultFormData({
            city: user.cityID,
            password: "",
            repeatPassword: "",
            email: user.email,
            personalAgreement: !!user.personalAgreement,
        });
    }, [user]);

    const handleFormSubmit = useCallback(
        (data) => {
            const preparedFormData = castFormData(data);

            console.log({
                ...preparedFormData,
                status: userStatus,
            });
        },
        [userStatus]
    );

    const handleStatusUpdate = useCallback((status = "") => {
        setUserStatus(status);
    }, []);

    const statusBoxParams = {
        name: user.name,
        defaultStatus: user.status,

        onUpdate: handleStatusUpdate,
    };

    const formParams = {
        lastModified: user.modifiedTime,
        availableCities: cities,
        data: {
            city: user.cityID,
            password: "",
            repeatPassword: "",
            email: user.email,
            personalAgreement: !!user.personalAgreement,
        },

        onSubmit: handleFormSubmit,
    };

    if (error) {
        return <div>error</div>;
    }

    if (loading) {
        return <div>loading...</div>;
    }

    return (
        <div className={"personal-settings"}>
            <div className={"personal-settings__user"}>
                <UserInfo {...statusBoxParams} />
            </div>
            <div className={"personal-settings__params"}>
                <SettingsForm
                    defaultFormData={defaultFormData}
                    lastModified={user.modifiedTime}
                    availableCities={cities}
                    onSubmit={handleFormSubmit}
                />
            </div>
        </div>
    );
}

function castFormData(data) {
    let result = {};

    for (let section of data) {
        result = {
            ...result,
            ...section,
        };
    }

    return result;
}

export default Settings;
