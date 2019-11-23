import React from 'react';
import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { changeLoadingStatus } from '../../../actions/app';
import { getTestInfo } from '../../../actions/admin/tests';
import { Link } from 'react-router-dom';

export default function Tests_Show(props) {
  //const [count, setCount] = useState(0)
  const dispatch = useDispatch();
  const auth = useSelector(state => state.auth);
  const testsData = useSelector(state => state.admin.tests);
  var test_id = props.match.params.test_id;
  var token = localStorage.getItem('token');
  var score = testsData.test.score;
  const [question_content, setQuestionContent] = useState("");
  const [answer_content, setAnswerContent] = useState("");
  const [category_name, setCategoryName] = useState("");

  useEffect(() => {
    document.title = 'Show';
    //console.log(props.history.location.search)
    return () => {
      dispatch(changeLoadingStatus(true));
    }
  }, []);

  // Goi khi auth co su thay doi
  useEffect(() => {
    // Neu da xac thuc user hop le
    // console.log(auth.isLoggedIn)
    if (auth.isLoggedIn == true) {
      // Lay danh sach tests
      dispatch(getTestInfo(token, test_id))
    }
    else if (auth.isLoggedIn == false) {
      // Xac thuc that bai, chuyen huong den trang chinh
      props.history.push(process.env.REACT_APP_ROOT_URL);
    }
  }, [auth.isLoggedIn]);

  // Goi khi testsData co su thay doi
  useEffect(() => {
    // Neu load thanh cong 
    if (testsData.test !== 0) {
      setQuestionContent(testsData.question_content);
      setAnswerContent(testsData.answer_content);
      setCategoryName(testsData.category_name);
    }
    if (testsData.status != "") {
      dispatch(changeLoadingStatus(false));
    }
    // console.log(testsData.data.list[0]);
  }, [testsData.test]);
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
                                                    {testsData.test.score}/20
                                                </span>
                                            </div>
                                            <div className="col">
                                                <div className="progress progress-sm">
                                                    <div className="progress-bar" role="progressbar" style={{ width: {score} / 0.2 }} aria-valuenow={{score} / 0.2} aria-valuemin="0" aria-valuemax="100"></div>
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
                                        <span>{testsData.test.category}</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="card mt-4">
                    <div className="card-header">
                        <h4>Test</h4>
                    </div>
                    <div className="card-body">
                        {
                            score === null ? <span className="text-danger">This test haven't been done yet</span> :
                            testsData.test.questions && testsData.test.questions.map((question, qIndex) => {
                                return (
                                    <div className="m-1 border-1" key={qIndex}>
                                        <span className="text-info font-weight-bold">
                                            {(qIndex + 1) + ". " + question.question_content}
                                        </span>
                                        <div className="ml-3">
                                            {
                                                question.answers && question.answers.map((answer, aIndex) => {
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
                          <Link to="/admin/tests" className="mr-3" title="Back"> <button className="btn btn-outline-secondary"> <i className="fas fa-long-arrow-alt-left" ></i> Back </button> </Link>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
);
}
