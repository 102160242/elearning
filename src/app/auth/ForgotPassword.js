import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import './Auth.css';

class ForgotPassword extends React.Component{
    constructor(props){
        super(props);
        this.state={
            email: "",
        };
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }
    handleChange(e) {
        this.setState({
            [e.target.name]: e.target.value
        });
    }
    handleSubmit(e) {
        e.preventDefault();
        var token = localStorage.getItem('token');
        this.props.updateUser(token, this.state);
    }
    componentDidMount()
    {
        document.title = 'Forgot Password';
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
                    <input type="email" class="form-control border border-0 input_place" id="email" placeholder="Email" name="email" value={this.props.currentUser.email} />
                    </div>
                    <div className="d-flex justify-content-center ">
                        <button type="submit" class="btn btn-primary btn-lg btn_edit">Request</button>
                        <Link to="/auth/login">
                            <button style={{marginLeft:"20px"}} type="button" class="btn btn-light btn-lg btn_edit">Cancel</button>
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
const mapStateToProps = (state /*, ownProps*/) => {
    return {
        currentUser: state.auth.currentUser,
    }
}

export default connect(mapStateToProps, null) (ForgotPassword);