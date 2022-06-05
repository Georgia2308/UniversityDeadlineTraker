import React, { useState } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import "./App.css";
import { useToken, useUser } from "./Utils/Token";
import { Pages } from "./Utils/Enums";
import { Header } from "./Components/Header";
import LoginPage from "./Pages/LoginPage";
import { BoardPage } from "./Pages/BoardPage";
import BacklogPage from "./Pages/BacklogPage";
import CommunityPage from "./Pages/CommunityPage";
import ProfilePage from "./Pages/ProfilePage";
import SettingsPage from "./Pages/SettingsPage";
import ProfsPage from "./Pages/ProfsPage";

export const App = () => {
    const token = useToken();
    const user = useUser();

    return (
        <React.Fragment>
            <Router>
                <Header token={token} user={user} />
                <Switch>
                    <Route exact path={Pages.HOME}>
                        <LoginPage token={token} user={user} />
                    </Route>
                    <Route path={Pages.BOARD}>
                        <BoardPage token={token} user={user} />
                    </Route>
                    <Route path={Pages.BACKLOG}>
                        <BacklogPage token={token} user={user} />
                    </Route>
                    <Route path={Pages.PROFS}>
                        <ProfsPage token={token} user={user} />
                    </Route>
                    <Route path={Pages.COMMUNITY}>
                        <CommunityPage token={token} user={user} />
                    </Route>
                    <Route path={Pages.PROFILE}>
                        <ProfilePage token={token} user={user} />
                    </Route>
                    <Route path={Pages.SETTINGS}>
                        <SettingsPage token={token} user={user} />
                    </Route>
                </Switch>
            </Router>
        </React.Fragment>
    );
};
export default App;
