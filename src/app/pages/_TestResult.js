import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { changeLoadingStatus } from '../../actions/app';
import { getTestResult, createNewTest } from '../../actions/test';

class _TestResult extends React.Component {
    constructor(props) {
        super(props);
        this.state = {};
        this.handleClick = this.handleClick.bind(this);
    }
    componentDidMount() {
        document.title = "Test Result";
        var test_id = this.props.match.params.test_id;
        var token = localStorage.getItem("token");
        this.props.getTestResult(token, test_id).then(() => {
            this.props.changeLoadingStatus(false);
        });
    }
    componentWillUnmount() {
        this.props.changeLoadingStatus(true);
    }
    handleClick()
    {
        var token = localStorage.getItem("token");
        var category_id = this.props.test.category_id;
        this.props.createNewTest(token, category_id).then(() => {
            // Neu tao thanh cong thi chuyen huong sang bai test moi
            if(this.props.status === "success")
            {
                console.log(this.props.test);
                this.props.history.push("/test/" + this.props.test.id + "/do");
            }
        });
    }
    render() {
        return (
            <div className="container mb-2">
                <div className="row d-flex justify-content-center mt-5">
                    <div className="">
                        <div className="card">
                            <div className="card-header">
                                <h4>Test Result</h4>
                            </div>
                            <div className="card-body">
                                <div className="card">
                                    <div className="card-body">
                                        <div className="row align-items-center">
                                            <div className="col">
                                                <h6 className="card-title text-uppercase text-muted mb-2">
                                                    Score
                                                </h6>
                                                <div className="row align-items-center no-gutters">
                                                    <div className="col-auto">
                                                        <span className="h2 mr-2 mb-0">
                                                            {this.props.test.score}/20
                                                        </span>
                                                    </div>
                                                    <div className="col">
                                                        <div className="progress progress-sm">
                                                            <div className="progress-bar" role="progressbar" style={{ width: this.props.score / 0.2 }} aria-valuenow={this.props.score / 0.2} aria-valuemin="0" aria-valuemax="100"></div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="col-auto">
                                                <span className="h2 fe fe-clipboard text-muted mb-0"></span>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="card mt-2">
                                    <div className="card-body">
                                        <div className="row align-items-center">
                                            <div className="col">
                                                <h6 className="card-title text-uppercase text-muted mb-2">
                                                    Category
                                                </h6>
                                                <div className="row d-flex justify-content-between no-gutters">
                                                    <div className="col-auto">
                                                        <span className="h3 mr-2 mb-0">
                                                            <Link to="/" style={{ textDecoration: "none" }}>{this.props.test.category}</Link>
                                                        </span>
                                                    </div>
                                                    <div className="col-auto">
                                                        <span className="h2 mr-2 mb-0">
                                                            <img src={ this.props.test.category_img } alt={ this.props.test.category } style={{ height: '80px'}}/>
                                                        </span>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="col-auto">
                                                <h6 className="card-title text-uppercase text-muted mb-2">
                                                    Tested Time
                                                </h6>
                                                <div className="row align-items-center no-gutters">
                                                    <div className="col-auto">
                                                        <span className="h3 mr-2 mb-0">
                                                            {this.props.test.created_at}
                                                        </span>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="card mt-4">
                            <div className="card-header">
                                <h4>Your Test</h4>
                            </div>
                            <div className="card-body">
                                {
                                    this.props.test && this.props.test.questions && this.props.test.questions.map((question, qIndex) => {
                                        return (
                                            <div className="m-1 border-1" key={qIndex}>
                                                <span className="text-info font-weight-bold">
                                                    {(qIndex + 1) + ". " + question.question_content}
                                                </span>
                                                <div className="ml-3">
                                                    {
                                                        question && question.answers && question.answers.map((answer, aIndex) => {
                                                            var checked = "";
                                                            var textClass = "";
                                                            if (question.chosen_answer_id === answer.id) checked = "checked";
                                                            if (answer.right_answer) textClass = "text-success";
                                                            return (
                                                                <div className="form-check" key={aIndex}>
                                                                    <label className="form-check-label">
                                                                        <input type="radio" className="form-check-input" disabled checked={`${checked}`} /><span className={`${textClass}`} >{answer.answer_content}</span>
                                                                    </label>
                                                                </div>
                                                            );
                                                        })
                                                    }
                                                </div>
                                            </div>
                                        );
                                    })
                                }
                                <div className="mt-4">
                                    <button className="btn btn-outline-success btn-block" onClick={ this.handleClick }>Do another Test</button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}
const mapStateToProps = (state /*, ownProps*/) => {
    //console.log(state);
    return {
        test: state.test.test,
        status: state.test.status
    }
}
const mapDispatchToProps = dispatch => ({
    changeLoadingStatus: (status) => dispatch(changeLoadingStatus(status)),
    getTestResult: (token, test_id) => dispatch(getTestResult(token, test_id)),
    createNewTest: (token, category_id) => dispatch(createNewTest(token, category_id))
});
export default connect(mapStateToProps, mapDispatchToProps) (_TestResult);