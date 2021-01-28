import { useCallback, useState, useMemo, useEffect, useRef } from "react";
import cn from "classnames";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import "./Select.scss";

const Select = (props) => {
    const { name = "foo", options = [], value, onChange = Function.prototype } = props;

    const [showOptionsList, setVisibilityOfOptionsList] = useState(false);

    useEffect(() => {
        if (showOptionsList) {
            document.addEventListener("click", handleDocumentClick);
        }

        return () => {
            document.removeEventListener("click", handleDocumentClick);
        };
    }, [showOptionsList]);

    const selectedOptionName = useMemo(() => getOptionNameByValue(value, options), [value, options]);

    const handleOptionClick = useCallback(
        (newValue, e) => {
            setVisibilityOfOptionsList(false);

            onChange(newValue);
        },
        [value, onChange]
    );

    const handleSelectClick = useCallback(
        (e) => {
            setVisibilityOfOptionsList(!showOptionsList);
        },
        [showOptionsList]
    );

    const handleDocumentClick = useCallback(({ target }) => {
        if (!target.closest(".select__list")) {
            setVisibilityOfOptionsList(false);
        }
    }, []);

    if (!options.length) {
        return null;
    }

    const nativeOptionsMarkup = options.map((option) => {
        return (
            <option value={option.value} key={option.value}>
                {option.label}
            </option>
        );
    });

    const customOptionsMarkup = options.map((option) => {
        const isSelected = value === option.value;

        return (
            <li
                className={cn("select__list-item", isSelected && "is-selected")}
                key={option.value}
                onClick={(e) => handleOptionClick(option.value, e)}>
                {option.label}
            </li>
        );
    });

    return (
        <div className={"select"}>
            <div className={cn("select__input", !value && "is-empty")} onClick={handleSelectClick}>
                <div className={"select__input-value"}>{value ? selectedOptionName : "Выберите значение"}</div>

                <div className={"select__input-arrow"}>
                    <FontAwesomeIcon icon={["fas", showOptionsList ? "chevron-up" : "chevron-down"]} />
                </div>
            </div>

            {showOptionsList && <ul className={"select__list"}>{customOptionsMarkup}</ul>}

            <div className={"select__native"}>
                <select name={name} value={value} readOnly>
                    {nativeOptionsMarkup}
                </select>
            </div>
        </div>
    );
};

export default Select;

function getOptionNameByValue(value = "", options = []) {
    if (!Array.isArray(options)) {
        return null;
    }

    return (
        options.find((option) => {
            return option.value === value;
        })?.label ?? null
    );
}
