import React from 'react';
import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { changeLoadingStatus } from '../../../actions/app';
import { getQuestionInfo } from '../../../actions/admin/questions';
import { Link } from 'react-router-dom';

export default function Questions_Show(props) {
  const dispatch = useDispatch();
  const auth = useSelector(state => state.auth);
  const questionsData = useSelector(state => state.admin.questions);
  var question_id = props.match.params.question_id;
  var token = localStorage.getItem('token');

  useEffect(() => {
    document.title = 'Show';
    return () => {
      dispatch(changeLoadingStatus(true));
    }
  }, []);

  // Goi khi auth co su thay doi
  useEffect(() => {
    // Neu da xac thuc user hop le
    // console.log(auth.isLoggedIn)
    if (auth.isLoggedIn == true) {
      // Lay danh sach categories
      dispatch(getQuestionInfo(token, question_id))
    }
    else if (auth.isLoggedIn == false) {
      // Xac thuc that bai, chuyen huong den trang chinh
      props.history.push(process.env.REACT_APP_ROOT_URL);
    }
  }, [auth.isLoggedIn]);

  // Goi khi categoriesData co su thay doi
  useEffect(() => {
    // Neu load thanh cong 
    // console.log(questionsData.question.category_id != null );
    if (questionsData.status != "") {
      dispatch(changeLoadingStatus(false));
    }
    // console.log(categoriesData.data.list[0]);
  }, [questionsData]);

  var data = questionsData.question;
  console.log(data.answers);

  return (
    <div className="container-fluid">
      <div className="row justify-content-center">
        <div className="col-md-6">
          <h1>Question</h1>
          <form className="mt-4" >
            <div className="form-group">
              <label htmlFor="question">Question</label>
              <textarea className="form-control" id="question" aria-describedby="questionHelp" placeholder="Enter the question" required value={data.question_content} />
            </div>

            <div className="form-group">
              <label htmlFor="category">Categories</label>
              <input type="text" class="form-control" id="answer1" value={data.category_name} />
            </div>
            <div className="form-group">
              <label >Answer </label>
              {data.answers && data.answers.map((i, key) => {
                return (
                  <>
                    {
                      i.right_answer ? (
                        <>
                          <div className="form-group">
                            <input type="text" class="form-control" value={i.answer_content} />
                            <div class="form-check form-check">
                              <input class="form-check-input" name="answer" type="radio" checked />
                              <label class="form-check-label" htmlFor="option1">Right Answer</label>
                            </div>
                          </div>
                        </>
                      ) : (<>
                        <div className="form-group">
                          <input type="text" class="form-control" value={i.answer_content} />
                          <div class="form-check form-check">
                            <input class="form-check-input" name="answer" type="radio" />
                            <label class="form-check-label" >Right Answer</label>
                          </div>
                        </div></>)
                    }
                  </>
                )
              })}
            </div>
            <Link to="/admin/questions" className="mr-3" title="Back"> <button className="btn btn-outline-secondary"> <i className="fas fa-long-arrow-alt-left" ></i> Back </button> </Link>
          </form>
        </div>
      </div>
    </div>
  )
}