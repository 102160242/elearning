import React from 'react';
import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { changeLoadingStatus } from '../../../actions/app';
import { getCategoryInfo } from '../../../actions/admin/categories';
import ReactDOM from 'react-dom';
import { Link } from 'react-router-dom';

export default function Categories_Show(props) {
  //const [count, setCount] = useState(0)
  const dispatch = useDispatch();
  const auth = useSelector(state => state.auth);
  const categoriesData = useSelector(state => state.admin.categories);
  var category_id = props.match.params.category_id;
  var token = localStorage.getItem('token');

  const [image, setImage] = useState(null);
  const [name, setName] = useState("");
  const [count, setCount] = useState("");

  useEffect(() => {
    document.title = 'Show';
    //console.log(props.history.location.search)
    return () => {
      dispatch(changeLoadingStatus(true));
    }
  }, []);

  useEffect(() => {
    if (categoriesData.redirect) {
      props.history.push("/admin/categories");
    }
  }, [categoriesData.redirect]);

  // Goi khi auth co su thay doi
  useEffect(() => {
    // Neu da xac thuc user hop le
    // console.log(auth.isLoggedIn)
    if (auth.isLoggedIn == true) {
      // Lay danh sach categories
      dispatch(getCategoryInfo(token, category_id))
    }
    else if (auth.isLoggedIn == false) {
      // Xac thuc that bai, chuyen huong den trang chinh
      props.history.push(process.env.REACT_APP_ROOT_URL);
    }
  }, [auth.isLoggedIn]);

  // Goi khi categoriesData co su thay doi
  useEffect(() => {
    // Neu load thanh cong 
    // console.log(categoriesData.category[0]);
    if (categoriesData.category.length !== 0) {
      // console.log(categoriesData.category[0].image_url);
      setName(categoriesData.category[0].name);
      setImage(categoriesData.category[0].image_url);
      setCount(categoriesData.category[0].total_words)
    }
    if (categoriesData.status != "") {
      dispatch(changeLoadingStatus(false));
    }
    // console.log(categoriesData.data.list[0]);
  }, [categoriesData]);
  return (
    <div className="container mt-3">
      <div className="row d-flex justify-content-center">
        <div className="col-sm-12 col-md-8">
          <h3>Categories</h3>
          <p className="mt-5">
            <strong className="mr-4">Name:</strong>
            {name}
          </p>
          <p>
            <strong className="mr-4">Words:</strong>
            {count}
        </p>
          <p>
            <strong>Image:</strong>
            <br />
            <img className="img-thumbnail" width="400" height="300" src={image} />
          </p>
        </div>
        <div className="col-sm-12 col-md-8">
          <Link to={"/admin/categories/" + category_id + "/edit" } className="btn btn-warning" title="Edit"><i className="far fa-edit" style={{ fontSize: "1.3rem" }}></i> Edit</Link>
          <Link to="/admin/categories" className="mr-3" title="Back"> <button className="btn btn-outline-secondary"> <i className="fas fa-long-arrow-alt-left" ></i> Back </button> </Link>
        </div>
      </div>
    </div>
  )
}