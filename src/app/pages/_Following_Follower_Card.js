import React from 'react';
import {Link} from 'react-router-dom';

class _Following_Follower_Card extends React.Component {
    constructor(props) {
        super(props);
        this.state = {};
        this.getid = this.getid.bind(this);
    }

    getid(){
        var val = this.props.id;
        this.props.fun(val);
    }
    render() {
        return (
            <>
                <div className="col-md-6 col-xl-6">
                    <div className="card shadow-sm mb-4  bg-white">
                        <div className="card-body">
                            <div className="row">
                                <div className="col-auto "> <h1 className="avatar-img rounded-circle"><i className="fas fa-user-circle "></i> </h1></div>
                                <div className="col ml-n2 ">
                                    <h5>{this.props.name}</h5>
                                    <p className="card-text small text-muted mb-1">No test done</p>
                                    <p className="card-text small"><span className="text-default">•</span>Offline</p>
                                </div>
                                <div className=" col-auto">
                                    {
                                        this.props.check ? (
                                            <button className="btn btn-outline-warning" data-toggle="tooltip" title="Unfollow this User" onClick={this.getid}><i className="far fa-eye-slash"></i></button>
                                        ) : (
                                            <button className="btn btn-outline-success" data-toggle="tooltip" title="Follow this User" onClick={this.getid} >  <i className="far fa-eye"></i> </button>
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

export default _Following_Follower_Card;