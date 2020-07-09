import React from 'react';
import { Switch } from 'react-router';
import { Router, Route, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';

import { history } from '../_helpers';
import { alertActions } from '../_actions';
import { PrivateRoute } from '../_components';
import { HomePage } from '../HomePage';
import { LoginPage } from '../LoginPage';
import { RegisterPage } from '../RegisterPage';
import { LogoutPage } from '../LogoutPage';
import { EditPostPage } from '../EditPostPage';
import { AddPostPage } from '../AddPostPage';
import { ProfilePage } from '../ProfilePage';
import { EditProfilePage } from '../EditProfilePage';
import { UserProfilePage } from '../UserProfilePage';

class App extends React.Component {
    constructor(props) {
        super(props);

        history.listen((location, action) => {
            // clear alert on location change
            this.props.clearAlerts();
        });
    }

    render() {
        const { alert } = this.props;
        return (
            <div className="jumbotron">
                <div className="container">
                    <div className="col-sm-8 col-sm-offset-2">
                        {alert.message &&
                            <div className={`alert ${alert.type}`}>{alert.message}</div>
                        }
                        <Router history={history}>
                            <Switch>
                                <PrivateRoute exact path="/" component={HomePage} />
                                <PrivateRoute exact path="/edit-post/:id" component={EditPostPage} />
                                <PrivateRoute exact path="/add-post" component={AddPostPage} />
                                <PrivateRoute exact path="/profile" component={ProfilePage} />
                                <PrivateRoute exact path="/edit-profile" component={EditProfilePage} />
                                <PrivateRoute exact path="/user-profile/:id" component={UserProfilePage} />
                                <Route path="/login" component={LoginPage} />
                                <Route path="/register" component={RegisterPage} />
                                <Route exact path="/logout" component={LogoutPage} />
                                {/* <Redirect to="/404" /> */}
                                <Redirect from="*" to="/" />
                            </Switch>
                        </Router>
                    </div>
                </div>
            </div>
        );
    }
}

function mapState(state) {
    const { alert } = state;
    return { alert };
}

const actionCreators = {
    clearAlerts: alertActions.clear
};

const connectedApp = connect(mapState, actionCreators)(App);
export { connectedApp as App };