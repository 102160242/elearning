import React from 'react';

class NewsFeed extends React.Component {
    constructor(props) {
        super(props);
        this.state = {  };
    }
    render() {
        return (
            <div>
                <div className="container mt-6">
                   <div className="information">
                        <div className="row">
                            <div className="col-auto">
                                <div className="anh mt-5">
                                    <img src="https://www.thepaintedturtle.org/sites/main/files/main-images/camera_lense_0.jpeg" alt="image" class="img-responsive" width="60" height="60"></img>  
                                </div>
                            </div>
                            <div className="col mb-3  ml-md-n2">
                               <div className="mt-5">
                                   <a>David Smit</a>
                               </div>
                               <div className="mt-2">
                                <i class="far fa-envelope mt-2"></i> david.s@loop.com
                               </div>
                            </div>
                        </div>
                   </div>
                   <hr></hr>
                </div>
                <div className="container mt-4">
                    <div className="row">
                        <div className="col-md-8">
                            <p>There is no activity to show</p>
                        </div>
                        <div className="col-md-4">
                            <table className="table-responsive">
                                <table className="table table-striped border">
                                    <tbody>
                                        <tr>
                                            <td>Joined</td>
                                            <td>2019-10-23 14:42:23 UTC</td>
                                        </tr>
                                        <tr>
                                            <td>Learnt</td>
                                            <td>
                                                <a href="#" class="badge badge-pill badge-primary">Words <span class="badge badge-light">9</span> </a>
                                            </td>
                                        </tr>
                                        <tr>
                                            <td>Following</td>
                                            <td>
                                                <a href="#" class="badge badge-pill badge-success">Users <span class="badge badge-light">5</span> </a>
                                            </td>
                                        </tr>
                                        <tr>
                                            <td>Followers</td>
                                            <td>
                                                <a href="#" class="badge badge-pill badge-info">Users <span class="badge badge-light">13</span> </a>
                                            </td>
                                        </tr>
                                    </tbody>
                                </table>
                            </table>
                        </div>
                    </div>
                </div>
                <hr></hr>
            </div>
        );
    }
}

export default NewsFeed;