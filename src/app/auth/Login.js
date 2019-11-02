import React from 'react';
import { Link, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import { userLoginFetch } from '../../actions/auth';
import './Auth.css';

class Login extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            email: "",
            password: "",
            remember_me: 0
        };
    }

    handleChange = event => {
        this.setState({
            [event.target.name]: event.target.value
        });
    }

    handleSubmit = event => {
        event.preventDefault();
        this.props.userLoginFetch(this.state);
    }

    componentDidMount() {
        document.title = 'Login';
    }
    render() {
        if (this.props.isLoggedIn) {
            return (
                <Redirect to={process.env.REACT_APP_LOGIN_SUCCESS_URL}></Redirect>
            )
        }
        else {
            return (
                <>
                    <div className="container-fluid ">
                        <div className="d-flex justify-content-center p-2" >
                            <Link to="/">
                                <h1>
                                    <i class="fas fa-home big-icon "></i>
                                </h1>
                            </Link>
                        </div>
                        <div className="d-flex justify-content-center p-2">
                            <h3>Sign In</h3>
                        </div>
                        <form onSubmit={this.handleSubmit}>
                            <div class="form-group">
                                <input type="email" class="form-control border border-0 input_place" id="email" placeholder="Email" name="email" onChange={this.handleChange} />
                            </div>
                            <div class="form-group">
                                <input type="password" class="form-control border border-0 input_place" id="password" placeholder="Password" name="password" onChange={this.handleChange} />
                            </div>
                            <div class="form-group form-check d-flex justify-content-between ">
                                <label class="form-check-label ">
                                    <input class="form-check-input" type="checkbox" name="remember" onChange={this.handleChange} /> Remember me
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
}
const mapStateToProps = (state /*, ownProps*/) => {
    //console.log(state);
    return {
        isLoggedIn: state.auth.isLoggedIn
    }
}
const mapDispatchToProps = dispatch => ({
    userLoginFetch: userInfo => dispatch(userLoginFetch(userInfo))
})

export default connect(mapStateToProps, mapDispatchToProps)(Login);