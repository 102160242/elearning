import React from 'react';
import Login from './Login';
import ForgotPassword from './ForgotPassword';
import Registration from './Registration';
import { Route, Switch, Redirect} from 'react-router-dom';

class Auth extends React.Component {
    constructor(props) {
        super(props);
        this.state = {  };
    }
    render() {
        return (
            <Switch>
                <Redirect from="/auth" exact={true} to="/login"/>
                <Route exact path="/login" component={Login} />
                <Route exact path="/forgotPassword" component={ForgotPassword} />
                <Route exact path="/registration" component={Registration} />
            </Switch>
        );
    }
}

export default Auth;