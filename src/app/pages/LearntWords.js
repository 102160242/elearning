import React from 'react';
import { connect } from 'react-redux';
import { changeLoadingStatus } from '../../actions/app';

class LearntWords extends React.Component {
    constructor(props) {
        super(props);
        this.state = {  };
    }
    componentDidMount() {
        document.title = "Learnt Words";
        this.props.changeLoadingStatus(false);
    }
    render() {
        return (
            <div>Learnt Words Page</div>
        );
    }
}

const mapDispatchToProps = dispatch => ({
    changeLoadingStatus: (status) => dispatch(changeLoadingStatus(status))
});

export default connect(null, mapDispatchToProps) (LearntWords);