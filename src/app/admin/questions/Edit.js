import React from 'react';
import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { changeLoadingStatus } from '../../../actions/app';
import { getQuestionInfo, updateQuestion } from '../../../actions/admin/questions';
import ReactDOM from 'react-dom';
import { Link, Redirect } from 'react-router-dom';
import Paginator from '../partials/Paginator';
import queryString from 'query-string';
import swal from 'sweetalert';

export default function Questions_Edit(props) {
  const dispatch = useDispatch();
  const auth = useSelector(state => state.auth);
  const questionsData = useSelector(state => state.admin.questions);
  var question_id = props.match.params.question_id;
  var token = localStorage.getItem('token');

  const [category_name, setCategoryName] = useState("");
  const [question_content, setQuestionContent] = useState("");
  //const [count, setCount] = useState(0)

  // Goi sau khi load trang (~ ComponentDidMount)
  useEffect(() => {
    document.title = 'Edit';
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
      // Lay danh sach questions
      dispatch(getQuestionInfo(token, question_id))
    }
    else if (auth.isLoggedIn == false) {
      // Xac thuc that bai, chuyen huong den trang chinh
      props.history.push(process.env.REACT_APP_ROOT_URL);
    }
  }, [auth.isLoggedIn]);

  // Goi khi questionsData co su thay doi
  useEffect(() => {
    // Neu load thanh cong 
    if (questionsData.data && questionsData.data.list && questionsData.data.list.length != []) {
      setQuestionContent(questionsData.data.list[0].question_content);
      setCategoryName(questionsData.data.list[0].category_name);
    }
    if (questionsData.status != "") {
      dispatch(changeLoadingStatus(false));
    }
     //console.log(questionsData.data.list[0]);
  }, [questionsData]);

  const onChangeHandler = (e) => {
    setQuestionContent(e.target.value);
  }
  const onChangeCategoryNameHandler = (e) => {
    setCategoryName(e.target.value);
  }


  const formSubmitHandler = (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append('question[category_name]', category_name);
    formData.append('question[question_content]', question_content)
    var token = localStorage.getItem("token");
    dispatch(updateQuestion(token, formData, question_id));
  }

  return (
    <div className="container mt-3">
      <div className="row d-flex justify-content-center">
        <div className="col-sm-12 col-md-8">
          <h3>Editing Question</h3>
          <form onSubmit={formSubmitHandler}>
            <div className="form-group">
              <label htmlFor="category_id">Category</label>
              <select className="form-control" type="text" id="category_id" required onChange={onChangeCategoryNameHandler} value={category_name}>
              {questionsData.data.list && questionsData.data.list.map((i) =>
                <option className="form-control" type="text">{i.category_name}</option>
              )}
              </select>
            </div>
            <div className="form-group">
              <label htmlFor="question_content">Question Content</label>
              <input className="form-control" type="text" id="question_content" required onChange={onChangeHandler}/>
              <small id="nameHelp" className="form-text text-muted">You can't not leave this text blank, it's required!</small>
            </div>
            <div className="form-group">
              <Link to="/admin/questions" className="mr-3" title="Submit"></Link>
              <button className="btn btn-success mt-3 mb-3" type="submit" ><i className="far fa-check-circle"></i> Submit</button>
              <Link to="/admin/questions" className="mr-3" title="Back"> <button className="btn btn-outline-secondary"> <i className="fas fa-long-arrow-alt-left"> ></i> Back </button> </Link>
            </div>  
          </form>
        </div>
      </div>
    </div>
  )
}