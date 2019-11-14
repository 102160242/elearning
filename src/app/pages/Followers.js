import React from 'react';
import { connect } from 'react-redux';
import { getFollowers, follow, unfollow } from '../../actions/user';
import _Following_Follower_Card from './_Following_Follower_Card';
import { changeLoadingStatus } from '../../actions/app';

class Followers extends React.Component {
    constructor(props) {
        super(props);
        this.state = { 
            followersList: []
         };
         this.searchHandler = this.searchHandler.bind(this);
         this.handleFollowClick = this.handleFollowClick.bind(this);
         this.handleUnFollowClick = this.handleUnFollowClick.bind(this);
         this.ElementChange = this.ElementChange.bind(this);
    }

    searchHandler(e){
        var keyword = e.target.value;
        if(keyword != ""){
            var followersList = [];
            for(var i = 0; i < this.props.followersList.length; i ++)
            {
                var item = this.props.followersList[i];
                if (item.name.toLowerCase().includes(keyword.toLowerCase())) followersList.push(item);
            }
            this.setState({followersList: followersList})
        }
        else this.setState({followersList: this.props.followersList})
    }

    ElementChange(id)
    {
        var arr = [];
        for(var i = 0; i < this.props.followersList.length; i++)
        {
            var item = this.props.followersList[i];
            if(item.id == id)
                if(item.is_following)
                    item.is_following = false;
                else
                    item.is_following = true;
            arr.push(item);
        }
        console.log(this.props.followersList);
        // this.setState({followersList: this.props.followersList})
        console.log(this.state.followersList);
        console.log(arr);
    }

    componentDidMount()
    {
        document.title = "Followers List";
        var token = localStorage.getItem('token');
        this.props.getFollowers(token).then(() => {
            this.props.changeLoadingStatus(false);
            this.setState({
                followersList: this.props.followersList
            });
        });
    }

    handleFollowClick(val){
        var token = localStorage.getItem('token');
        //console.log(token);
        this.props.follow(token, val).then(() => {
            if(this.props.status == "success")
            {
                this.ElementChange(val);
            }
        });
        console.log("From handleFollowCLick")
        console.log(this.props.followersList)
    }

    handleUnFollowClick(val){
        var token = localStorage.getItem('token');
        this.props.unfollow(token, val).then(() => {
            if(this.props.status == "success")
            {
                this.ElementChange(val);
            }
        });
        console.log("From handleUnfollowCLick")
        console.log(this.props.followersList)
    }

    componentWillUnmount()
    {
        this.props.changeLoadingStatus(true);
    }
    render() {
        var list = [];
        for(var i = 0; i < this.state.followersList.length; i++)
        {
            var item = this.state.followersList[i];
            if(item.is_following)
                {var item = <_Following_Follower_Card name={item.name} id={item.id} fun={this.handleUnFollowClick} check={item.is_following}  />;}
            else
                {var item = <_Following_Follower_Card name={item.name} id={item.id} fun={this.handleFollowClick} check={item.is_following}  />;}
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
        status: state.user.status,
    }
}
const mapDispatchToProps = dispatch => ({
    getFollowers: (token) => dispatch(getFollowers(token)),
    follow: (token, id) => dispatch(follow(token, id)),
    unfollow: (token, id) => dispatch(unfollow(token, id)),
    changeLoadingStatus: (status) => dispatch(changeLoadingStatus(status))
})
export default connect(mapStateToProps, mapDispatchToProps)(Followers);