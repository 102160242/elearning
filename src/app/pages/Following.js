import React from 'react';
import { connect } from 'react-redux';
import { getFollowing, unfollow, getFollowers } from '../../actions/user';
import { Redirect } from 'react-router-dom'
import _Following_Follower_Card from './_Following_Follower_Card';
import queryString from 'query-string';
import Paginator from '../pages/partials/Paginator';

import { changeLoadingStatus } from '../../actions/app';

class Following extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            page: 1,
            search: ""
        };
        this.searchHandler = this.searchHandler.bind(this);
        // this.handleClick = this.handleClick.bind(this);
        this.getInfo = this.getInfo.bind(this);
    }

    getQueries()
    {
        var query = queryString.parse(this.props.location.search, { ignoreQueryPrefix: true });
        var queries = {};
        queries["search"] = query.search ? query.search : "";
        queries["page"] = query.page ? query.page : 1;
        return queries;
    }
    
    searchHandler(e) {
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
        this.props.getFollowing(token, user_id, queries);
        // var keyword = e.target.value;
        // if (keyword != "") {
        //     var FollowingList = [];
        //     for (var i = 0; i < this.props.followingList.length; i++) {
        //         var item = this.props.followingList[i];
        //         if (item.name.toLowerCase().includes(keyword.toLowerCase())) FollowingList.push(item);
        //     }
        //     this.setState({ FollowingList: FollowingList })
        // }
        // else this.setState({ FollowingList: this.props.followingList })
    }

    // handleClick(val) {
    //     var token = localStorage.getItem('token');
    //     this.props.unfollow(token, val).then(() => {
    //         if (this.props.unfollowStatus == "success") {
    //             this.getInfo();
    //         }
    //     });
    // }

    getInfo() {
        document.title = "Following List";
        var token = localStorage.getItem('token');
        var user_id = this.props.match.params.user_id;
        this.props.getFollowing(token, user_id, this.getQueries()).then(() => {
            this.props.changeLoadingStatus(false);
        });
    }

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
            nextProps.getFollowing(token, user_id, queries);
            nextProps.changeLoadingStatus(false);
            return { search: queries["search"], page: queries["page"] }
        }
        return null;
    }
    
    componentDidMount() {
        this.getInfo();
    }
    componentWillUnmount() {
        this.props.changeLoadingStatus(true);
    }
    render() {
        if(this.props.isLoggedIn === false)
        {
            return (<Redirect to={"/auth/login"} />);
        }
        var list = [];
        for (var i = 0; i <  this.props.followingData.list.length; i++) {
            var data = this.props.followingData.list[i];
            var item = <_Following_Follower_Card data={data} key={data.id} />;
            list.push(item);
        }
        return (
            <>
                <div class="container">
                    <div className="row mt-3 d-flex justify-content-between ">
                        <div className="col-sm-4 ">
                            <h3>Total <span class="badge badge-primary p-2">{this.props.followingData.paginate.total_item} </span></h3>
                        </div>
                        <div class="col-md-3">
                            <input class="form-control mr-sm-2 " type="search" placeholder="Search" onChange={this.searchHandler} />
                        </div>
                    </div>
                    <hr></hr>
                    <div className="row d-flex justify-content-start">
                        {list}
                    </div>
                    <Paginator paginate={this.props.followingData.paginate } queries={this.getQueries()}/>
                </div>
            </>
        );
    }
}

const mapStateToProps = (state /*, ownProps*/) => {
    return {
        followingData: state.user.followingData,
        isLoggedIn: state.auth.isLoggedIn,
        unfollowStatus: state.user.status,
    }
}
const mapDispatchToProps = dispatch => ({
    getFollowing: (token, user_id, params) => dispatch(getFollowing(token, user_id, params)),
    // unfollow: (token, id) => dispatch(unfollow(token, id)),
    changeLoadingStatus: (status) => dispatch(changeLoadingStatus(status))
})

export default connect(mapStateToProps, mapDispatchToProps)(Following);