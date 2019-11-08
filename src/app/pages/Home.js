import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { changeLoadingStatus } from '../../actions/app';

class Home extends React.Component {
    constructor(props) {
        super(props);
        this.state = {};
    }
    componentDidMount() {
        this.props.changeLoadingStatus(false);
        document.title = 'E-Learning System';
    }
    componentWillUnmount()
    {
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
                    </div>
                </header>
            </div>
        );
    }
}

const mapDispatchToProps = dispatch => ({
    changeLoadingStatus: (status) => dispatch(changeLoadingStatus(status))
});

export default connect(null, mapDispatchToProps) (Home);