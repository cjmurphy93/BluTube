import React from 'react';
import { Provider } from 'react-redux';
import{
    Route,
    Redirect,
    Link,
    Switch,
    HashRouter
} from 'react-router-dom';
import { AuthRoute, ProtectedRoute } from '../util/route_util';
import NavBarContainer from './nav-bar/nav_bar_container';
import SignupFormContainer from './session_forms/signup_form/signup_form_container';
import LoginFormContainer from './session_forms/login_form/login_form_container';

const App = () => (
    <div>
        <header>
            <Link to="/" className="header-link">
                <h1>BluTube</h1>
            </Link>
            <NavBarContainer />
        </header>
        <Switch>
            <AuthRoute exact path="/signin" component={LoginFormContainer} />
            <AuthRoute exact path="/signup" component={SignupFormContainer} />
        </Switch>
    </div>
);

export default App;