import React from 'react';
import { connect } from 'react-redux';
import ReactDOMServer from 'react-dom/server';
import { follow, unfollow, getFollowers } from '../../actions/user';
import ReactDOM from 'react-dom';
import { Link } from 'react-router-dom';

class _Following_Follower_Card extends React.Component {
    constructor(props) {
        super(props);
        this.state = {};
        this.handleFollowClick = this.handleFollowClick.bind(this);
        this.handleUnFollowClick = this.handleUnFollowClick.bind(this);
        // this.expandBtn = this.expandBtn.bind(this);
        // this.shrinkBtn = this.shrinkBtn.bind(this);
        this.renderBtn = this.renderBtn.bind(this);
    }
    
    handleUnFollowClick()
    {
        var id = this.props.data.id;
        var token = localStorage.getItem('token');
        //console.log(token);
        this.props.unfollow(token, id);
        var btnDiv = document.querySelector("#btn_"+id);
        var btn = this.renderBtn(true, id);
        ReactDOM.render(btn, btnDiv);
        //console.log("From handleFollowCLick")
        //console.log(this.props.followersList)
    }
    
    handleFollowClick()
    {
        // e.target.disabled = true;
        var id = this.props.data.id;
        var token = localStorage.getItem('token');
        //console.log(token);
        this.props.follow(token, id);
        // Test
    
        // this.props.getFollowers(token, 2, "");
        var btnDiv = document.querySelector("#btn_"+id);
        var btn = this.renderBtn(false, id);
        ReactDOM.render(btn, btnDiv);
    }

    // expandBtn(e, isFollowBtn, id)
    // {
    //     //console.log((e.target))
    //     // for(var propName in e.target) {
    //     //     var propValue = e.target[propName]
        
    //     //     console.log(propName,propValue);
    //     // }
    //     //console.log("id la " + id)
    //     if(isFollowBtn) e.target.outerHTML = ReactDOMServer.renderToStaticMarkup(this.renderBtn(isFollowBtn, id, "Follow"));
    //     else e.target.outerHTML = ReactDOMServer.renderToStaticMarkup(this.renderBtn(isFollowBtn, id, "Unfollow"));
    // }
    // shrinkBtn(e, isFollowBtn, id)
    // {
    //     console.log("Mouse Leave!");
    //     //e.target.outerHTML = ReactDOMServer.renderToStaticMarkup(this.renderBtn(true, id, ""));
    //     if(isFollowBtn) e.target.outerHTML = ReactDOMServer.renderToStaticMarkup(this.renderBtn(isFollowBtn, id));
    //     else e.target.outerHTML = ReactDOMServer.renderToStaticMarkup(this.renderBtn(isFollowBtn, id));
    // }
    renderBtn(isFollowBtn, id)
    {
        if(isFollowBtn)
        {
        return <><button className="btn btn-outline-success" onClick={() => {this.handleFollowClick(id)}}  key={id}> <i className="far fa-eye"> </i></button></>
        }
        else
        {
            return <><button className="btn btn-outline-warning" onClick={() => {this.handleUnFollowClick(id)} }  key={id}> <i className="far fa-eye-slash"></i></button></>
        }
    }
    render() {
        var data = this.props.data;
        return (
            <>
                <div className="col-md-6 col-xl-6">
                    <div className="card shadow-sm mb-4  bg-white">
                        <div className="card-body">
                            <div className="row">
                                <div className="col-auto "> <h1 className="avatar-img rounded-circle"><i className="fas fa-user-circle "></i> </h1></div>
                                <div className="col ml-n2 ">
                                    <Link to={"/" + data.id + "/newsfeed"} className="h5" style={{ textDecoration: "none"}}>{data.name}</Link>
                                    <p className="card-text small text-muted mb-1">No test done</p>
                                    <p className="card-text small"><span className="text-default">•</span>Offline</p>
                                </div>
                                <div className=" col-auto" id={"btn_" + data.id}>
                                    {
                                        data.is_following ? (
                                            this.renderBtn(false, data.id)
                                        ) : (
                                            this.renderBtn(true, data.id)
                                        )
                                    }
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </>
        );
    }
}

const mapDispatchToProps = dispatch => ({
    follow: (token, id) => dispatch(follow(token, id)),
    unfollow: (token, id) => dispatch(unfollow(token, id)),
    getFollowers: (token, user_id, params) => dispatch(getFollowers(token, user_id, params)),
})
export default connect(null, mapDispatchToProps)(_Following_Follower_Card);