import React from 'react';

const a =['Nguyen Van A','Nguyen Van b','Nguyen Van C', 'Nguyen Van A','Nguyen Van A','Nguyen Van A','Nguyen Van A', 'Nguyen Van A', 'Nguyen Van A', 'Nguyen Van A']
class Following extends React.Component {
    constructor(props) {
        super(props);
        this.state = {  };
    }
    render() {
        return (
            <>
            <div class="container">
                <div className="row mt-3 d-flex justify-content-between ">
                    <div className="col-sm-4 ">
                        <h3>Total <span class="badge badge-primary p-2">{a.length}</span></h3>
                    </div>
                    <div class="col-md-3">
                        <input class="form-control mr-sm-2 " type="search" placeholder="Search" />
                    </div>
                </div>
                <hr></hr>
                <div className="row d-flex justify-content-start">
                    {a.map(i => {
                        return <>
                            <div className="col-lg-6 col-xl-4">
                                <div className="card shadow-sm mb-3 bg-white">
                                    <div className="card-body">
                                        <div className="row">
                                            <div className="col-auto"> <h1><i class="fas fa-user-circle "></i> </h1></div>
                                            <div className="col ml-n2">
                                                <h4>{i}</h4>
                                                <p className="card-text small text-muted mb-1">No test done</p>
                                                <p className="card-text small"><span className="text-default">•</span>Offline</p>
                                                <button type="button" class="btn btn-outline-info btn-block">Info</button>
                                                <br/>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </>
                    })}
                </div>
            </div>
        </>
        );
    }
}

export default Following;