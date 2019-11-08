import React from 'react';
import { connect } from 'react-redux';
import { getFollowers, getFollowing, follow, unfollow } from '../../actions/user';
import _Following_Follower_Card from './_Following_Follower_Card';
import { changeLoadingStatus } from '../../actions/app';

class Followers extends React.Component {
    constructor(props) {
        super(props);
        this.state = { 
            FollowingList: [],
            FollowerList: []
         };
         this.searchHandler = this.searchHandler.bind(this);
         this.handleFollowClick = this.handleFollowClick.bind(this);
         this.checkFollow = this.checkFollow.bind(this);
         this.handleUnFollowClick = this.handleUnFollowClick.bind(this);
    }

    searchHandler(e){
        var keyword = e.target.value;
        if(keyword != ""){
            var FollowerList = [];
            for(var i = 0; i < this.props.followersList.length; i ++)
            {
                var item = this.props.followersList[i];
                if (item.name.toLowerCase().includes(keyword.toLowerCase())) FollowerList.push(item);
            }
            this.setState({FollowerList: FollowerList})
        }
        else this.setState({FollowerList: this.props.followersList})
    }

    componentDidMount()
    {
        document.title = "Followers List";
        var token = localStorage.getItem('token');
        this.props.getFollowers(token).then(() => {
            this.props.changeLoadingStatus(false);
            this.setState({
                FollowerList: this.props.followersList
            });
        });
        this.props.getFollowing(token).then(() =>{
            this.setState({
                FollowingList: this.props.followingList
            });
        });
    }

    checkFollow(obj){
        var temp = false;
        for(var i = 0; i < this.state.FollowingList.length; i++)
        {
            if(obj == this.state.FollowingList[i].id){
                temp = true;
                break;
            }
        }
        return temp;
    }

    handleFollowClick(val){
        var token = localStorage.getItem('token');
        console.log(token);
        this.props.follow(token, val);
    }

    handleUnFollowClick(val){
        var token = localStorage.getItem('token');
        this.props.unfollow(token, val);
    }

    componentWillUnmount()
    {
        this.props.changeLoadingStatus(true);
    }
    render() {
        var list = [];
        for(var i = 0; i < this.state.FollowerList.length; i++)
        {
            var check = this.checkFollow(this.state.FollowerList[i].id);
            if(check == true)
                {var item = <_Following_Follower_Card name={this.state.FollowerList[i].name} id={this.state.FollowerList[i].id} fun={this.handleUnFollowClick} check={check} />;}
            else
                {var item = <_Following_Follower_Card name={this.state.FollowerList[i].name} id={this.state.FollowerList[i].id} fun={this.handleFollowClick} check={check} />;}
            list.push(item);
        }
        return (
            <>
                <div class="container">
                    <div className="row mt-3 d-flex justify-content-between ">
                        <div className="col-sm-4 ">
                            <h3>Total <span class="badge badge-primary p-2">{this.props.followersList.length}</span></h3>
                        </div>
                        <div class="col-md-3">
                            <input class="form-control mr-sm-2 " type="search" placeholder="Search" onChange={this.searchHandler} />
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
    //console.log(state);
    return {
        followersList: state.user.followersList,
        followingList: state.user.followingList,
    }
}
const mapDispatchToProps = dispatch => ({
    getFollowing: (token) => dispatch(getFollowing(token)),
    getFollowers: (token) => dispatch(getFollowers(token)),
    follow: (token, id) => dispatch(follow(token, id)),
    unfollow: (token, id) => dispatch(unfollow(token, id)),
    getFollowers: (token) => dispatch(getFollowers(token)),
    changeLoadingStatus: (status) => dispatch(changeLoadingStatus(status))
})
export default connect(mapStateToProps, mapDispatchToProps)(Followers);