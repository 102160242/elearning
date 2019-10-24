import React from 'react';
import { Link ,Route, Switch, Redirect} from 'react-router-dom';
import './Auth.css';

class Registration extends React.Component{
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
                            <i class="fas fa-users"></i>
                        </h1>
                    </Link>
                    
                </div>
                <div className="d-flex justify-content-center p-2">
                    <h3>
                        Sign Up
                    </h3>
                </div>
                <div className="d-flex justify-content-center p-2">
                    <span style={{marginBottom:"50px"}}>Enter your details to create your account</span>
                </div>
                <form >
                    <div class="form-group">
                        <input type="text" class="form-control border border-0 input_place" id="name" placeholder="Fullname" name="name" />
                    </div>
                    <div class="form-group">
                        <input type="email" class="form-control border border-0 input_place" id="email" placeholder="Email" name="email" />
                    </div>
                    <div class="form-group">
                        <input type="password" class="form-control border border-0 input_place" id="pwd" placeholder="Password" name="pswd"/>
                    </div>
                    <div class="form-group">
                        <input type="password" class="form-control border border-0 input_place" id="cfpwd" placeholder="Confirm Password" name="cfpswd"/>
                    </div>
                    <div style={{marginTop:"30px"}} class="form-group form-check d-flex justify-content-between ">
                        <label class="form-check-label ">
                            <input class="form-check-input" type="checkbox" name="agree"/> I Agree the <b>teams and conditions.</b>
                        </label>
                    </div>
                    <div style={{marginTop:"40px"}} className="d-flex justify-content-center ">
                        <button type="submit" class="btn btn-primary btn-lg btn">Sign Up</button>
                        <Link to="/auth/login">
                            <button style={{marginLeft:"20px"}} type="button" class="btn btn-light btn-lg btn">Cancel</button>
                        </Link>
                    </div>
                </form>
            </div>
             </>
        );
    }
}

export default Registration;