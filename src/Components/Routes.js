import React from "react";
import { Route, Switch} from "react-router-dom";
import PropTypes from "prop-types";
import Feed from "../Routes/Feed";
import Auth from "../Routes/Auth";
import Explore from "../Routes/Explore";
import Profile from "../Routes/Profile/ProfileContainer";
import Search from "../Routes/Search";

const LoggedInRoutes = () => (
    <Switch>
        <Route exact path="/" component={Feed} />
        <Route path="/explore" component={Explore} />
        <Route path="/search" component={Search} />
        <Route path="/:userName" component={Profile} />
    </Switch>
)

const LoggedOutRoutes = () => (
    <Switch>
        <Route exact path="/" component={Auth}>

        </Route>
    </Switch>
)


const AppRouter = ({isLoggedIn}) => 
    isLoggedIn ? <LoggedInRoutes /> : <LoggedOutRoutes />


AppRouter.propTypes = {
    isLoggedIn: PropTypes.bool.isRequired
};

export default AppRouter;