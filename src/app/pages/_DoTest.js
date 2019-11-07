import React from 'react';
import { connect } from 'react-redux';
import { changeLoadingStatus } from '../../actions/app';

class _DoTest extends React.Component {
    constructor(props) {
        super(props);
        this.state = {  };
    }
    componentDidMount() {
        document.title = "Do Test";
        this.props.changeLoadingStatus(false);
    }
    componentWillUnmount()
    {
        this.props.changeLoadingStatus(true);
    }
    render() {
        return (
            <div>Do Test Page</div>
        );
    }
}

const mapDispatchToProps = dispatch => ({
    changeLoadingStatus: (status) => dispatch(changeLoadingStatus(status))
});
export default connect(null, mapDispatchToProps) (_DoTest);