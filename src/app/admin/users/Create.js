import React from 'react';
import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { changeLoadingStatus } from '../../../actions/app';
import { createUser, clearResponse } from '../../../actions/admin/users';

export default function Users_Create(props) {

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordConfirmation, setPasswordConfrimation] = useState("");
  const dispatch = useDispatch();
  const requestStatus = useSelector(state => state.admin.users.status);

  useEffect(() => {
    document.title = 'Create new User';
    return () => {
      dispatch(changeLoadingStatus(true));
    }
  }, []);

  // Xu ly ket qua Request
  useEffect(() => {
    if(requestStatus == "success")
    {
      props.history.push("/admin/users");
    }
    return () => {
      dispatch(clearResponse());
    }
  }, [requestStatus]);

  const submitHandler = (e) => 
  {
    e.preventDefault();
    var data = {
      name: name,
      email: email,
      password: password,
      password_confirmation: passwordConfirmation
    }
    var token = localStorage.getItem("token");
    dispatch(createUser(token, data));
  }
  return (
    <div className="container-fluid">
      <div className="row justify-content-center">
        <div className="col-md-6">
          <h1>Create new User</h1>
          <form className="mt-4" onSubmit={submitHandler}>
            <div className="form-group">
              <label htmlFor="name">Name</label>
              <input type="text" className="form-control" id="name" placeholder="Enter the name" value={name} onChange={(e) => {setName(e.target.value)}} required />
            </div>
            <div className="form-group">
              <label htmlFor="email">Email</label>
              <input type="email" className="form-control" id="email" aria-describedby="emailHelp" placeholder="Enter the email address" value={email} onChange={(e) => {setEmail(e.target.value)}} required />
              <small id="emailHelp" className="form-text text-muted">Email address will be used to login!</small>
            </div>
            <div className="form-group">
              <label htmlFor="password">Password</label>
              <input type="password" className="form-control" id="password" placeholder="Enter the password" onChange={(e) => {setPassword(e.target.value)}} required />
            </div>
            <div className="form-group">
              <label htmlFor="passwordConfirmation">Password Confirmation</label>
              <input type="password" className="form-control" id="passwordConfirmationHelp" aria-describedby="passwordConfirmationHelp" placeholder="Enter the password confirmation" onChange={(e) => {setPasswordConfrimation(e.target.value)}} required />
              <small id="passwordConfirmationHelp" className="form-text text-muted">Please enter your password again!</small>
            </div>
            <button type="submit" className="btn btn-primary">Submit</button>
          </form>
        </div>
      </div>
    </div>
  )
}