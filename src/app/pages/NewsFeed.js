import React from 'react';
import { Redirect, Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { changeLoadingStatus } from '../../actions/app'; 
import {getFollowing ,getFollowers} from '../../actions/user';

class NewsFeed extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            name: "",
            email: "",
            following_list:[],
            followers_list:[],
        };
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }
    componentDidMount() {
        document.title = "News Feed";
        this.props.changeLoadingStatus(false);

        document.title = "Following List";
        var token = localStorage.getItem('token');
        this.props.getFollowing(token).then(() =>{
            this.props.changeLoadingStatus(false);
            this.setState({
                following_list: this.props.followingList
            });
        });

        document.title = "Followers List";
        var token = localStorage.getItem('token');
        this.props.getFollowers(token).then(() => {
            this.props.changeLoadingStatus(false);
            this.setState({
                followers_list: this.props.followersList
            });
        });

    }
    componentWillUnmount()
    {
        this.props.changeLoadingStatus(true);
    }
    handleChange(e) {
        //console.log(this.state.email);
        this.setState({
            [e.target.name]: e.target.value
        });
        var keyword = e.target.value;
        if(keyword != ""){
            var following_list = [];
            for(var i = 0; i < this.props.followingList.length; i ++)
            {
                var item = this.props.followingList[i];
                if (item.name.toLowerCase().includes(keyword.toLowerCase())) following_list.push(item);
            }
            this.setState({following_list: following_list})
        }
        else this.setState({following_list: this.props.followingList});
        if(keyword != ""){
            var followers_list = [];
            for(var i = 0; i < this.props.followersList.length; i ++)
            {
                var item = this.props.followersList[i];
                if (item.name.toLowerCase().includes(keyword.toLowerCase())) followers_list.push(item);
            }
            this.setState({followers_list: followers_list})
        }
        else this.setState({followers_list: this.props.followersList});
    }
    handleSubmit(e) {
        e.preventDefault();
    }
    render() {
        if (!this.props.isLoggedIn) {
            return (
                <></>
            )
        } else {
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
                                                    <Link to="/learnt_words" class="badge badge-pill badge-primary">Words <span class="badge "></span> </Link>
                                                </td>
                                            </tr>
                                            <tr>
                                                <td>Following</td>
                                                <td>
                                                    <Link to="/following" class="badge badge-pill badge-info p-2">Users <span class="badge badge-info">{this.props.followingList.length}</span> </Link>
                                                </td>
                                            </tr>
                                            <tr>
                                                <td>Followers</td>
                                                <td>
                                                    <Link to="/followers" class="badge badge-pill badge-warning p-2">Users <span class="badge badge-warning">{this.props.followersList.length}</span> </Link>
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
        isLoggedIn: state.auth.isLoggedIn,
        followingList: state.user.followingList,
        followersList: state.user.followersList,
    }
}
const mapDispatchToProps = dispatch => ({
    changeLoadingStatus: (status) => dispatch(changeLoadingStatus(status)),
    getFollowing: (token) => dispatch(getFollowing(token)),
    getFollowers: (token) => dispatch(getFollowers(token)),

});

export default connect(mapStateToProps, mapDispatchToProps)(NewsFeed);