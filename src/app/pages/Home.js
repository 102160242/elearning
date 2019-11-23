import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { changeLoadingStatus, getStatistics } from '../../actions/app';

class Home extends React.Component {
    constructor(props) {
        super(props);
        this.state = {};
    }
    componentDidMount() {
        document.title = 'E-Learning System';
        this.props.getStatistics().then(() => {
            this.props.changeLoadingStatus(false);
        })
    }
    componentWillUnmount() {
        this.props.changeLoadingStatus(true);
    }
    render() {
        return (
            <div className="container-fluid p-0">
                <header className="masthead text-white text-center">
                    <div className="overlay"></div>
                    <div className="container">
                        <div className="row">
                            <div className="col-xl-9 mx-auto">
                                <h1 className="mb-5">Learn words & remember them in the fastest way with us!</h1>
                            </div>
                            <div className="col-md-10 col-lg-8 col-xl-7 mx-auto">
                                <Link to="/categories" className="btn btn-block btn-lg btn-primary">Start Learning!</Link>
                            </div>
                        </div>
                        <div class="row mt-5" style={{ fontSize: "1rem" }}>
                            <div class="col-md-3 pb-1">
                                <div class="card card-inverse bg-inverse h-100 text-center pt-4 p-2 bg-dark">
                                    <div class="card-block card-title">
                                        <h1 class="mb-2"><i className="align-middle md_18 material-icons display-2 fas fa-user-friends"></i></h1>
                                        <h6 class="text-light">{this.props.statistics.total_users} Users</h6>
                                    </div>
                                </div>
                            </div>
                            <div class="col-md-3 pb-1">
                                <div class="card card-inverse card-primary h-100 text-center pt-4 p-2 bg-info">
                                    <div class="card-block card-title">
                                        <h1 class="mb-2"><i class="align-middle md_18 material-icons display-2 fas fa-atlas"></i></h1>
                                        <h6 class="text-light">{this.props.statistics.total_categories} Categories</h6>
                                    </div>
                                </div>
                            </div>
                            <div class="col-md-3 pb-1">
                                <div class="card card-inverse card-primary h-100 text-center pt-4 p-2 bg-success">
                                    <div class="card-block card-title">
                                        <h1 class="mb-2"><i class="align-middle md_18 material-icons display-2 far fa-file-word"></i></h1>
                                        <h6 class="text-light">{this.props.statistics.total_words} Words</h6>
                                    </div>
                                </div>
                            </div>
                            <div class="col-md-3 pb-1">
                                <div class="card card-inverse card-success h-100 text-center pt-4 p-2 bg-warning">
                                    <div class="card-block card-title">
                                        <h1 class="mb-2"><i class="align-middle md_18 material-icons display-2 fas fa-question"></i></h1>
                                        <h6 class="text-light">{this.props.statistics.total_questions} Questions</h6>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </header>
            </div>
        );
    }
}

const mapDispatchToProps = dispatch => ({
    changeLoadingStatus: (status) => dispatch(changeLoadingStatus(status)),
    getStatistics: () => dispatch(getStatistics())
});
const mapStateToProps = (state /*, ownProps*/) => {
    return {
        statistics: state.app.statistics,
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(Home);