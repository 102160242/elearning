import React from 'react';
import { Redirect, Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { updateUser } from '../../actions/user';
import { changeLoadingStatus } from '../../actions/app';

class Profile extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            email: "",
            name: "",
            current_password: "",
            password: "",
            password_confirmation: "",

        };
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }
    componentDidMount() {
        document.title = "Profile";
        this.props.changeLoadingStatus(false);
    }
    handleChange(e) {
        //console.log(this.state.email);
        this.setState({
            [e.target.name]: e.target.value
        });
    }
    handleSubmit(e) {
        e.preventDefault();
        var token = localStorage.getItem('token');
        //console.log("Thong tin form: ");
        //console.log(e.target);
        this.props.updateUser(token, this.state);
    }
    render() {
        // //console.log(this.state);
        if (!this.props.isLoggedIn) {
            return (
                <></>
            )
        }
        else {
            return (
                <div className="container">
                    <h3 className="mt-3">Profile</h3>
                    <div className="row">
                        <div className="col-md">
                            <ul class="nav flex-column pt-2" >
                                <li className="nav-item"><a href="#personal" aria-controls="personal" role="tab" data-toggle="tab" className="nav-link active">Personal Information</a></li>
                                <li className="nav-item"><a href="#password" aria-controls="password" role="tab" data-toggle="tab" className="nav-link">Change Password</a></li>
                            </ul>
                        </div>
                        <div className="col-md-8 pt-2">
                            <div className="group-tabs">
                                <div className="tab-content col-md-12">
                                    <div role="tabpanel" class="tab-pane in active" id="personal">
                                        <div className="card">
                                            <div className="card-body">
                                                <div className="row d-flex justify-content-center">
                                                    <div className="col-md-3 border border-success border-left-0 border-top-0 border-bottom-0">
                                                        <img src={this.props.currentUser.avatar_url} className="rounded" />
                                                    </div>
                                                    <div className="col-md-9">
                                                        <div className="mb-3 d-flex justify-content-center">
                                                            <span className="h3">{this.props.currentUser.name}</span>
                                                        </div>
                                                        <div className="d-flex justify-content-center">
                                                            <Link to="/followers" className="btn btn-sm btn-outline-success mr-3">Followers <span className="badge">{this.props.currentUser.total_followers}</span></Link>
                                                            <Link to="/following" className="btn btn-sm btn-outline-info">Following <span className="badge">{this.props.currentUser.total_following}</span></Link>
                                                        </div>
                                                    </div>
                                                    <div className="col-md-8 mt-4">
                                                        <div className="d-flex justify-content-between">
                                                            <span className="font-weight-bold">Email: </span>
                                                            <span className="font-weight-light">{this.props.currentUser.email}</span>
                                                        </div>
                                                        <div className="d-flex justify-content-between">
                                                            <span className="font-weight-bold">Joined: </span>
                                                            <span className="font-weight-light">{this.props.currentUser.created_at}</span>
                                                        </div>
                                                        <div className="d-flex justify-content-between">
                                                            <span className="font-weight-bold">Number of tests: </span>
                                                            <span className="font-weight-light">{this.props.currentUser.total_test}</span>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div role="tabpanel" class="tab-pane" id="password">
                                        <form onSubmit={this.handleSubmit}>
                                            <div className="form-group">
                                                <label for="name">Full Name</label>
                                                <input type="text" className="form-control" placeholder="Full Name" name="name" value={this.state.name == "" ? this.props.currentUser.name : this.state.name} onChange={this.handleChange}></input>
                                            </div>
                                            <div className="form-group danger">
                                                <label for="email">Email</label>
                                                <input type="email" className="form-control" id="email" value={this.props.currentUser.email} disabled></input>
                                            </div>

                                            <div className="form-group danger">
                                                <label for="cpw">Current password</label>
                                                <input type="password" className="form-control" name="current_password" placeholder="Your current password" onChange={this.handleChange}></input>
                                            </div>

                                            <div className="form-group danger">
                                                <label for="pw">New Password</label>
                                                <input type="password" className="form-control" name="password" onChange={this.handleChange}></input>
                                            </div>

                                            <div className="form-group danger">
                                                <label for="dpw">New Password confirmation</label>
                                                <input type="password" className="form-control" name="password_confirmation" placeholder="Type your password once again" onChange={this.handleChange}></input>
                                            </div>

                                            <button type="submit" className="btn btn-outline-primary btn-block">Update</button>
                                        </form>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            );
        }

    }
}

const mapStateToProps = (state /*, ownProps*/) => {
    return {
        currentUser: state.auth.currentUser,
        isLoggedIn: state.auth.isLoggedIn
    }
}
const mapDispatchToProps = dispatch => ({
    updateUser: (token, user) => dispatch(updateUser(token, user)),
    changeLoadingStatus: (status) => dispatch(changeLoadingStatus(status))
});
export default connect(mapStateToProps, mapDispatchToProps) (Profile);