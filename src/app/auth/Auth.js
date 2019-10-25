import React from 'react';
import Login from './Login';
import ForgotPassword from './ForgotPassword';
import Registration from './Registration';
import { Link ,Route, Switch, Redirect} from 'react-router-dom';
import Background from './Image/bg.jpg'
import './Auth.css';

class Auth extends React.Component {
    constructor(props) {
        super(props);
        this.state = {  };
    }
    render() {

        return (
            <>
                <div className="container-fluid">
                    <div className="row slide d-flex justify-content-center align-items-center" style={{backgroundImage: `url(${Background})` , color : '#595d6e'}}>
                        <div className="col-sm-9 col-md-6 col-xl-4 mx-auto ">    
                            <Switch>
                                <Redirect from="/auth" exact={true} to="/auth/login" />
                                <Route exact path="/auth/login" component={Login} />
                                <Route exact path="/auth/forgotPassword" component={ForgotPassword} />
                                <Route exact path="/auth/registration" component={Registration} />
                            </Switch>
                        </div >
                            
                    </div>
                </div>
            </>
        );
    }
}

export default Auth;