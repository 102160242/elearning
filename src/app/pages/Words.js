import React from 'react';
import { connect } from 'react-redux';
import { changeLoadingStatus } from '../../actions/app';

class Words extends React.Component {
    constructor(props) {
        super(props);
        this.state = {  };
    }
    componentDidMount() {
        document.title = "Words";
        this.props.changeLoadingStatus(false);
    }
    componentWillUnmount()
    {
        this.props.changeLoadingStatus(true);
    }
    render() {
        return (
            <div className="container">
                <div className="row d-flex justity-content-center mt-5">
                    <div className="col-md-8">
                        <div className="card border-bottom-primary mb-3">
                            <div className="card-header bg-transparent border-primary">
                                <h2>Words List of Categories</h2>
                            </div>
                            <div className = "row">
                                <div className="col-12">
                                    <div className="card-body">
                                        <div className="col-sm-6">
                                            <h5 className="card-title text-info d-inline">run</h5>
                                            <p className="text-muted d-inline">(verb)</p>
                                            <p className="text-muted">/rʌn/</p>
                                            <p>chạy</p>
                                        </div>
                                        <div className="col-sm-6">
                                            <img className="card-img-top img-thumbnail" src="https://hips.hearstapps.com/hmg-prod.s3.amazonaws.com/images/morning-exercise-royalty-free-image-534609714-1558470117.jpg?resize=480:*"></img>
                                        </div>
                                        <button className="btn btn-success">Check as Learnt</button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="col-md-4">
                        <div className="card border-bottom-success mb-3">
                            <div className="card-header bg-transparent border-success">
                                <h2>Filter and Search</h2>
                            </div>
                            <div class="card-body">
                            <input type="text" name="page" value="1" hidden="">
                                    <div class="form-group">
                                        <label class="" for="search_key">Search</label>
                                        <input type="text" class="form-control" id="search_key" name="search_key" value="" placeholder="For example: juxtaposition"/>
                                    </div>
                                    <div class="form-group">
                                        <label class="my-1 mr-2" for="filter">Filter</label>
                                        <select class="custom-select" id="filter" name="filter">
                                            <option value="all">All</option>
                                            <option value="learnt">Learnt Words</option>
                                            <option value="unlearnt">Unlearnt Words</option>
                                        </select>
                                    </div>
                                    <div class="form-group">
                                        <label class="my-1 mr-2" for="order">Order</label>
                                        <select class="custom-select" id="order" name="order">
                                            <option value="az">A-Z</option>
                                            <option value="za">Z-A</option>
                                        </select>
                                    </div>
                                    <button id="search" class="btn btn-primary mb-2">Submit</button>
                                </input>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

const mapDispatchToProps = dispatch => ({
    changeLoadingStatus: (status) => dispatch(changeLoadingStatus(status))
});
export default connect(null, mapDispatchToProps) (Words);