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
import NavBarContainer from './nav_bar/nav_bar_container';
import SidebarContainer from './sidebar/sidebar_container';
import SignupFormContainer from './session_forms/signup_form/signup_form_container';
import LoginFormContainer from './session_forms/login_form/login_form_container';
import VideoIndexContainer from './videos/video_index/video_index_container';
import VideoShowContainer from './videos/video_show/video_show_container';
import Modal from './modal/modal_container';
// import CreateVideoContainer from './videos/create_video/create_video_container';

const App = () => (
    <div className="blutube-app">
        
            <NavBarContainer />
        <Modal />
        <div className="main-section">
        <SidebarContainer />
            <Switch>
                <Route exact path="/" component={VideoIndexContainer} />
                <Route path='/videos/:videoId' component={VideoShowContainer} />
                <AuthRoute exact path="/signin" component={LoginFormContainer} />
                <AuthRoute exact path="/signup" component={SignupFormContainer} />
                {/* <ProtectedRoute path="/user/videos" component={CreateVideoContainer} /> */}
            </Switch>
        </div>
    </div>
);

export default App;