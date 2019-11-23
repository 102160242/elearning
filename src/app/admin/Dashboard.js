import React from 'react';
import { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { getStatistics } from '../../actions/app';
import { Link } from 'react-router-dom';

export default function Dashboard() {
  //const [count, setCount] = useState(0)
  const dispatch = useDispatch();
  const statistics = useSelector(state => state.app.statistics);

  useEffect(() => {
    document.title = 'Dashboard';
    dispatch(getStatistics());
  }, []);

  useEffect(() => {
    console.log("Da load xong!")
  }, [statistics])
  return (
    <div className="container-fluid">
      <h1>Dashboad</h1>
      <div className="row mt-5">
        <div class="col-md-3 pb-1">
          <div class="card card-inverse bg-inverse h-100 text-center pt-4 p-2 bg-dark">
            <div class="card-block card-title">
              <h1 class="mb-2"><i className="align-middle md_18 material-icons display-2 fas fa-user-friends"></i></h1>
              <h6 class="text-light">{statistics.total_users} Users</h6>
              <Link to="/admin/users" className="btn btn-outline-light mt-3">View All</Link>
            </div>
          </div>
        </div>
        <div class="col-md-3 pb-1">
          <div class="card card-inverse card-primary h-100 text-center pt-4 p-2 bg-info">
            <div class="card-block card-title">
              <h1 class="mb-2"><i class="align-middle md_18 material-icons display-2 fas fa-atlas"></i></h1>
              <h6 class="text-light">{statistics.total_categories} Categories</h6>
              <Link to="/admin/categories" className="btn btn-outline-light mt-3">View All</Link>
            </div>
          </div>
        </div>
        <div class="col-md-3 pb-1">
          <div class="card card-inverse card-primary h-100 text-center pt-4 p-2 bg-success">
            <div class="card-block card-title">
              <h1 class="mb-2"><i class="align-middle md_18 material-icons display-2 far fa-file-word"></i></h1>
              <h6 class="text-light">{statistics.total_words} Words</h6>
              <Link to="/admin/words" className="btn btn-outline-light mt-3">View All</Link>
            </div>
          </div>
        </div>
        <div class="col-md-3 pb-1">
          <div class="card card-inverse card-success h-100 text-center pt-4 p-2 bg-warning">
            <div class="card-block card-title">
              <h1 class="mb-2"><i class="align-middle md_18 material-icons display-2 fas fa-question"></i></h1>
              <h6 class="text-light">{statistics.total_questions} Questions</h6>
              <Link to="/admin/questions" className="btn btn-outline-light mt-3">View All</Link>
            </div>
          </div>
        </div>
        <div class="col-md-3 pb-1">
          <div class="card card-inverse card-success h-100 text-center pt-4 p-2 bg-danger">
            <div class="card-block card-title">
              <h1 class="mb-2"><i class="align-middle md_18 material-icons display-2 fas fa-file-alt"></i></h1>
              <h6 class="text-light">{statistics.total_tests} Tests</h6>
              <Link to="/admin/tests" className="btn btn-outline-light mt-3">View All</Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}