import React from 'react';
import {Redirect} from 'react-router-dom';
import {connect} from 'react-redux';

class NewsFeed extends React.Component {
    constructor(props) {
        super(props);
        this.state = { 
            name:"",
            email:"",
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
        }else{
            return (
                <div>
                    <div className="container mt-6">
                       <div className="information">
                            <div className="row">
                                <div className="col-auto">
                                    <div className="anh mt-5">
                                        <img src="https://www.thepaintedturtle.org/sites/main/files/main-images/camera_lense_0.jpeg" alt="image" class="img-responsive" width="60" height="60"></img>  
                                    </div>
                                </div>
                                <div className="col mb-3  ml-md-n2">
                                   <div className="mt-5">
                                   <p>{this.props.currentUser.name}</p>
                                   </div>
                                   <div className="mt-2">
                                    <p><i class="far fa-envelope mt-2 mr-2"></i>{this.props.currentUser.email}</p>
                                   </div>
                                </div>
                            </div>
                       </div>
                       <hr></hr>
                    </div>
                    <div className="container mt-4">
                        <div className="row">
                            <div className="col-md-8">
                                <p>There is no activity to show</p>
                            </div>
                            <div className="col-md-4">
                                <table className="table-responsive">
                                    <table className="table table-striped border">
                                        <tbody>
                                            <tr>
                                                <td>Joined</td>
                                                <td>{this.props.currentUser.created_at}</td>
                                            </tr>
                                            <tr>
                                                <td>Learnt</td>
                                                <td>
                                                    <a href="#" class="badge badge-pill badge-primary">Words <span class="badge badge-light"></span> </a>
                                                </td>
                                            </tr>
                                            <tr>
                                                <td>Following</td>
                                                <td>
                                                    <a href="#" class="badge badge-pill badge-success">Users <span class="badge badge-light">5</span> </a>
                                                </td>
                                            </tr>
                                            <tr>
                                                <td>Followers</td>
                                                <td>
                                                    <a href="#" class="badge badge-pill badge-info">Users <span class="badge badge-light">13</span> </a>
                                                </td>
                                            </tr>
                                        </tbody>
                                    </table>
                                </table>
                            </div>
                        </div>
                    </div>
                    <hr></hr>
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

export default connect(mapStateToProps, null) (NewsFeed);