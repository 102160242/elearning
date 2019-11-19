import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { changeLoadingStatus } from '../../actions/app';
import { getNewsFeed } from '../../actions/user';

class NewsFeed extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            name: "",
            email: "",
        };
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.renderActivities = this.renderActivities.bind(this);
    }
    componentDidMount() {
        document.title = "News Feed";
        //console.log("Params: ")
        //console.log(this.props.match.params.user_id)

        // Lay ID user theo params neu truy cap vao duong dan /user_id/newsfeed
        var user_id = this.props.match.params.user_id;
        var token = localStorage.getItem("token");
        this.props.getNewsFeed(token, user_id).then(() => {
            this.props.changeLoadingStatus(false);
        })
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
        if (this.props.newsFeed.timeline && this.props.newsFeed.timeline.length == 0) {
            return <p>There is no activity to show</p>
        }
        else {
            return this.props.newsFeed && this.props.newsFeed.timeline && this.props.newsFeed.timeline.map((i, key) => {
                return (
                    <div class="card mb-2">
                        <div class="card-body">
                            <div class="mb-3">
                                <div class="row align-items-center">
                                    <div class="col-auto">
                                        <Link to={"/" + i.user_id + "/newsfeed"} class="avatar">
                                            <img src={this.props.currentUser.avatar_url} alt="Avatar" class="avatar-img rounded-circle" style={{ height: "50px" }} />
                                        </Link>
                                    </div>
                                    <div class="col ml-n2">
                                        <h4 class="card-title mb-1">
                                            {i.user == this.props.currentUser.email ? "Me" : i.user}
                                        </h4>
                                        <p class="card-text small text-muted">
                                            <span class="fe fe-clock"></span> <time>{i.time} ago</time>
                                        </p>
                                    </div>
                                </div>
                            </div>
                            <div className="card-body p-0" key={key}>
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
                                    <Link to={"/test/" + i.id + "/result"} className="btn btn-outline-info m-2 mt-0"><i class="fas fa-star-half-alt"></i>&nbsp;Result</Link>
                                </div>
                            </div>
                        </div>
                    </div>
                );
            });
        }
    }
    render() {

        console.log(this.props.newsFeed)
        if (!this.props.isLoggedIn) {
            return (
                <></>
            )
        } else {
            var activities = this.renderActivities();
            return (
                <div>
                    <div className="container mt-6">
                        <div className="information">
                            <div className="row">
                                <div className="col-auto">
                                    <div className="anh mt-5">
                                        <img src={this.props.currentUser.avatar_url} alt="image" className="img-responsive" width="60" height="60"></img>
                                    </div>
                                </div>
                                <div className="col mb-3  ml-md-n2">
                                    <div className="mt-5">
                                        <p>{this.props.currentUser.name}</p>
                                    </div>
                                    <div className="mt-2">
                                        <p><i className="far fa-envelope mt-2 mr-2"></i>{this.props.currentUser.email}</p>
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
                                                <td>{this.props.currentUser.created_at}</td>
                                            </tr>
                                            <tr>
                                                <td>Learnt</td>
                                                <td>
                                                    <Link to="/learnt_words" className="badge badge-pill badge-primary">Words <span className="badge badge-light">{this.props.currentUser.total_learnt_words}</span></Link>
                                                </td>
                                            </tr>
                                            <tr>
                                                <td>Following</td>
                                                <td>
                                                    <Link to={"/" + this.props.currentUser.id + "/following"} className="badge badge-pill badge-success">Users <span className="badge badge-light">{this.props.currentUser.total_following}</span></Link>
                                                </td>
                                            </tr>
                                            <tr>
                                                <td>Followers</td>
                                                <td>
                                                    <Link to={"/" + this.props.currentUser.id + "/followers"} className="badge badge-pill badge-info">Users <span className="badge badge-light">{this.props.currentUser.total_followers}</span> </Link>
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

    }
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