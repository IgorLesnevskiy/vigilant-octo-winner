import React, { useCallback } from "react";

import "./Checkbox.scss";
import cn from "classnames";

function Checkbox(props) {
    const { value, required = false, label, errors = [], onChange = Function.prototype } = props;

    const handleChange = useCallback(
        (e) => {
            onChange(e.target.checked);
        },
        [onChange]
    );

    return (
        <label className={cn("checkbox-input", !!errors.length && "is-error")}>
            <span className={"checkbox-input__input"}>
                <input type={"checkbox"} checked={value} onChange={handleChange} required={required} />
                <span className={"checkbox-input__control"} />
            </span>
            <span className={"checkbox-input__label"}>{label}</span>

            {!!errors.length && (
                <ul className={"checkbox-input__errors-list"}>
                    {errors.map((error) => {
                        return (
                            <li className={"checkbox-input__error"} key={error}>
                                {error}
                            </li>
                        );
                    })}
                </ul>
            )}
        </label>
    );
}

export default Checkbox;
