import React from "react";
import { render } from "react-dom";
import { Provider } from "react-redux";
import { Route, Switch } from "react-router";
import { ConnectedRouter } from "react-router-redux";
import "semantic-ui-css/semantic.min.css";
import Error404 from "./components/Error404";
import LandingPage from "./components/LandingPage";
import MainPage from "./components/MainPage";
import RoomPage from "./components/RoomPage";
import PasswordResetPage from "./components/PasswordResetPage";
import PrivateRoute from "./components/PrivateRoute";
import OpenRoute from "./components/OpenRoute";
import { history } from "./middleware/history";
import store from "./store";
import "./config/polyfills";

const date = new Date();
console.log("BUILD", "1.0.15", date.toDateString(), date.toTimeString());

render(
    <Provider store={store}>
        <ConnectedRouter history={history}>
            <Switch>
                <OpenRoute exact path="/" component={LandingPage} />
                <OpenRoute
                    exact
                    path="/password-reset/:token/email/:email"
                    component={PasswordResetPage}
                />
                <PrivateRoute exact path="/main" component={MainPage} />
                <PrivateRoute
                    exact
                    path="/room/:roomRef"
                    component={RoomPage}
                />
                <Route component={Error404} />
            </Switch>
        </ConnectedRouter>
    </Provider>,
    document.getElementById("root")
);

if (module.hot) {
    module.hot.accept();
}
