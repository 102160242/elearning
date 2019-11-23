import React from 'react';
import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getTests, deleteTest,clearResponse } from '../../../actions/admin/tests.js';
import { changeLoadingStatus } from '../../../actions/app';
import { Link } from 'react-router-dom';
import Paginator from '../partials/Paginator';
import queryString from 'query-string';
import swal from 'sweetalert';

export default function Tests_Index(props) {
  const dispatch = useDispatch();
  const auth = useSelector(state => state.auth);
  const testsData = useSelector(state => state.admin.tests);

  const [orderValue, setOrderValue] = useState("asc");
  const [searchValue, setSearchValue] = useState("");
  const [perPageValue, setPerPageValue] = useState(10);

  // Goi sau khi load trang (~ ComponentDidMount)
  useEffect(() => {
    document.title = 'Tests';
    //console.log(props.history.location.search)
    return () => {
      dispatch(changeLoadingStatus(true));
      dispatch(clearResponse()); // Clear response moi luc chuyen sang trang khac
    }
  }, []);

  // Goi khi auth co su thay doi
  useEffect(() => {
    // Neu da xac thuc user hop le
    if (auth.isLoggedIn == true) {
      // Lay danh sach tests
      dispatch(getTests(localStorage.getItem("token"), getQueries()))
    }
    else if (auth.isLoggedIn == false) {
      // Xac thuc that bai, chuyen huong den trang chinh
      props.history.push(process.env.REACT_APP_ROOT_URL);
    }
  }, [auth.isLoggedIn]);

  // Goi khi testsData co su thay doi
  useEffect(() => {
    // Neu load thanh cong 
    if (testsData.data.status != "") {
      dispatch(changeLoadingStatus(false));
    }
  }, [testsData]);

  // Goi khi URL co su thay doi
  useEffect(() => {
    // Lay lai du lieu khi co su thay doi params
    var queries = getQueries();
    // Set lai State
    setSearchValue(queries.search ? queries.search : "");
    setOrderValue(queries.order ? queries.order : "asc");
    setPerPageValue(queries.per_page ? queries.per_page : 10);

    dispatch(getTests(localStorage.getItem("token"), queries))
  }, [props.history.location.search]);

    // Clear Response sau moi lan refresh du lieu
    useEffect(() => {
      dispatch(clearResponse());
    }, [testsData.status]);

  const getQueries = () => {

    var query = queryString.parse(props.location.search, { ignoreQueryPrefix: true });
    var queries = {};
    queries["search"] = query.search ? query.search : "";
    queries["page"] = query.page ? query.page : 1;
    queries["order"] = query.order ? query.order : "asc";
    queries["per_page"] = query.per_page ? query.per_page : 10;
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
    //console.log("ID la " + id)
    swal({
      title: "Are you sure?",
      text: "Do you want to delete this test?",
      icon: "warning",
      buttons: ["Cancel", "Delete it!"],
      dangerMode: true,
    })
    .then((willLogout) => {
      if (willLogout) {
          var token = localStorage.getItem("token");
          dispatch(deleteTest(token, id)).then(() => {
            dispatch(getTests(token, getQueries()));
          });
      }
    });
  }
  return (
    <div className="container-fluid">
      <h1>Tests</h1>
      <div className="row justify-content-between mt-4">
        <Link to="/admin/tests/new" className="btn btn-outline-success"><i className="far fa-plus-square mr-3"></i>New Test</Link>
        <div className="row align-items-center">
          <div className="col-auto">
            <input type="text" className="form-control mr-3 d-inline" placeholder="For example: a mind..." value={searchValue} onChange={searchHandler} title="Search Test"/>
          </div>
          <div className="col-auto">
            <select className="custom-select mr-3 d-inline" value={orderValue} onChange={orderHandler} title="Order">
              <option value="asc">ASC</option>
              <option value="desc">DESC</option>
            </select>
          </div>
          <div className="col-auto">
            <select className="custom-select d-inline" value={perPageValue} onChange={perPageHandler} title="Item per page">
              <option value="10">10</option>
              <option value="15">15</option>
              <option value="20">20</option>
            </select>
          </div>
        </div>
        <div className="table-responsive mt-3">
          <div className="text-info mb-2 h6"> 
            Showing { testsData.data.list.length } of { testsData.data.paginate.total_item } tests
          </div>
          <table className="table">
            <thead className="thead-dark">
              <tr>
                <th>#</th>
                <th>ID</th>
                <th>User</th>
                <th>Category</th>
                <th>Score</th>
                <th>Created At</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {
                testsData.data.list && testsData.data.list.map((i, key) =>
                  <tr key={key}>
                    <td scope="row">{key+1}</td>
                    <td>{i.id}</td>
                    <td>{i.user_email}</td>
                    <td>{i.category_name}</td>
                    <td>{i.score === null ? "Waiting" : i.score}</td>
                    <td>{i.created_at}</td>
                    <td>
                      <Link to={"admin/tests" + i.id} className="mr-3" title="Show"><i className="far fa-eye" style={{ fontSize: "1.3rem",color:"#007bff" }}></i></Link>
                      <Link to={"admin/tests" + i.id + "/edit"} className="mr-3" title="Edit"><i className="far fa-edit" style={{ fontSize: "1.3rem",color:"#ffc107" }}></i></Link>
                      <Link to={props.history.location.search === "" ? "#" : props.history.location.search} className="" onClick={() => { deleteItem(i.id) }} title="Delete"><i className="far fa-trash-alt" style={{ fontSize: "1.3rem",color:"#dc3545" }}></i></Link>
                    </td>
                  </tr>
                )
              }
            </tbody>
          </table>
          <Paginator paginate={testsData.data.paginate} queries={getQueries()} />
        </div>
      </div>
    </div>
  )
}