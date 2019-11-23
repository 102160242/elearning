import React from 'react';
import { useState, useEffect } from 'react';
import { createQuestion, getOptions, clearResponse } from '../../../actions/admin/questions';
import { useDispatch, useSelector } from 'react-redux';
import { changeLoadingStatus } from '../../../actions/app';

export default function Questions_Create(props) {

  const [question, setQuestion] = useState("");
  const [answers, setAnswers] = useState([ 
    { answer_content: "", right_answer: true },
    { answer_content: "", right_answer: false },
    { answer_content: "", right_answer: false },
    { answer_content: "", right_answer: false }
  ]);
  const [category, setCategory] = useState(0);

  const dispatch = useDispatch();
  const questionsData = useSelector(state => state.admin.questions);

  const isLoggedIn = useSelector(state => state.auth.isLoggedIn);

  // Thiet lap ban dau
  useEffect(() => {
    document.title = 'Create new Question';
    dispatch(clearResponse());
    return () => {
      dispatch(changeLoadingStatus(true));
      dispatch(clearResponse());
    }
  }, []);

  // Xu ly ket qua Submit
  useEffect(() => {
    if (questionsData.status == "success" && questionsData.redirect) {
      props.history.push("/admin/questions"); // Chuyen huong ve questions sau khi Submit thanh cong
    }
    return () => {
      dispatch(clearResponse());
    }
  }, [questionsData.redirect]);

  // Doi qua trinh xac thuc
  useEffect(() => {
    if (isLoggedIn == true) {
      var token = localStorage.getItem("token");
      dispatch(getOptions(token)); // Lay List options
    }
  }, [isLoggedIn]);

  const questionHandler = (e) => {
    setQuestion(e.target.value);
  }
  const categoryHandler = (e) => {
    setCategory(e.target.value);
  }
  const answerHandler = (e) => 
  {
    var index = parseInt(e.target.id.charAt(6), 10) - 1;
    var new_answers = answers;
    new_answers[index]["answer_content"] = e.target.value;
    setAnswers(new_answers);
  }
  const rightAnswerHandler = (e) =>
  {
    var index = parseInt(e.target.id.charAt(6), 10) - 1;
    var new_answers = answers;
    for(var i = 0; i < 4; i++)
    {
      new_answers[i]["right_answer"] = (i === index);
    }
    setAnswers(new_answers);
  }
  const formSubmitHandler = (e) => {
    e.preventDefault();
    var formData = {
      question_content: question,
      category_id: category,
      answers: answers
    }
    var token = localStorage.getItem("token");
    dispatch(createQuestion(token, formData));
  }
  return (
    <div className="container-fluid">
      <div className="row justify-content-center">
        <div className="col-md-6">
          <h1>Create new Question</h1>
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
              <input type="text" className="form-control" id="answer1" placeholder="Answer 1" onChange={answerHandler} />
              <div className="form-check form-check">
                <input className="form-check-input" name="answer" type="radio" id="option1" onChange={rightAnswerHandler} checked />
                <label className="form-check-label" htmlFor="option1">Right Answer</label>
              </div>
            </div>

            <div className="form-group">
              <label htmlFor="answer2">Answer 2</label>
              <input type="text" className="form-control" id="answer2" placeholder="Answer 2" onChange={answerHandler}/>
              <div className="form-check form-check">
                <input className="form-check-input" name="answer" type="radio" id="option2" onChange={rightAnswerHandler} />
                <label className="form-check-label" htmlFor="option2">Right Answer</label>
              </div>
            </div>

            <div className="form-group">
              <label htmlFor="answer3">Answer 3</label>
              <input type="text" className="form-control" id="answer3" placeholder="Answer 3" onChange={answerHandler}/>
              <div className="form-check form-check">
                <input className="form-check-input" name="answer" type="radio" id="option3" onChange={rightAnswerHandler} />
                <label className="form-check-label" htmlFor="option3">Right Answer</label>
              </div>
            </div>

            <div className="form-group">
              <label htmlFor="answer4">Answer 4</label>
              <input type="text" className="form-control" id="answer4" placeholder="Answer 4" onChange={answerHandler}/>
              <div className="form-check form-check">
                <input className="form-check-input" name="answer" type="radio" id="option4" onChange={rightAnswerHandler} />
                <label className="form-check-label" htmlFor="option4">Right Answer</label>
              </div>
            </div>

            <button type="submit" className="btn btn-primary">Submit</button>
          </form>
        </div>
      </div>
    </div>
  )
}