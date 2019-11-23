import React from 'react';
import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { changeLoadingStatus } from '../../../actions/app';
import { getWordInfo } from '../../../actions/admin/words';
import { Link } from 'react-router-dom';

export default function Words_Show(props) {
  const dispatch = useDispatch();
  const auth = useSelector(state => state.auth);
  const wordsData = useSelector(state => state.admin.words);
  var word_id = props.match.params.word_id;
  var token = localStorage.getItem('token');

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
      dispatch(getWordInfo(token, word_id))
    }
    else if (auth.isLoggedIn == false) {
      // Xac thuc that bai, chuyen huong den trang chinh
      props.history.push(process.env.REACT_APP_ROOT_URL);
    }
  }, [auth.isLoggedIn]);

  // Goi khi categoriesData co su thay doi
  useEffect(() => {
    // Neu load thanh cong 
    if (wordsData.status != "") {
      dispatch(changeLoadingStatus(false));
    }
    // console.log(categoriesData.data.list[0]);
  }, [wordsData]);

  var data = wordsData.word;
  return (
    <div className="container mt-3">
      <div className="row d-flex justify-content-center">
        <div className="col-sm-12 col-md-8">
          <h3>Words</h3>
          <p className="mt-3 row">
            <div className="col-md-3"><strong className="mr-5">Name:</strong></div>
            <div className=" col-md-9"><p className="">{data.word}</p></div>
          </p>
          <p className="row">
            <div className="col-md-3"><strong className="mr-5">Meaning:</strong></div>
            <div className=" col-md-9"><p className="">{data.meaning}</p></div>
          </p>
          <p className="mt-3 row">
            <div className="col-md-3"><strong className="mr-5">word class:</strong></div>
            <div className=" col-md-9"><p className="">{data.word_class}</p></div>
          </p>
          <p className="mt-3 row">
            <div className="col-md-3"><strong className="mr-5">Ipa:</strong></div>
            <div className=" col-md-9"><p className="">{data.ipa}</p></div>
          </p>
          <p className="row">
            <div className="col-md-3"><strong className="mr-5">Image:</strong></div>
            <div className=" col-md-12"><p className=""><img className="img-thumbnail" width="400" height="300" src={data.image_url} /></p></div>
            
          </p>
        </div>
        <div className="col-sm-12 col-md-8">
          <Link to={"/admin/words/" + word_id + "/edit" } className="btn btn-warning" title="Edit"><i className="far fa-edit" style={{ fontSize: "1.3rem" }}></i> Edit</Link>
          <Link to="/admin/words" className="mr-3" title="Back"> <button className="btn btn-outline-secondary"> <i className="fas fa-long-arrow-alt-left" ></i> Back </button> </Link>
        </div>
      </div>
    </div>
  )
}