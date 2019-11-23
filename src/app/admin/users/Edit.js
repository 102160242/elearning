import React from 'react';
import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { changeLoadingStatus } from '../../../actions/app';
import { getUserInfo, updateUser } from '../../../actions/admin/users';
import { Link } from 'react-router-dom';

export default function Users_Edit(props) {
  const dispatch = useDispatch();
  const auth = useSelector(state => state.auth);
  const usersData = useSelector(state => state.admin.users);
  var user_id = props.match.params.user_id;
  var token = localStorage.getItem('token');

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordconfirm, setPasswordconfirm] = useState("");
  //const [count, setCount] = useState(0)

  // Goi sau khi load trang (~ ComponentDidMount)
  useEffect(() => {
    document.title = 'Edit';
    //console.log(props.history.location.search)
    return () => {
      dispatch(changeLoadingStatus(true));
    }
  }, []);

  useEffect(() => {
    // console.log("Thay doi usser Data")
    // console.log(usersData)
    if(usersData.redirect)
    {
      props.history.push("/admin/users");
    }
  }, [usersData.redirect]);

  // Goi khi auth co su thay doi
  useEffect(() => {
    // Neu da xac thuc user hop le
    // console.log(auth.isLoggedIn)
    if (auth.isLoggedIn == true) {
      // Lay danh sach users
      dispatch(getUserInfo(token, user_id))
    }
    else if (auth.isLoggedIn == false) {
      // Xac thuc that bai, chuyen huong den trang chinh
      props.history.push(process.env.REACT_APP_ROOT_URL);
    }
  }, [auth.isLoggedIn]);

  // Goi khi usersData co su thay doi
  useEffect(() => {
    // Neu load thanh cong 
    // console.log(usersData.user.id != null );
    if (usersData.user.id != null) {
      // console.log(usersData.user);
      setName(usersData.user.name);
      setEmail(usersData.user.email);
    }
    if (usersData.status != "") {
      dispatch(changeLoadingStatus(false));
    }
    // console.log(usersData.data.list[0]);
  }, [usersData]);

  const onNameChangeHandler = (e) => {
    setName(e.target.value);
  }

  const onEmailChangeHandler = (e) => {
    setEmail(e.target.value);
  }

  const onPasswordChangeHandler = (e) => {
    setPassword(e.target.value);
  }

  const onPasswordConfirmChangeHandler = (e) => {
    setPasswordconfirm(e.target.value);
  }

  const formSubmitHandler = (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append('user[name]', name)
    formData.append('user[email]', email)
    if(password !== "")
    {
      formData.append('user[password]', password)
      formData.append('user[password_confirmation]', passwordconfirm)
    }
    dispatch(updateUser(token, formData, user_id));
  }
  return (
    <div className="container mt-3">
      <div className="row d-flex justify-content-center">
        <div className="col-sm-12 col-md-8">
          <h3>Editing User</h3>
          <form onSubmit={formSubmitHandler}>
            <div className="form-group">
              <label htmlFor="user_name">Name</label>
              <input className="form-control" type="text" id="user_name" required onChange={onNameChangeHandler} value={name} />
            </div>
            <div className="form-group">
              <label htmlFor="user_email">Email</label>
              <input className="form-control" type="text" id="user_email" required onChange={onEmailChangeHandler} value={email} />
            </div>
            <div className="form-group">
              <label htmlFor="user_password">Password</label>
              <input className="form-control" type="password" id="user_password" onChange={onPasswordChangeHandler} />
            </div>
            <div className="form-group">
              <label htmlFor="user_password_confirmation">Password Confirm</label>
              <input className="form-control" type="password" id="user_password_confirmation" onChange={onPasswordConfirmChangeHandler} />
            </div>

            <div className="form-group">
              <button className="btn btn-success mt-3 mb-3" type="submit" ><i className="far fa-check-circle"></i> Submit</button>
              <Link to="/admin/users" className="mr-3" title="Back"> <button className="btn btn-outline-secondary"> <i className="fas fa-long-arrow-alt-left" ></i> Back </button> </Link>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}