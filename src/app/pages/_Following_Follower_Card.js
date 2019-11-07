import React from 'react';

class _Following_Follower_Card extends React.Component {
    constructor(props) {
        super(props);
        this.state = {};
    }
    render() {
        return (
            <>
                <div className="col-sm-4 ">
                    <div className="card shadow-sm mb-4  bg-white">
                        <div className="card-body">
                            <div className="row">
                                <div className="col-auto "> <h1><i class="fas fa-user-circle "></i> </h1></div>
                                <div className="col ml-n2">
                                    <h4>{this.props.name}</h4>
                                    <p className="card-text small text-muted mb-1">No test done</p>
                                    <p className="card-text small"><span className="text-default">•</span>Offline</p>
                                    <button type="button" class="btn btn-outline-info btn-block">Info</button>
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