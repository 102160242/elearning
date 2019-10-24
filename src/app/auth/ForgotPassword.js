import React from 'react';
import { Link ,Route, Switch, Redirect} from 'react-router-dom';
import './ForgotPassword.css';

class ForgotPassword extends React.Component{
    constructor(props){
        super(props);
        this.state={};
    }
    render(){
        return(
            <>
            <div className="container-fluid ">
                <div className="d-flex justify-content-center p-2" >
                    <Link to="/">
                        <h1>
                            <i class="fas fa-key"></i>
                        </h1>
                    </Link>
                    
                </div>
                <div className="d-flex justify-content-center p-2">
                    <h3>
                        Forgotten Password?
                    </h3>
                </div>
                <div className="d-flex justify-content-center p-2">
                    <span style={{marginBottom:"50px"}} className = "note">Enter your email to reset your password:</span>
                </div>
                <form >
                    <div class="form-group">
                    <input type="email" class="form-control border border-0 input_place" id="email" placeholder="Email" name="email" />
                    </div>
                    <div className="d-flex justify-content-center ">
                        <button type="submit" class="btn btn-primary btn-lg btn">Request</button>
                        <Link to="/auth/login">
                            <button style={{marginLeft:"20px"}} type="button" class="btn btn-light btn-lg btn">Cancel</button>
                        </Link> 
                    </div>
                    <div className="d-flex justify-content-center p-4">
                        Don't have an account yet?  
                        <Link to="/auth/registration">Sign Up</Link>
                    </div>
                </form>
            </div>
             </>
        );
    }
}

export default ForgotPassword;