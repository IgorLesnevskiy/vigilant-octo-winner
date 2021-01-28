import React, { useCallback } from "react";

import "./Button.scss";

function Button(props) {
    const { type, title, disabled, onClick = Function.prototype } = props;

    const handleClick = useCallback(
        (e) => {
            onClick(e.target.value);
        },
        [onClick]
    );

    return (
        <button className={"button"} type={type} disabled={disabled} onClick={handleClick}>
            {title}
        </button>
    );
}

export default Button;
