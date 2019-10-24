import React from 'react';
import { Link ,Route, Switch, Redirect} from 'react-router-dom';
import './Login.css'

class Login extends React.Component {
    constructor(props) {
        super(props);
        this.state = {  };
    }
    render() {
        return (
            <>
            <div className="container-fluid ">
                <div className="d-flex justify-content-center p-2" >
                    <Link to="/">
                        <h1>
                            <i class="fas fa-home"></i>
                        </h1>
                    </Link>
                    
                </div>
                <div className="d-flex justify-content-center p-2">
                    <h3>
                        Sign In
                    </h3>
                </div>
                <form >
                    <div class="form-group">
                    <input type="email" class="form-control border border-0 input_place" id="email" placeholder="Email" name="email" />
                    </div>
                    <div class="form-group">
                    <input type="password" class="form-control border border-0 input_place" id="pwd" placeholder="Password" name="pswd"/>
                    </div>
                    <div class="form-group form-check d-flex justify-content-between ">
                    <label class="form-check-label ">
                        <input class="form-check-input" type="checkbox" name="remember"/> Remember me
                    </label>
                    <Link to="/auth/forgotPassword">Forget Password?</Link>
                    </div>
                    <div className="d-flex justify-content-center ">
                        <button type="submit" class="btn btn-primary btn-lg btn">Sign In</button>
                    </div>
                    <div className="d-flex justify-content-center p-4">
                        Don't have an account yet?  
                        <Link to="/auth/registration" >Sign Up</Link>
                    </div>
                </form>
            </div>
             </>
        );
    }
}

export default Login;