import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { changeLoadingStatus } from '../../actions/app';
import { getNewsFeed } from '../../actions/user';

class NewsFeed extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
        };
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.renderActivities = this.renderActivities.bind(this);
    }
    static getDerivedStateFromProps(props, prevState){
        //console.log("getDerivedStateFromProps called")
        //console.log(props);
        //if(props.isLoggedIn === true)
        //{
            if(props.newsFeed.timeline.length === 0 && Object.keys(props.newsFeed.user_info).length === 0) // Neu chua co du lieu Newsfeed duoc lay ve
            {
                // Lay ID user theo params neu truy cap vao duong dan /user_id/newsfeed
                var user_id = props.match.params.user_id;
                var token = localStorage.getItem("token");
                props.getNewsFeed(token, user_id).then(() => {
                    props.changeLoadingStatus(false);
                })
            }
            else
            {
                props.changeLoadingStatus(false);
            }
        //}
        // else if(props.isLoggedIn === false)
        // {
        //     props.history.push("/403");
        // }
        return null;
    }
    componentDidMount() {
        document.title = "News Feed";
    }
    componentWillUnmount() {
        this.props.changeLoadingStatus(true);
    }
    handleChange(e) {
        //console.log(this.state.email);
        this.setState({
            [e.target.name]: e.target.value
        });
    }
    handleSubmit(e) {
        e.preventDefault();
    }
    renderActivities() {
        if (this.props.newsFeed.timeline && this.props.newsFeed.timeline.length === 0) {
            return <p>There is no activity to show</p>
        }
        else {
            return this.props.newsFeed && this.props.newsFeed.timeline && this.props.newsFeed.timeline.map((i, key) => {
                var user_info = this.props.newsFeed.user_info;
                return (
                    <div className="card mb-2" key={key}>
                        <div className="card-body">
                            <div className="mb-3">
                                <div className="row align-items-center">
                                    <div className="col-auto">
                                        <Link to={"/" + i.user_id + "/newsfeed"} className="avatar">
                                            <img src={user_info.avatar_url} alt="Avatar" className="avatar-img rounded-circle" style={{ height: "50px" }} />
                                        </Link>
                                    </div>
                                    <div className="col ml-n2">
                                        <h4 className="card-title mb-1">
                                            {i.user === this.props.currentUser.email ? "Me" : i.user}
                                        </h4>
                                        <p className="card-text small text-muted">
                                            <span className="fe fe-clock"></span> <time>{i.time} ago</time>
                                        </p>
                                    </div>
                                </div>
                            </div>
                            <div className="card-body p-0">
                                <div className="card">
                                    <div className="card-body">
                                        <div className="row align-items-center">
                                            <div className="col">
                                                <h6 className="card-title text-uppercase text-muted mb-2">
                                                    Score
                                                </h6>
                                                <div className="row align-items-center no-gutters">
                                                    <div className="col-auto">
                                                        <span className="h2 mr-2 mb-0">
                                                            {i.score}/20
                                                        </span>
                                                    </div>
                                                    <div className="col">
                                                        <div className="progress progress-sm">
                                                            <div className="progress-bar" role="progressbar" style={{ width: i.score / 0.2 }} aria-valuenow={i.score / 0.2} aria-valuemin="0" aria-valuemax="100"></div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="col-auto">
                                                <span className="h2 fe fe-clipboard text-muted mb-0"></span>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="card mt-2">
                                    <div className="card-body">
                                        <div className="row align-items-center">
                                            <div className="col">
                                                <h6 className="card-title text-uppercase text-muted mb-2">
                                                    Category
                                                </h6>
                                                <div className="row d-flex justify-content-between no-gutters">
                                                    <div className="col-auto">
                                                        <span className="h3 mr-2 mb-0">
                                                            <Link to="/" style={{ textDecoration: "none" }}>{ i.category }</Link>
                                                        </span>
                                                    </div>
                                                    <div className="col-auto">
                                                        <span className="h2 mr-2 mb-0">
                                                            <img src={ i.category_img } alt={i.category} style={{ height: '80px' }} />
                                                        </span>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <Link to={"/test/" + i.id + "/result"} className="btn btn-outline-info m-2 mt-0"><i className="fas fa-star-half-alt"></i>&nbsp;Result</Link>
                                </div>
                            </div>
                        </div>
                    </div>
                );
            });
        }
    }
    render() {
        //console.log(this.state);
        //console.log(this.props)
        // if (!this.props.isLoggedIn) {
        //     return (
        //         <></>
        //     )
        //} else {
            if(!this.props.newsFeed) return <></>
            var activities = this.renderActivities();
            var user_info = this.props.newsFeed.user_info;
            return (
                <div>
                    <div className="container mt-6">
                        <div className="information">
                            <div className="row">
                                <div className="col-auto">
                                    <div className="anh mt-5">
                                        <img src={user_info.avatar_url} alt="image" className="img-responsive" width="60" height="60"></img>
                                    </div>
                                </div>
                                <div className="col mb-3  ml-md-n2">
                                    <div className="mt-5">
                                        <p>{user_info.name}</p>
                                    </div>
                                    <div className="mt-2">
                                        <p><i className="far fa-envelope mt-2 mr-2"></i>{user_info.email}</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <hr></hr>
                    </div>
                    <div className="container mt-4">
                        <div className="row">
                            <div className="col-md-8">
                                {activities}
                            </div>
                            <div className="col-md-4">
                                <div className="table-responsive">
                                    <table className="table table-striped border">
                                        <tbody>
                                            <tr>
                                                <td>Joined</td>
                                                <td>{user_info.created_at}</td>
                                            </tr>
                                            <tr>
                                                <td>Learnt</td>
                                                <td>
                                                    <Link to="/learnt_words" className="badge badge-pill badge-primary">Words <span className="badge badge-light">{user_info.total_learnt_words}</span></Link>
                                                </td>
                                            </tr>
                                            <tr>
                                                <td>Following</td>
                                                <td>
                                                    <Link to={"/" + this.props.currentUser.id + "/following"} className="badge badge-pill badge-success">Users <span className="badge badge-light">{user_info.total_following}</span></Link>
                                                </td>
                                            </tr>
                                            <tr>
                                                <td>Followers</td>
                                                <td>
                                                    <Link to={"/" + user_info.id + "/followers"} className="badge badge-pill badge-info">Users <span className="badge badge-light">{user_info.total_followers}</span> </Link>
                                                </td>
                                            </tr>
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                        </div>
                    </div>
                    <hr></hr>
                </div>
            );
        }

    //}
}
const mapStateToProps = (state /*, ownProps*/) => {
    //console.log(state);
    return {
        currentUser: state.auth.currentUser,
        isLoggedIn: state.auth.isLoggedIn,
        newsFeed: state.user.newsFeed
    }
}
const mapDispatchToProps = dispatch => ({
    changeLoadingStatus: (status) => dispatch(changeLoadingStatus(status)),
    getNewsFeed: (token, user_id) => dispatch(getNewsFeed(token, user_id))
});

export default connect(mapStateToProps, mapDispatchToProps)(NewsFeed);