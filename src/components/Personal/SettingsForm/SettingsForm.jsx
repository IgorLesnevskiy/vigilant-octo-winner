import React, { useCallback, useState, useEffect, useMemo } from "react";
import cloneDeep from "lodash/cloneDeep";

import "./SettingsForm.scss";
import Form from "../../UI/Form/Form";

import localize_ru from "../../UI/Form/localizations/ru";
import { convertDate } from "../../../tools/utils";

function generateLatModifiedMessage(date = null) {
    if (!date) {
        return "";
    }

    const convertedDate = convertDate({
        date: date,
        formatString: "DD MMMM YYYY в HH:MM:ss",
    });

    return convertedDate ? `последние изменения ${convertedDate}` : "";
}

const DEFAULT_SECTION_DATA_1 = {
    schema: {
        type: "object",
        properties: {
            city: {
                title: "Ваш город",
                type: "string",
                enum: [],
                enumNames: [],
            },
        },
    },
    ui: {
        city: {},
    },
    formData: { city: "" },
};

const DEFAULT_SECTION_DATA_2 = {
    schema: {
        type: "object",
        required: ["password", "repeatPassword"],

        properties: {
            password: {
                title: "Пароль",

                type: "string",
            },
            repeatPassword: {
                title: "Пароль еще раз",

                type: "string",
            },
        },
    },
    ui: {
        password: {
            "ui:widget": "password",
            "ui:placeholder": "Пароль",
            "ui:help": "Ваш новый пароль должен содержать не менее 5 символов",
        },
        repeatPassword: {
            "ui:widget": "password",
            "ui:placeholder": "Пароль еще раз",
            "ui:help": "Повторите пароль, пожалуйста, это обезопасит вас с нами на случай ошибки.",
        },
    },
    formData: {
        password: "",
        repeatPassword: "",
    },
};

const DEFAULT_SECTION_DATA_3 = {
    schema: {
        type: "object",
        required: ["email"],
        properties: {
            email: {
                title: "Электронная почта",

                type: "string",
                format: "email",
            },
            personalAgreement: {
                title: "принимать актуальную информацию на емейл",
                type: "boolean",
            },
            saveButton: {
                type: "string",
            },
        },
    },
    ui: {
        email: {
            "ui:placeholder": "e-mail",
            "ui:help": "Можно изменить адрес, указанный при регистрации.",
        },
        personalAgreement: {
            "ui:options": {
                fluid: true,
                label: false,
            },
        },
        saveButton: {
            "ui:widget": "ButtonWidget",
            "ui:title": "Изменить",
            "ui:help": "",
            "ui:options": {
                label: false,
                fluid: true,
                inputType: "submit",
            },
        },
    },
    formData: {
        email: "",
        personalAgreement: false,
    },
};

function SettingsForm(props) {
    const {
        lastModified = null,
        availableCities = {},
        defaultFormData = {},

        onSubmit = Function.prototype,
        onChange = Function.prototype,
    } = props;

    const handleSubmit = useCallback((data) => {
        onSubmit(data.formData);
    });

    const handleChange = useCallback((formData) => {
        onChange(formData);
    });

    const transformErrors = useCallback((errors) => {
        localize_ru(errors);

        return errors;
    });

    const schema = useMemo(() => {
        const sectionData1 = cloneDeep(DEFAULT_SECTION_DATA_1).schema;
        const sectionData2 = cloneDeep(DEFAULT_SECTION_DATA_2).schema;
        const sectionData3 = cloneDeep(DEFAULT_SECTION_DATA_3).schema;

        sectionData1.properties.city.enum = Object.keys(availableCities) ?? [];
        sectionData1.properties.city.enumNames = Object.values(availableCities) ?? [];

        return {
            type: "array",

            items: [sectionData1, sectionData2, sectionData3],
        };
    }, [availableCities]);

    const uiSchema = useMemo(() => {
        const sectionData1 = cloneDeep(DEFAULT_SECTION_DATA_1).ui;
        const sectionData2 = cloneDeep(DEFAULT_SECTION_DATA_2).ui;
        const sectionData3 = cloneDeep(DEFAULT_SECTION_DATA_3).ui;

        const formattedLastModifiedDate = generateLatModifiedMessage(lastModified);

        sectionData3.saveButton["ui:help"] = formattedLastModifiedDate
            ? `последние изменения ${formattedLastModifiedDate}`
            : null;

        return {
            items: [sectionData1, sectionData2, sectionData3],
        };
    }, [lastModified]);

    const formData = useMemo(() => {
        const sectionData1 = cloneDeep(DEFAULT_SECTION_DATA_1).formData;
        const sectionData2 = cloneDeep(DEFAULT_SECTION_DATA_2).formData;
        const sectionData3 = cloneDeep(DEFAULT_SECTION_DATA_3).formData;

        sectionData1.city = defaultFormData.city;

        sectionData3.email = defaultFormData.email;
        sectionData3.personalAgreement = !!defaultFormData.personalAgreement;

        return [sectionData1, sectionData2, sectionData3];
    }, [defaultFormData]);

    const validate = useCallback((formData, errors) => {
        const password = formData[1]?.password ?? null;
        const repeatPassword = formData[1]?.repeatPassword ?? null;

        if (password.length && password !== repeatPassword) {
            errors[1].repeatPassword.addError("Пароли не совпадают");
        }

        return errors;
    });

    return (
        <Form
            schema={schema}
            uiSchema={uiSchema}
            defaultFormData={formData}
            transformErrors={transformErrors}
            validate={validate}
            onChange={handleChange}
            onSubmit={handleSubmit}
        />
    );
}

export default SettingsForm;
