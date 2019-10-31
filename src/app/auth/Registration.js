import React from 'react';
import { Link, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import { userPostFetch } from '../../actions/auth';
import './Auth.css';

class Registration extends React.Component{
    constructor(props) {
        super(props);
        this.state = {
            email: "",
            name: "",
            password: "",
            password_confirmation: ""
        };
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }
    handleChange(e) {
        //console.log(this.state.email);
        this.setState({
            [e.target.name]: e.target.value
        });
    }
    handleSubmit(e)
    {
        e.preventDefault();
        this.props.userPostFetch(this.state);
    }
    componentDidMount()
    {
        document.title = 'Register';
    }
    render(){
        //console.log("PROPS: " + JSON.stringify(this.props));
        if (JSON.stringify(this.props.currentUser) != "{}") {
            return (
                <Redirect to={process.env.REACT_APP_LOGIN_SUCCESS_URL}></Redirect>
            )
        }
        else
        {
            return(
                <>
                <div className="container-fluid ">
                    <div className="d-flex justify-content-center p-2" >
                        <Link to="/">
                            <h1>
                                <i className="fas fa-users"></i>
                            </h1>
                        </Link>
                        
                    </div>
                    <div className="d-flex justify-content-center p-2">
                        <h3>
                            Sign Up
                        </h3>
                    </div>
                    <div className="d-flex justify-content-center p-2">
                        <span className="mb-4">Enter your details to create your account</span>
                    </div>
                    <form onSubmit={this.handleSubmit}>
                        <div className="form-group">
                            <input type="text" className="form-control border-0 input_place" id="name" placeholder="Fullname" name="name" value={this.state.name} onChange={this.handleChange} />
                        </div>
                        <div className="form-group">
                            <input type="email" className="form-control border-0 input_place" id="email" placeholder="Email" name="email" value={this.state.email} onChange={this.handleChange} />
                        </div>
                        <div className="form-group">
                            <input type="password" className="form-control border-0 input_place" id="password" placeholder="Password" name="password" value={this.state.password} onChange={this.handleChange}/>
                        </div>
                        <div className="form-group">
                            <input type="password" className="form-control border-0 input_place" id="password_confirmation" placeholder="Confirm Password" name="password_confirmation" value={this.state.password_confirmation} onChange={this.handleChange}/>
                        </div>
                        <div className="form-group form-check d-flex justify-content-between mt-3">
                            <label className="form-check-label ">
                                <input className="form-check-input" type="checkbox" name="agree"/> I agree to the <b>terms and conditions.</b>
                            </label>
                        </div>
                        <div className="d-flex justify-content-center mt-5">
                            <button type="submit" className="btn btn-primary btn-lg">Sign Up</button>
                            <Link to="/auth/login">
                                <button type="button" className="btn btn-light btn-lg ml-4">Cancel</button>
                            </Link>
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
      requestResponse: state.auth.requestResponse,
      currentUser: state.auth.currentUser
    }
}
const mapDispatchToProps = dispatch => ({
    userPostFetch: (userInfo) => dispatch(userPostFetch(userInfo))
  })
  
export default connect(mapStateToProps, mapDispatchToProps) (Registration);

//export default Registration;