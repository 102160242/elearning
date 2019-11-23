import React from 'react';
import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { changeLoadingStatus } from '../../../actions/app';
import { getNewsFeed } from '../../../actions/admin/users';
import { Link } from 'react-router-dom';

export default function Users_Show(props) {
  const dispatch = useDispatch();
  const auth = useSelector(state => state.auth);
  const usersData = useSelector(state => state.admin.users);
  var user_id = props.match.params.user_id;
  var token = localStorage.getItem('token');

  // const initialValue = [
  //   { category: "", category_img: "", id: 0,  score: 0, time: "", user: "", user_id: 0 }];

  // const [timeline, setTimeLine] = useState([]);
  // const [userinfo, setUserInfo] = useState({});

  useEffect(() => {
    document.title = 'Show';
    //console.log(props.history.location.search)
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
      dispatch(getNewsFeed(token, user_id))
    }
    else if (auth.isLoggedIn == false) {
      // Xac thuc that bai, chuyen huong den trang chinh
      props.history.push(process.env.REACT_APP_ROOT_URL);
    }
  }, [auth.isLoggedIn]);

  useEffect(() => {
    // Neu load thanh cong 
    
    if (usersData.newsFeed.timeline.length != 0) {
      // console.log(usersData.newsFeed);
      // setTimeLine(usersData.newsFeed.timeline);
      // setUserInfo(usersData.newsFeed.user_info);
      // console.log(timeline);
      // console.log(usersData.newsFeed.user_info);
    }

    if (usersData.status != "") {
      dispatch(changeLoadingStatus(false));
    }
    // console.log(categoriesData.data.list[0]);
  }, [usersData]);

  const renderActivities = () => {
    if (usersData.newsFeed.timeline.length === 0) {
      return <p>There is no activity to show</p>
    }
    else {
      return usersData.newsFeed.timeline.map((i, key) => {
        var user_info = usersData.newsFeed.user_info;
        return (
          <div className="card mb-2" key={key}>
            <div className="card-body">
              <div className="mb-3">
                <div className="row align-items-center">
                  <div className="col-auto">
                    <Link to={"/" + i.user_id + "/newsfeed"} className="avatar">
                      <img src={user_info.avatar_url} alt="Avatar" className="avatar-img rounded-circle" style={{ height: "50px" }} />
                    </Link>
                  </div>
                  <div className="col ml-n2">
                    <h4 className="card-title mb-1">
                      {i.user === auth.currentUser.email ? "Me" : i.user}
                    </h4>
                    <p className="card-text small text-muted">
                      <span className="fe fe-clock"></span> <time>{i.time} ago</time>
                    </p>
                  </div>
                </div>
              </div>
              <div className="card-body p-0">
                <div className="card">
                  <div className="card-body">
                    <div className="row align-items-center">
                      <div className="col">
                        <h6 className="card-title text-uppercase text-muted mb-2">
                          Score
                                            </h6>
                        <div className="row align-items-center no-gutters">
                          <div className="col-auto">
                            <span className="h2 mr-2 mb-0">
                              {i.score}/20
                                                    </span>
                          </div>
                          <div className="col">
                            <div className="progress progress-sm">
                              <div className="progress-bar" role="progressbar" style={{ width: i.score / 0.2 }} aria-valuenow={i.score / 0.2} aria-valuemin="0" aria-valuemax="100"></div>
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className="col-auto">
                        <span className="h2 fe fe-clipboard text-muted mb-0"></span>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="card mt-2">
                  <div className="card-body">
                    <div className="row align-items-center">
                      <div className="col">
                        <h6 className="card-title text-uppercase text-muted mb-2">
                          Category
                                            </h6>
                        <div className="row d-flex justify-content-between no-gutters">
                          <div className="col-auto">
                            <span className="h3 mr-2 mb-0">
                              <Link to="/" style={{ textDecoration: "none" }}>{i.category}</Link>
                            </span>
                          </div>
                          <div className="col-auto">
                            <span className="h2 mr-2 mb-0">
                              <img src={i.category_img} alt={i.category} style={{ height: '80px' }} />
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <Link to={"/test/1/result"} className="btn btn-outline-info m-2 mt-0"><i className="fas fa-star-half-alt"></i>&nbsp;Result</Link>
                </div>
              </div>
            </div>
          </div>
        );
      });
    }
  };

  if (!usersData.newsFeed) return <></>
  var activities = renderActivities();
  var user_info = usersData.newsFeed.user_info;
  return (
    <div>
      <div className="container mt-6">
        <div className="information">
          <div className="row">
            <div className="col-auto">
              <div className="anh mt-5">
                <img src={user_info.avatar_url} alt="image" className="img-responsive" width="60" height="60"></img>
              </div>
            </div>
            <div className="col mb-3  ml-md-n2">
              <div className="mt-5">
                <p>{user_info.name}</p>
              </div>
              <div className="mt-2">
                <p><i className="far fa-envelope mt-2 mr-2"></i>{user_info.email}</p>
              </div>
            </div>
          </div>
        </div>
        <hr></hr>
      </div>
      <div className="container mt-4">
        <div className="row">
          <div className="col-md-8">
            {activities}
          </div>
          <div className="col-md-4">
            <div className="table-responsive">
              <table className="table table-striped border">
                <tbody>
                  <tr>
                    <td>Joined</td>
                    <td>{user_info.created_at}</td>
                  </tr>
                  <tr>
                    <td>Learnt</td>
                    <td>
                      <span className="badge badge-pill badge-primary">Words <span className="badge badge-light">{user_info.total_learnt_words}</span></span>
                    </td>
                  </tr>
                  <tr>
                    <td>Following</td>
                    <td>
                      <span className="badge badge-pill badge-success">Users <span className="badge badge-light">{user_info.total_following}</span></span>
                    </td>
                  </tr>
                  <tr>
                    <td>Followers</td>
                    <td>
                      <span className="badge badge-pill badge-info">Users <span className="badge badge-light">{user_info.total_followers}</span> </span>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
      <hr></hr>
    </div>
  );

}