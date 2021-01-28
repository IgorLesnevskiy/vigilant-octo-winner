import React, { useCallback } from "react";
import cn from "classnames";

import "./TextInput.scss";

function TextInput(props) {
    const {
        type = null,
        value,
        required = false,
        placeholder = null,
        onChange = Function.prototype,
        errors = [],
    } = props;

    const handleChange = useCallback(
        (e) => {
            onChange(e.target.value);
        },
        [onChange]
    );

    return (
        <div className={cn("text-input", !!errors.length && "is-error")}>
            <input
                className={"text-input__input"}
                type={type}
                value={value}
                required={required}
                placeholder={placeholder}
                onChange={handleChange}
            />

            {!!errors.length && (
                <ul className={"text-input__errors-list"}>
                    {errors.map((error) => {
                        return (
                            <li className={"text-input__error"} key={error}>
                                {error}
                            </li>
                        );
                    })}
                </ul>
            )}
        </div>
    );
}

export default TextInput;
