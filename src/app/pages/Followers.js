import React from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom'
import { getFollowers, follow, unfollow } from '../../actions/user';
import _Following_Follower_Card from './_Following_Follower_Card';
import { changeLoadingStatus } from '../../actions/app';
import queryString from 'query-string';
import Paginator from '../pages/partials/Paginator';

class Followers extends React.Component {
    constructor(props) {
        super(props);
        this.state = { 
            page: 1,
            search: ""
         };
         this.searchHandler = this.searchHandler.bind(this);
        //  this.handleFollowClick = this.handleFollowClick.bind(this);
        //  this.handleUnFollowClick = this.handleUnFollowClick.bind(this);
    }

    searchHandler(e)
    {
        var user_id = this.props.match.params.user_id;
        var token = localStorage.getItem('token');

        // Params
        var queries = this.getQueries();
        queries["search"] = e.target.value;
        queries["page"] = 1;
        this.setState({
            search: queries["search"],
            page: queries["page"]
        })
        this.props.history.push({
            search: "?" + new URLSearchParams(queries).toString()
        });
        this.props.getFollowers(token, user_id, queries);
        /*var keyword = e.target.value;
        if(keyword != ""){
            var followersList = [];
            for(var i = 0; i < this.props.followersList.length; i ++)
            {
                var item = this.props.followersList[i];
                if (item.name.toLowerCase().includes(keyword.toLowerCase())) followersList.push(item);
            }
            this.setState({followersList: followersList});
            console.log(this.state.followersList)

        }
        else this.setState({followersList: this.props.followersList})*/
    }
    getQueries()
    {
        var query = queryString.parse(this.props.location.search, { ignoreQueryPrefix: true });
        var queries = {};
        queries["search"] = query.search ? query.search : "";
        queries["page"] = query.page ? query.page : 1;
        return queries;
    }
    // handleFollowClick(val){
    //     var token = localStorage.getItem('token');
    //     //console.log(token);
    //     this.props.follow(token, val);
    //     //console.log("From handleFollowCLick")
    //     //console.log(this.props.followersList)
    // }

    // handleUnFollowClick(val){
    //     var token = localStorage.getItem('token');
    //     this.props.unfollow(token, val);
    //     //console.log("From handleUnfollowCLick")
    //     //console.log(this.props.followersList)
    // }
    static getDerivedStateFromProps(nextProps, prevState)
    {
        console.log("getDerivedStateFromProps called")
        var query = queryString.parse(nextProps.location.search, { ignoreQueryPrefix: true });
        var queries = {};
        queries["search"] = query.search ? query.search : "";
        queries["page"] = query.page ? query.page : 1;

        var user_id = nextProps.match.params.user_id;
        var token = localStorage.getItem('token');

        if(queries["search"] !== prevState.search || queries["page"] !== prevState.page)
        {
            nextProps.getFollowers(token, user_id, queries);
            nextProps.changeLoadingStatus(false);
            return { search: queries["search"], page: queries["page"] }
        }
        return null;
    }
    componentDidMount()
    {
        console.log("Goi component did mount");
        document.title = "Followers List";
        var user_id = this.props.match.params.user_id;
        var token = localStorage.getItem('token');
        this.props.getFollowers(token, user_id, this.getQueries()).then(() => {
            this.props.changeLoadingStatus(false);
            // this.setState({
            //     followersList: this.props.followersList
            // });
        });
    }
    componentWillUnmount()
    {
        this.props.changeLoadingStatus(true);
    }
    render() {
        //console.log(this.state);
        // console.log(this.props.isLoggedIn)
        if(!this.props.isLoggedIn)
        {
            return (<Redirect to={"/auth/login"} />);
        }
        var list = [];
        for(var i = 0; i < this.props.followersData.list.length; i++)
        {
            var d = this.props.followersData.list[i];
            {var item = <_Following_Follower_Card data={d}  key={d.id} />;}
            list.push(item);
        }
        return (
            <>
                <div class="container">
                    <div className="row mt-3 d-flex justify-content-between ">
                        <div className="col-sm-4 ">
                            <h3>Total <span class="badge badge-primary p-2">{this.props.followersData.paginate.total_item}</span></h3>
                        </div>
                        <div class="col-md-3">
                            <input class="form-control mr-sm-2 " type="search" placeholder="Search" onChange={this.searchHandler} value={this.getQueries().search}/>
                        </div>
                    </div>
                    <hr></hr>
                    <div className="row d-flex justify-content-start">
                        {list}
                    </div>
                    <Paginator paginate={this.props.followersData.paginate } queries={this.getQueries()}/>
                </div>
            </>
        );
    }
}

const mapStateToProps = (state /*, ownProps*/) => {
    //console.log(state);
    return {
        followersData: state.user.followersData,
        isLoggedIn: state.auth.isLoggedIn,
        status: state.user.status,
    }
}
const mapDispatchToProps = dispatch => ({
    getFollowers: (token, user_id, params) => dispatch(getFollowers(token, user_id, params)),
    follow: (token, id) => dispatch(follow(token, id)),
    unfollow: (token, id) => dispatch(unfollow(token, id)),
    changeLoadingStatus: (status) => dispatch(changeLoadingStatus(status))
})
export default connect(mapStateToProps, mapDispatchToProps)(Followers);