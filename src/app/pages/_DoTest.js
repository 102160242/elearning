import React from 'react';
import { connect } from 'react-redux';
import { changeLoadingStatus } from '../../actions/app';
import { getTest, submitTest } from '../../actions/test';
import swal from 'sweetalert';

class _DoTest extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            test: [],
            answer_ids: {}
        };
        this.handleSelect = this.handleSelect.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.renderJSX = this.renderJSX.bind(this);
        this.submitTest = this.submitTest.bind(this);
        this.startTimer = this.startTimer.bind(this);
    }
    componentDidMount() {
        document.title = "Do Test";
        // Lay ID user theo params neu truy cap vao duong dan /user_id/newsfeed
        var token = localStorage.getItem("token");
        var id = this.props.match.params.test_id;
        this.props.getTest(token, id).then(() => {
            this.props.changeLoadingStatus(false);
            var display = document.querySelector('#timer');
            this.startTimer(this.props.test.timeLeft, display);
        });
    }
    componentWillUnmount() {
        this.props.changeLoadingStatus(true);
    }
    submitTest()
    {
        var token = localStorage.getItem("token");
        var test_id = this.props.match.params.test_id;
        var data = { "test_id": test_id, "answer_ids": this.state.answer_ids };
        this.props.submitTest(token, data).then(() => {
            if(this.props.status == "success")
            {
                // Redirect den trang xem ket qua sau khi submit test thanh cong
                this.props.history.push("/test/" + test_id + "/result");
            }
        });
    }
    startTimer(duration, display) {
        var timer = duration, minutes, seconds;
        setInterval(() => {
            minutes = parseInt(timer / 60, 10)
            seconds = parseInt(timer % 60, 10);
    
            minutes = minutes < 10 ? "0" + minutes : minutes;
            seconds = seconds < 10 ? "0" + seconds : seconds;
            
            if(timer < 300 && timer > 60) display.className = "text text-warning";
            else if(timer < 60) display.className = "text text-danger";
            
            display.textContent = minutes + ":" + seconds;
            if (--timer < 0) {
                timer = duration;
                // Nop bai 
                this.submitTest();
            }
        }, 1000);
    }
    handleSubmit(e)
    {
        e.preventDefault();
        var checked_questions = Object.keys(this.state.answer_ids).length;
        // Thong bao khi user chua tra loi het 20 cau hoi
        if(checked_questions < 20)
        {
            swal({
                title: "Are you sure?",
                text: "You still have " + (20 - checked_questions) + " question(s) left to answer!",
                icon: "warning",
                buttons: ["Cancel", "Submit anyway!"],
                dangerMode: true,
              })
              .then((willSubmit) => {
                if (willSubmit) {
                    this.submitTest();
                } else {
                  swal("Your test was not submitted, please do the rest!");
                }
              });
        }
        else
        {
            this.submitTest();
        }
    }
    handleSelect(e)
    {
        var array = this.state.answer_ids;
        array[e.target.name] = e.target.value;
        this.setState({
            answer_ids: array
        });
    }
    renderJSX() {
        var content = "";
        if (!this.props.test.length != 0) {
            content = this.props.test && this.props.test.questions && this.props.test.questions.map((question, index) => {
                return (
                    <div className="m-1 border-1" key={question.id}>
                        <span className="text-info font-weight-bold">
                            {(index + 1) + ". " + question.question_content}
                        </span>
                        <div className="ml-3">
                            {question.answers && question.answers.map((answer) => {
                                return (
                                    <div className="form-check" key={answer.id}>
                                        <input type="radio" className="form-check-input" id={"answer_" + answer.id} name={ "question_" + question.id } value={answer.id} onChange={this.handleSelect} />
                                        <label className="form-check-label" htmlFor={"answer_" + answer.id}>{ answer.answer_content }</label>
                                    </div>
                                );
                            })}
                        </div>
                    </div>
                )
            });
        }
        return (
            content
        );
    }
    render() {
        if(this.props.isLoggedIn === false)
        {
            this.props.history.push("/403");
        }
        return (
            <div className="container mt-3 mb-3">
                <form onSubmit={this.handleSubmit}>
                    <div className="card border-bottom-primary">
                        <div className="card-header border-primary">
                            <h5 className="card-header-title">Do your test by answering the questions bellow</h5>
                        </div>
                        <div className="card-body bg-transparent border-primary">
                            <div className="row">
                                <div className="col">
                                    <div className="mb-3 h4 text-right" id="">
                                        <div>Time left <span id="timer">10:00</span> minutes!</div>
                                    </div>
                                    { this.renderJSX() }
                                </div>
                            </div>
                        </div>
                        <div className="card-footer bg-transparent border-primary">
                            <button type="submit" className="btn btn-block btn-outline-success">Submit</button>
                        </div>
                    </div>
                </form>
            </div>
        );
    }
}
const mapStateToProps = (state /*, ownProps*/) => {
    //console.log(state);
    return {
        test: state.test.test,
        isLoggedIn: state.auth.isLoggedIn,
        status: state.test.status
    }
}
const mapDispatchToProps = dispatch => ({
    changeLoadingStatus: (status) => dispatch(changeLoadingStatus(status)),
    getTest: (token, id) => dispatch(getTest(token, id)),
    submitTest: (token, data) => dispatch(submitTest(token, data))
});
export default connect(mapStateToProps, mapDispatchToProps) (_DoTest);