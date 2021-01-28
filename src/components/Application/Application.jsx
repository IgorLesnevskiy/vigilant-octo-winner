import { Switch, Route, Link } from "react-router-dom";
import { library } from "@fortawesome/fontawesome-svg-core";
import { fas } from "@fortawesome/free-solid-svg-icons";

import "./Application.scss";

//layouts
import MainLayout from "../../layouts/MainLayout";

//pages
import IndexPage from "../../pages/IndexPage";

library.add(fas);

const IndexPageWithLayout = () => (
    <MainLayout>
        <IndexPage />
    </MainLayout>
);

function Application() {
    return (
        <>
            <Switch>
                <Route path={"/"}>
                    <IndexPageWithLayout />
                </Route>
            </Switch>
        </>
    );
}

export default Application;
