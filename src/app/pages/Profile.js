import React from 'react';
import {Redirect} from 'react-router-dom';
import {connect} from 'react-redux';


class Profile extends React.Component {
    constructor(props) {
        super(props);
        this.state = { 
            email: "",
            name: "",
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
    }
    render() {
        if(!this.props.isLoggedIn) {
            return (
                <Redirect to={process.env.REACT_APP_ROOT_URL}></Redirect>
            )
        }
        else
        {
            return (
                <div className="container">
                    <h3 className="mt-3">Profile</h3>
                    <div className="row">
                        <div className="col-md">
                            <ul class="nav flex-column pt-2" >
                                <li className="nav-item"><a href="#personal" aria-controls="personal" role="tab" data-toggle="tab" className="nav-link active">Personal Information</a></li>
                                <li className="nav-item"><a href="#password" aria-controls="password" role="tab" data-toggle="tab" className="nav-link">Change Password</a></li>
                                {/* <li className="nav-item"><a href="#following" aria-controls="following" role="tab" data-toggle="tab" className="nav-link">Following</a></li>
                                    <li className="nav-item"><a href="#followers" aria-controls="followers" role="tab" data-toggle="tab" className="nav-link">Followers</a></li> */}
                            </ul>
                        </div>
                        <div className="col-md-8 pt-2">
                            <div className="group-tabs">
                                <div class="tab-content col-md-12">
                                <div role="tabpanel" class="tab-pane in active" id="personal">
                                        <p>Personal Information:</p>
                                        User's Information...
                                    </div>
                                    <div role="tabpanel" class="tab-pane" id="password">
                                        <p>Change Password:</p>
    
                                        <form onSubmit={this.handleSubmit}>
                                            <div className="form-group">
                                                <label for="name">Full Name</label>
                                                <input type="text" className="form-control" placeholder="Full Name" id="name" value={this.state.name === "" ? this.props.currentUser.name : this.state.name} onChange={this.handleChange}></input>
                                            </div>
                                            <div className="form-group danger">
                                                <label for="email">Email</label>
                                                <input type="email" className="form-control" id="email" value={this.props.currentUser.email} disabled></input>
                                            </div>

                                            <div className="form-group danger">
                                                <label for="cpw">Current password</label>
                                                <input type="password" className="form-control" id="pw" placeholder="Your current password"></input>
                                            </div>

                                            <div className="form-group danger">
                                                <label for="pw">Password</label>
                                                <input type="password" className="form-control" id="pw"></input>
                                            </div>

                                            <div className="form-group danger">
                                                <label for="dpw">Password confirmation</label>
                                                <input type="password" className="form-control" id="dpw" placeholder="Type your password once again"></input>
                                            </div>
                                            
                                            <button type="submit" className="btn btn-outline-primary mr-3">Update</button>
                                            <button type="clear" className="btn btn-outline-secondary">Clear</button>
                                        </form>
                                    </div>
                                    {/* <div role="tabpanel" class="tab-pane" id="followers">
                                        danh sach followers
                                     </div>
                                    <div role="tabpanel" class="tab-pane" id="following">
                                        danh sach following
                                     </div> */}
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
    //console.log(state);
    return {
      currentUser: state.auth.currentUser,
      isLoggedIn: state.auth.isLoggedIn
    }
}

export default connect(mapStateToProps, null) (Profile);
//export default Profile;