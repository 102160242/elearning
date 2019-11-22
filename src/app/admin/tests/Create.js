import React from 'react';
import { useState, useEffect } from 'react';
import { createTest, getOptions, clearResponse } from '../../../actions/admin/tests';
import { useDispatch, useSelector } from 'react-redux';
import { changeLoadingStatus } from '../../../actions/app';

export default function Tests_Create(props) {

  const [user, setUser] = useState(1);
  const [category, setCategory] = useState(1);

  const dispatch = useDispatch();
  const testsData = useSelector(state => state.admin.tests);

  const isLoggedIn = useSelector(state => state.auth.isLoggedIn);

  // Thiet lap ban dau
  useEffect(() => {
    document.title = 'Create new Test';
    dispatch(clearResponse());
    return () => {
      dispatch(changeLoadingStatus(true));
      dispatch(clearResponse());
    }
  }, []);

  // Xu ly ket qua Submit
  useEffect(() => {
    if(testsData.status == "success" && testsData.redirect)
    {
      props.history.push("/admin/tests"); // Chuyen huong ve tests sau khi Submit thanh cong
    }
    return () => {
      dispatch(clearResponse());
    }
  }, [testsData.redirect]);

  // Doi qua trinh xac thuc
  useEffect(() => {
    if(isLoggedIn == true)
    {
      var token = localStorage.getItem("token");
      dispatch(getOptions(token)); // Lay List options
    }
  }, [isLoggedIn]);

  const categoryHandler = (e) =>
  {
    setCategory(e.target.value);
  }
  const userHandler = (e) =>
  {
    setUser(e.target.value);
  }
  const formSubmitHandler = (e) => 
  {
    e.preventDefault();
    var data = {
      category_id: category,
      user_id: user
    }
    var token = localStorage.getItem("token");
    dispatch(createTest(token, data));
  }
  return (
    <div className="container-fluid">
      <div className="row justify-content-center">
        <div className="col-md-6">
          <h1>Create new Test</h1>
          <form className="mt-4" onSubmit={formSubmitHandler}>
            <div className="form-group">
              <label htmlFor="user">User</label>
              <select className="custom-select" value={user} onChange={userHandler} title="User">
                { testsData.options.users && testsData.options.users.map((i) => {
                  return(
                    <option value={i.id} key={i.id}>{i.email}</option>
                  )
                })}
              </select>
            </div>

            <div className="form-group">
              <label htmlFor="category">Category</label>
              <select className="custom-select" id="category" aria-describedby="categoryHelp" value={category} onChange={categoryHandler} required>
              { testsData.options.categories && testsData.options.categories.map((i) => {
                  return(
                    <option value={i.id} key={i.id}>{i.name}</option>
                  )
                })}
              </select>
              <small id="categoryHelp" className="form-text text-muted">Choose the category which the test belong to</small>
            </div>
            <button type="submit" className="btn btn-primary">Submit</button>
          </form>
        </div>
      </div>
    </div>
  )
}