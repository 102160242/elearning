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
                    <div className="row" >
                        <div className="col-md-4 slide p-5" style={{ backgroundImage: `url(${Background})` , color : 'white'}}>
                            <div className="logo">
                                <Link to="/" className="">
                                    <b>Home</b>
                                </Link>
                            </div>
                            <div className="middle_part">
                                asdasdasdasd
                            </div>
                            <div className="info">
                                asdasdasdasd
                            </div>
                            
                        </div>
                        <div className="col-md-6">
                            <Switch>
                                <Redirect from="/auth" exact={true} to="/auth/login" />
                                <Route exact path="/auth/login" component={Login} />
                                <Route exact path="/auth/forgotPassword" component={ForgotPassword} />
                                <Route exact path="/auth/registration" component={Registration} />
                            </Switch>
                        </div>
                    </div>
                </div>
            </>
        );
    }
}

export default Auth;