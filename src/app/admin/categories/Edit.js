import React from 'react';
import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { changeLoadingStatus } from '../../../actions/app';
import { getCategoryInfo, updateCategory } from '../../../actions/admin/categories';
import ReactDOM from 'react-dom';
import { Link } from 'react-router-dom';

export default function Categories_Edit(props) {
  const dispatch = useDispatch();
  const auth = useSelector(state => state.auth);
  const categoriesData = useSelector(state => state.admin.categories);
  var category_id = props.match.params.category_id;
  var token = localStorage.getItem('token');

  const [image, setImage] = useState(null);
  const [image_url, setImage_url] = useState(null);
  const [name, setName] = useState("");
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
    if(categoriesData.redirect)
    {
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
    }
    if (categoriesData.status != "") {
      dispatch(changeLoadingStatus(false));
    }
    // console.log(categoriesData.data.list[0]);
  }, [categoriesData]);

  const onChangeHandler = (e) => {
    setName(e.target.value);
  }

  const onChangeImageHandler = (e) => {
    // console.log(image);
    var reader = new FileReader();
    var img = e.target.files[0];
    var imgtag = document.querySelector("#img_feild");

    setImage(img);
    setImage_url(img);

    var labelTag = document.querySelector("#img_name");
    var label = <label className="custom-file-label" id="img_name" htmlFor="customFile"> {img.name} </label>;
    ReactDOM.render(label, labelTag);

    reader.addEventListener("load", function () {
      imgtag.src = reader.result;
    }, false);

    if (img) {
      reader.readAsDataURL(img);
    }
  }

  const formSubmitHandler = (e) => {
    e.preventDefault();
    const formData = new FormData();
    if (image_url !== null)
      formData.append('category[image]', image_url);
    formData.append('category[name]', name)
    var token = localStorage.getItem("token");
    dispatch(updateCategory(token, formData, category_id));
  }

  return (
    <div className="container mt-3">
      <div className="row d-flex justify-content-center">
        <div className="col-sm-12 col-md-8">
          <h3>Editing Category</h3>
          <form onSubmit={formSubmitHandler}>
            <div className="form-group">
              <label htmlFor="category_name">Name</label>
              <input className="form-control" type="text" id="category_name" required onChange={onChangeHandler} value={name} />
              <small id="nameHelp" className="form-text text-muted">You can't not leave this text blank, it's required!</small>
            </div>
            <div className="form-group">
              <label >Image</label>
              <div>
                <img className="mx-auto d-block img-thumbnail" id="img_feild" width="500" height="365" src={image} />
              </div>
              <div className="custom-file form-control mt-3">
                <input type="file" className="custom-file-input" id="category_image" onChange={onChangeImageHandler} />
                <label className="custom-file-label" id="img_name" htmlFor="customFile">Choose file</label>
              </div>
            </div>
            <div className="form-group">
              <button className="btn btn-success mt-3 mb-3" type="submit" ><i className="far fa-check-circle"></i> Submit</button>
              <Link to="/admin/categories" className="mr-3" title="Back"> <button className="btn btn-outline-secondary"> <i className="fas fa-long-arrow-alt-left" ></i> Back </button> </Link>
            </div>
            {/* <Link to={"/admin/categories/" + i.id} className="mr-3" title="Show"> <button className="btn btn-outline-info"> <i className="far fa-eye" ></i> Show </button> </Link> */}
          </form>
        </div>
      </div>
    </div>
  )
}