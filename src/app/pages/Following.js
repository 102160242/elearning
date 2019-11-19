import React from 'react';
import { connect } from 'react-redux';
import { getFollowing,unfollow, getFollowers } from '../../actions/user';
import _Following_Follower_Card from './_Following_Follower_Card';

import { changeLoadingStatus } from '../../actions/app';

class Following extends React.Component {
    constructor(props) {
        super(props);
        this.state = {  
            FollowingList: []
        };
        this.searchHandler = this.searchHandler.bind(this);
        this.handleClick = this. handleClick.bind(this);
        this.getInfo = this.getInfo.bind(this);
    }

    searchHandler(e){
        var keyword = e.target.value;
        if(keyword != ""){
            var FollowingList = [];
            for(var i = 0; i < this.props.followingList.length; i ++)
            {
                var item = this.props.followingList[i];
                if (item.name.toLowerCase().includes(keyword.toLowerCase())) FollowingList.push(item);
            }
            this.setState({FollowingList: FollowingList})
        }
        else this.setState({FollowingList: this.props.followingList})
    }

    handleClick(val){
        var token = localStorage.getItem('token');
        this.props.unfollow(token, val).then(() => {
            if(this.props.unfollowStatus == "success")
            {
                this.getInfo();
            }
        });
    }

    getInfo()
    {
        document.title = "Following List";
        var token = localStorage.getItem('token');
        var user_id = this.props.match.params.user_id;
        this.props.getFollowing(token, user_id).then(() =>{
            this.props.changeLoadingStatus(false);
            this.setState({
                FollowingList: this.props.followingList
            });
        });
    }

    componentDidMount()
    {
        this.getInfo();
    }
    componentWillUnmount()
    {
        this.props.changeLoadingStatus(true);
    }
    render() {
        var list = [];
        for(var i = 0; i < this.state.FollowingList.length; i++)
        {
            var item = <_Following_Follower_Card name={this.state.FollowingList[i].name} id={this.state.FollowingList[i].id} fun={this.handleClick} check={true} />;
            list.push(item);
        }
        return (
            <>
            <div class="container">
                <div className="row mt-3 d-flex justify-content-between ">
                    <div className="col-sm-4 ">
                        <h3>Total <span class="badge badge-primary p-2">{this.props.followingList.length} </span></h3>
                    </div>
                    <div class="col-md-3">
                        <input class="form-control mr-sm-2 " type="search" placeholder="Search" onChange={this.searchHandler}/>
                    </div>
                </div>
                <hr></hr>
                <div className="row d-flex justify-content-start">
                    {list}
                </div>
            </div>
        </>
        );
    }
}

const mapStateToProps = (state /*, ownProps*/) => {
    return {
        followingList: state.user.followingList,
        unfollowStatus: state.user.status,
    }
}
const mapDispatchToProps = dispatch => ({
    getFollowing: (token, user_id) => dispatch(getFollowing(token, user_id)),
    unfollow: (token, id) => dispatch(unfollow(token, id)),
    changeLoadingStatus: (status) => dispatch(changeLoadingStatus(status))
})

export default connect(mapStateToProps, mapDispatchToProps) (Following);