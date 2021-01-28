import React, { useState, useCallback, useEffect } from "react";
import { withTheme } from "@rjsf/core";

import cn from "classnames";

import "./Form.scss";

import Select from "../Select";
import TextInput from "../TextInput";
import Checkbox from "../Checkbox";
import Button from "../Button";

function CheckboxWidget(props) {
    const { value, label, rawErrors = [], onChange } = props;

    const handleChange = useCallback(
        (value) => {
            onChange(value);
        },
        [onChange]
    );

    return (
        <FormFieldWrapper {...props}>
            <Checkbox value={value} label={label} onChange={handleChange} errors={rawErrors?.slice(0, 1) ?? []} />
        </FormFieldWrapper>
    );
}

function SelectWidget(props) {
    const { options, value, onChange } = props;

    return (
        <FormFieldWrapper {...props}>
            <Select options={options.enumOptions} value={value} onChange={onChange} />
        </FormFieldWrapper>
    );
}

function ButtonWidget(props) {
    const { options, disabled = false } = props;

    return (
        <FormFieldWrapper {...props}>
            <Button
                type={options?.inputType ?? "submit"}
                title={options?.title}
                disabled={disabled}
                onClick={options?.onClick}
            />
        </FormFieldWrapper>
    );
}

function InputWidget(props) {
    const { value, required, placeholder, type = "text", rawErrors = [], onChange } = props;

    const handleChange = useCallback(
        (value) => {
            onChange(value);
        },
        [onChange]
    );

    return (
        <FormFieldWrapper {...props}>
            <TextInput
                type={type}
                value={value}
                required={required}
                placeholder={placeholder}
                onChange={handleChange}
                errors={rawErrors?.slice(0, 1) ?? []}
            />
        </FormFieldWrapper>
    );
}

function FormFieldWrapper(props) {
    const { label, required, options } = props;
    const displayLabel = label && options?.label !== false;

    return (
        <div className={"form-field"}>
            <div className={"form-field__title"}>{displayLabel && (required ? `${label}*` : label)}</div>
            <div className={cn("form-field__input", options?.fluid && "form-field__input--fluid")}>
                {props.children}
            </div>
            {options?.help && <div className={"form-field__description"}>{options.help}</div>}
        </div>
    );
}

const ThemedForm = withTheme({
    widgets: {
        BaseInput: InputWidget,
        CheckboxWidget: CheckboxWidget,
        SelectWidget: SelectWidget,
        ButtonWidget: ButtonWidget,
    },

    FieldTemplate: function (props) {
        return props.children;
    },

    ArrayFieldTemplate: function (props) {
        return props.items.map((element) => {
            return <React.Fragment key={element.key}>{element.children}</React.Fragment>;
        });
    },

    ObjectFieldTemplate: function (props) {
        return (
            <div className={"form__section"}>
                {props.properties.map((field) => {
                    return (
                        <div className={"form__section-item"} key={field.name}>
                            {field.content}
                        </div>
                    );
                })}
            </div>
        );
    },

    customFormats: {
        email: (v) => {
            return (
                !v.length ||
                /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?$/.test(
                    v
                )
            );
        },
    },

    showErrorList: false,
    noHtml5Validate: false,
    liveValidate: true,
});

function Form(props) {
    const {
        schema = {},
        uiSchema = {},
        defaultFormData = null,
        showErrorList = false,
        noHtml5Validate = false,
        liveValidate = true,
        transformErrors = null,
        validate = null,
        onChange = Function.prototype,
        onSubmit = Function.prototype,
        onBlur = Function.prototype,
        onError = Function.prototype,
        onFocus = Function.prototype,
    } = props;

    const [formData, setFormData] = useState(defaultFormData);

    useEffect(() => {
        setFormData(defaultFormData);
    }, defaultFormData);

    const handleChange = useCallback(
        (params) => {
            setFormData(params.formData);

            onChange(params);
        },
        [onChange]
    );

    const handleSubmit = useCallback(
        (params) => {
            onSubmit(params);
        },
        [onSubmit]
    );
    const handleBlur = useCallback(
        (params) => {
            onBlur(params);
        },
        [onBlur]
    );
    const handleError = useCallback(
        (params) => {
            onError(params);
        },
        [onError]
    );
    const handleFocus = useCallback(
        (params) => {
            onFocus(params);
        },
        [onFocus]
    );

    return (
        <ThemedForm
            className={"form"}
            schema={schema}
            uiSchema={uiSchema}
            formData={formData}
            showErrorList={showErrorList}
            noHtml5Validate={noHtml5Validate}
            liveValidate={liveValidate}
            validate={validate}
            transformErrors={transformErrors}
            onChange={handleChange}
            onSubmit={handleSubmit}
            onBlur={handleBlur}
            onError={handleError}
            onFocus={handleFocus}>
            <React.Fragment />
        </ThemedForm>
    );
}

export default Form;
