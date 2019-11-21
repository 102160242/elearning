import React from 'react';
import { useState, useEffect } from 'react';
import { createCategory, clearResponse } from '../../../actions/admin/categories';
import { useDispatch, useSelector } from 'react-redux';
import { changeLoadingStatus } from '../../../actions/app';

export default function Categories_Create(props) {
  const [image, setImage] = useState(null);
  const [name, setName] = useState("");
  const dispatch = useDispatch();
  const requestStatus = useSelector(state => state.admin.categories.status);
  // Thiet lap ban dau
  useEffect(() => {
    document.title = 'Create new Category';
    dispatch(clearResponse());
    return () => {
      dispatch(changeLoadingStatus(true));
      dispatch(clearResponse());
    }
  }, []);

  // Xu ly ket qua Request
  useEffect(() => {
    console.log(requestStatus)
    if(requestStatus == "success")
    {
      props.history.push("/admin/categories"); // Chuyen huong ve categories sau khi Submit thanh cong
    }
    return () => {
      dispatch(clearResponse());
    }
  }, [requestStatus]);

  const onChangeImageHandler = (e)  =>
  {
    //console.log("IMG CHANGED");
    setImage(e.target.files[0]);
  }
  const onChangeHandler = (e) =>
  {
    setName(e.target.value);
  }
  const formSubmitHandler = (e) => 
  {
    e.preventDefault();
    const formData = new FormData();
    formData.append('category[image]', image);
    formData.append('category[name]', name)
    var token = localStorage.getItem("token");
    dispatch(createCategory(token, formData));
  }
  return (
    <div className="container-fluid">
      <div className="row justify-content-center">
        <div className="col-md-6">
          <h1>Create new Category</h1>
          <form className="mt-4" onSubmit={formSubmitHandler}>
            <div className="form-group">
              <label htmlFor="category_name">Category Name</label>
              <input type="text" className="form-control" id="category_name" aria-describedby="nameHelp" placeholder="Enter the category name" required onChange={onChangeHandler}/>
              <small id="nameHelp" className="form-text text-muted">You can't not leave this text blank, it's required!</small>
            </div>
            <div className="form-group">
              <label htmlFor="category_image">Choose your image</label>
              <input type="file" className="form-control-file" id="category_image" onChange={onChangeImageHandler} />
            </div>
            <button type="submit" className="btn btn-primary">Submit</button>
          </form>
        </div>
      </div>
    </div>
  )
}