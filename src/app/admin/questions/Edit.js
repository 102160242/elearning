import React from 'react';
import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { changeLoadingStatus } from '../../../actions/app';
import { getQuestionInfo, updateQuestion, getOptions } from '../../../actions/admin/questions';
import { Link } from 'react-router-dom';

export default function Questions_Show(props) {
  const dispatch = useDispatch();
  const auth = useSelector(state => state.auth);
  const questionsData = useSelector(state => state.admin.questions);
  var question_id = props.match.params.question_id;
  var token = localStorage.getItem('token');

  const [question, setQuestion] = useState("");
  const [answers, setAnswers] = useState([
    { answer_content: "", right_answer: true },
    { answer_content: "", right_answer: false },
    { answer_content: "", right_answer: false },
    { answer_content: "", right_answer: false }
  ]);
  const [category, setCategory] = useState(0);

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
      dispatch(getQuestionInfo(token, question_id));
      dispatch(getOptions(token));
    }
    else if (auth.isLoggedIn == false) {
      // Xac thuc that bai, chuyen huong den trang chinh
      props.history.push(process.env.REACT_APP_ROOT_URL);
    }
  }, [auth.isLoggedIn]);

  useEffect(() => {
    // console.log("Thay doi usser Data")
    // console.log(usersData)
    if(questionsData.redirect)
    {
      props.history.push("/admin/questions");
    }
  }, [questionsData.redirect]);

  // Goi khi categoriesData co su thay doi
  useEffect(() => {
    // Neu load thanh cong 
    // console.log(questionsData.question);
    // console.log(questionsData.question.category_id != null );
    if (questionsData.question.category_id != null) {
      setQuestion(questionsData.question.question_content);
      setAnswers(questionsData.question.answers);
      setCategory(questionsData.question.category_id);
      for(var i = 1; i <= 4; i++)
      {
        document.querySelector("#answer" + i).value = questionsData.question.answers[i - 1]["answer_content"];
        document.querySelector("#option" + i).checked = questionsData.question.answers[i - 1]["right_answer"];
      }
    }
    if (questionsData.status != "") {
      dispatch(changeLoadingStatus(false));
    }
    // console.log(categoriesData.data.list[0]);
  }, [questionsData]);

  // console.log(answers[0].right_answer)
  var data = questionsData.question;
  const questionHandler = (e) => {
    setQuestion(e.target.value);
  }
  const categoryHandler = (e) => {
    setCategory(e.target.value);
  }
  const answerHandler = (e) => {
    var index = parseInt(e.target.id.charAt(6), 10) - 1;
    var new_answers = answers;
    new_answers[index]["answer_content"] = e.target.value;
    setAnswers(new_answers);
  }
  const rightAnswerHandler = (e) => {
    var index = parseInt(e.target.id.charAt(6), 10) - 1;
    var new_answers = answers;
    for (var i = 0; i < 4; i++) {
      new_answers[i].right_answer = false;
    }
    new_answers[index].right_answer = true;
    // console.log(new_answers)
    setAnswers(new_answers);
  }
  console.log(answers)
  const formSubmitHandler = (e) => {
    e.preventDefault();
    var formData = {
      question_content: question,
      category_id: category,
      answers: answers
    }
    var token = localStorage.getItem("token");
    dispatch(updateQuestion(token, formData, question_id));
  }

  return (
    <div className="container-fluid">
      <div className="row justify-content-center">
        <div className="col-md-6">
          <h1>Edit Question</h1>
          <form className="mt-4" onSubmit={formSubmitHandler}>
            <div className="form-group">
              <label htmlFor="question">Question</label>
              <textarea className="form-control" id="question" aria-describedby="questionHelp" placeholder="Enter the question" required value={question} onChange={questionHandler} />
              <small id="questionHelp" className="form-text text-muted">Enter your question content here!</small>
            </div>

            <div className="form-group">
              <label htmlFor="category">Categories</label>
              <select className="custom-select" id="category" aria-describedby="categoryHelp" required value={category} onChange={categoryHandler}>
                {questionsData.options.categories && questionsData.options.categories.map((i) => {
                  return (
                    <option value={i.id} key={i.id}>{i.name}</option>
                  )
                })}
              </select>
              <small id="categoryHelp" className="form-text text-muted">Choose the category which the question belong to</small>
            </div>

            <div className="form-group">
              <label htmlFor="answer1">Answer 1</label>
              <input type="text" class="form-control" id="answer1" placeholder="Answer 1" onChange={answerHandler} />
              <div class="form-check form-check">
                <input class="form-check-input" name="answer" type="radio" id="option1" onChange={rightAnswerHandler} />
                <label class="form-check-label" htmlFor="option1">Right Answer</label>
              </div>
            </div>

            <div className="form-group">
              <label htmlFor="answer2">Answer 2</label>
              <input type="text" class="form-control" id="answer2" placeholder="Answer 2" onChange={answerHandler}/>
              <div class="form-check form-check">
                <input class="form-check-input" name="answer" type="radio" id="option2" onChange={rightAnswerHandler} />
                <label class="form-check-label" htmlFor="option2">Right Answer</label>
              </div>
            </div>

            <div className="form-group">
              <label htmlFor="answer3">Answer 3</label>
              <input type="text" class="form-control" id="answer3" placeholder="Answer 3" onChange={answerHandler} />
              <div class="form-check form-check">
                <input class="form-check-input" name="answer" type="radio" id="option3" onChange={rightAnswerHandler} />
                <label class="form-check-label" htmlFor="option3">Right Answer</label>
              </div>
            </div>

            <div className="form-group">
              <label htmlFor="answer4">Answer 4</label>
              <input type="text" class="form-control" id="answer4" placeholder="Answer 4" onChange={answerHandler} value={answers[3].answer_content} />
              <div class="form-check form-check">
                <input class="form-check-input" name="answer" type="radio" id="option4" onChange={rightAnswerHandler} />
                <label class="form-check-label" htmlFor="option4">Right Answer</label>
              </div>
            </div>
            <button className="btn btn-success mt-3 mb-3" type="submit" ><i className="far fa-check-circle"></i> Submit</button>
            <Link to="/admin/questions" className="mr-3" title="Back"> <button className="btn btn-outline-secondary"> <i className="fas fa-long-arrow-alt-left" ></i> Back </button> </Link>
          </form>
        </div>
      </div>
    </div>
  )
}