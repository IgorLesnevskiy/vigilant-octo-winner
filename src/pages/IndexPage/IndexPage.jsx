import React from "react";

import Floor from "../../components/Floor";
import PersonalSettingsContainer from "../../containers/Personal/Settings";

const IndexPage = () => {
    return (
        <React.Fragment>
            <Floor>
                <PersonalSettingsContainer userId={"mockUserId"} />
            </Floor>
        </React.Fragment>
    );
};

export default IndexPage;
