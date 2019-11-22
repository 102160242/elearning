import React from 'react';
import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getWords, deleteWord } from '../../../actions/admin/words';
import { changeLoadingStatus } from '../../../actions/app';
import { Link } from 'react-router-dom';
import Paginator from '../partials/Paginator';
import queryString from 'query-string';
import swal from 'sweetalert';

export default function Words_Index(props) {
  const dispatch = useDispatch();
  const auth = useSelector(state => state.auth);
  const wordsData = useSelector(state => state.admin.words);

  const [orderValue, setOrderValue] = useState("asc");
  const [searchValue, setSearchValue] = useState("");
  const [perPageValue, setPerPageValue] = useState(5);


  // Goi sau khi load trang (~ ComponentDidMount)
  useEffect(() => {
    document.title = 'Words';
    //console.log(props.history.location.search)
    return () => {
      dispatch(changeLoadingStatus(true));
    }
  }, []);

  // Goi khi auth co su thay doi
  useEffect(() => {
    // Neu da xac thuc user hop le
    if (auth.isLoggedIn == true) {
      // Lay danh sach words
      dispatch(getWords(getQueries()))
    }
    else if (auth.isLoggedIn == false) {
      // Xac thuc that bai, chuyen huong den trang chinh
      props.history.push(process.env.REACT_APP_ROOT_URL);
    }
  }, [auth.isLoggedIn]);

  // Goi khi wordsData co su thay doi
  useEffect(() => {
    // Neu load thanh cong 
    if (wordsData.data.status != "") {
      dispatch(changeLoadingStatus(false));
    }
  }, [wordsData]);

  // Goi khi URL co su thay doi
  useEffect(() => {
    // Lay lai du lieu khi co su thay doi params
    var queries = getQueries();
    // Set lai State
    setSearchValue(queries.search ? queries.search : "");
    setOrderValue(queries.order ? queries.order : "asc");
    setPerPageValue(queries.per_page ? queries.per_page : 5);

    dispatch(getWords(queries))
  }, [props.history.location.search]);

  const getQueries = () => {
    var query = queryString.parse(props.location.search, { ignoreQueryPrefix: true });
    var queries = {};
    queries["search"] = query.search ? query.search : "";
    queries["page"] = query.page ? query.page : 1;
    queries["order"] = query.order ? query.order : "asc";
    queries["per_page"] = query.per_page ? query.per_page : 5;
    return queries;
  }

  const searchHandler = (e) => {
    var queries = getQueries();
    queries["search"] = e.target.value;
    queries["page"] = 1;
    props.history.push({
      search: "?" + new URLSearchParams(queries).toString()
    });
  }

  const orderHandler = (e) => {
    var queries = getQueries();
    queries["order"] = e.target.value;
    props.history.push({
      search: "?" + new URLSearchParams(queries).toString()
    });
  }

  const perPageHandler = (e) => {
    var queries = getQueries();
    queries["per_page"] = e.target.value;
    props.history.push({
      search: "?" + new URLSearchParams(queries).toString()
    });
  }

  const deleteItem = (id) => {
    console.log("ID la " + id)
    swal({
      title: "Are you sure?",
      text: "Do you want to delete this word?",
      icon: "warning",
      buttons: ["Cancel", "Delete it!"],
      dangerMode: true,
    })
    .then((willLogout) => {
      if (willLogout) {
          var token = localStorage.getItem("token");
          dispatch(deleteWord(token, id));
      }
    });
  }

  return (
    <div className="container-fluid">
      <h1>Words</h1>
      <div className="row justify-content-between mt-4">
        <Link to="/admin/words/new" className="btn btn-outline-success">New Word</Link>
        <div className="row align-items-center">
          <div className="col-auto">
            <input type="text" className="form-control mr-3 d-inline" placeholder="For example: London" value={searchValue} onChange={searchHandler} title="Search Word"/>
          </div>
          <div className="col-auto">
            <select className="custom-select mr-3 d-inline" value={orderValue} onChange={orderHandler} title="Order">
              <option value="IDasc">ID-ASC</option>
              <option value="IDdesc">ID-DESC</option>
              <option value="Wordasc">Word-ASC</option>
              <option value="Worddesc">Word-DESC</option>
            </select>
          </div>
          <div className="col-auto">
            <select className="custom-select d-inline" value={perPageValue} onChange={perPageHandler} title="Item per page">
              <option value="5">5</option>
              <option value="10">10</option>
              <option value="15">15</option>
              <option value="20">20</option>
            </select>
          </div>
        </div>
        <div className="table-responsive mt-3">
          <div className="text-info mb-2 h5"> 
            Showing { wordsData.data.list.length } of { wordsData.data.paginate.total_item } items
          </div>
          <table className="table">
            <thead className="thead-dark">
              <tr>
                <th>#</th>
                <th>ID</th>
                <th>Word</th>
                <th>IPA</th>
                <th>Class</th>
                <th>Meaning</th>
                <th>Categories</th>
                <th>Image</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {
                wordsData.data.list && wordsData.data.list.map((i, key) =>
                  <tr key={key}>
                    <td scope="row">{key+1}</td>
                    <td>{i.id}</td>
                    <td>{i.word}</td>
                    <td>{i.ipa}</td>
                    <td>{i.word_class}</td>
                    <td>{i.meaning}</td>
                    <td>{i.name}</td>
                    <td><img src={i.image_url} alt={i.name} style={{ width: "100px" }} /></td>
                    <td>
                      <Link to={"admin/words" + i.id} className="mr-3" title="Show"><i class="far fa-eye" style={{ fontSize: "1.3rem" ,color:"#007bff" }}></i></Link>
                      <Link to={"admin/words" + i.id + "/edit"} className="mr-3" title="Edit"><i class="far fa-edit" style={{ fontSize: "1.3rem",color:"#ffc107" }}></i></Link>
                      <Link to={"admin/words" + i.id + "/delete"} className="" onClick={() => { deleteItem(i.id) }} title="Delete"><i class="far fa-trash-alt" style={{ fontSize: "1.3rem",color:"#dc3545" }}></i></Link>
                    </td>
                  </tr>
                )
              }
            </tbody>
          </table>
          <Paginator paginate={wordsData.data.paginate} queries={getQueries()} />
        </div>
      </div>
    </div>
  )
}