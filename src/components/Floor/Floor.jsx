import React from "react";
import cn from "classnames";

import "./Floor.scss";

const Floor = (props) => {
    const { offsetTop = "small", offsetBottom = "small", fluid = false, extraClasses = [], children } = props;

    return (
        <div
            className={cn("floor", extraClasses)}
            data-offset-top={offsetTop}
            data-offset-bottom={offsetBottom}
            {...(fluid && { "data-container-fluid": true })}>
            <div className="floor__inner">{children}</div>
        </div>
    );
};

export default Floor;
