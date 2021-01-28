import Page from "../../components/Page";

import "./MainLayout.scss";

function MainLayout(props) {
    return (
        <>
            <Page>{props.children}</Page>
        </>
    );
}

export default MainLayout;
