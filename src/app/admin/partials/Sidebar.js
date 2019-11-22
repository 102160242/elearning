import React from 'react';
import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from "react-redux";
import { Link } from 'react-router-dom';
import swal from 'sweetalert';
import { logoutUser } from '../../../actions/auth';

export default function Sidebar() {
    const currentUser = useSelector(state => state.auth.currentUser);
    const dispatch = useDispatch();

    useEffect(() => {
    })
    const logout = () =>
    {
        swal({
            title: "Are you sure?",
            text: "Do you want to logout?",
            icon: "warning",
            buttons: ["Go back", "Log me out!"],
            dangerMode: true,
          })
          .then((willLogout) => {
            if (willLogout) {
                var token = localStorage.getItem("token");
                dispatch(logoutUser(token));
            }
          });
    }
    return(
        <>
            <a id="show-sidebar" className="btn btn-sm btn-dark" href="#">
                <i className="fas fa-bars"></i>
            </a>
            <nav id="sidebar" className="sidebar-wrapper">
            <div className="sidebar-content">
                <div className="sidebar-brand">
                    <Link to="/">HOME</Link>
                    <div id="close-sidebar">
                        <i className="fas fa-times"></i>
                    </div>
                </div>
                <div className="sidebar-header">
                    <div className="user-pic">
                        <img className="img-responsive img-rounded"
                            src={currentUser.avatar_url}
                            alt="User picture" />
                    </div>
                    <div className="user-info">
                        <span className="user-name">{currentUser.name}<br />
                        <strong>{currentUser.email}</strong>
                        </span>
                        <span className="user-role">Administrator</span>
                        <span className="user-status">
                            <i className="fa fa-circle"></i>
                            <span>Online</span>
                        </span>
                    </div>
                </div>
                {/* <div className="sidebar-search">
                    <div>
                        <div className="input-group">
                            <input type="text" className="form-control search-menu" placeholder="Search..." />
                            <div className="input-group-append">
                                <span className="input-group-text">
                                    <i className="fa fa-search" aria-hidden="true"></i>
                                </span>
                            </div>
                        </div>
                    </div>
                </div> */}
                <div className="sidebar-menu">
                    <ul>
                        <li className="header-menu">
                            <span>Menu</span>
                        </li>
                        {/* <li className="sidebar-dropdown">
                            <a href="#">
                                <i className="fa fa-tachometer-alt"></i>
                                <span>Dashboard</span>
                                <span className="badge badge-pill badge-warning">New</span>
                            </a>
                            <div className="sidebar-submenu">
                                <ul>
                                    <li>
                                        <a href="#">Dashboard 1
                                <span className="badge badge-pill badge-success">Pro</span>
                                        </a>
                                    </li>
                                    <li>
                                        <a href="#">Dashboard 2</a>
                                    </li>
                                    <li>
                                        <a href="#">Dashboard 3</a>
                                    </li>
                                </ul>
                            </div>
                        </li>
                        <li className="sidebar-dropdown">
                            <a href="#">
                                <i className="fa fa-shopping-cart"></i>
                                <span>E-commerce</span>
                                <span className="badge badge-pill badge-danger">3</span>
                            </a>
                            <div className="sidebar-submenu">
                                <ul>
                                    <li>
                                        <a href="#">Products

                            </a>
                                    </li>
                                    <li>
                                        <a href="#">Orders</a>
                                    </li>
                                    <li>
                                        <a href="#">Credit cart</a>
                                    </li>
                                </ul>
                            </div>
                        </li>
                        <li className="sidebar-dropdown">
                            <a href="#">
                                <i className="far fa-gem"></i>
                                <span>Components</span>
                            </a>
                            <div className="sidebar-submenu">
                                <ul>
                                    <li>
                                        <a href="#">General</a>
                                    </li>
                                    <li>
                                        <a href="#">Panels</a>
                                    </li>
                                    <li>
                                        <a href="#">Tables</a>
                                    </li>
                                    <li>
                                        <a href="#">Icons</a>
                                    </li>
                                    <li>
                                        <a href="#">Forms</a>
                                    </li>
                                </ul>
                            </div>
                        </li>
                        <li className="sidebar-dropdown">
                            <a href="#">
                                <i className="fa fa-chart-line"></i>
                                <span>Charts</span>
                            </a>
                            <div className="sidebar-submenu">
                                <ul>
                                    <li>
                                        <a href="#">Pie chart</a>
                                    </li>
                                    <li>
                                        <a href="#">Line chart</a>
                                    </li>
                                    <li>
                                        <a href="#">Bar chart</a>
                                    </li>
                                    <li>
                                        <a href="#">Histogram</a>
                                    </li>
                                </ul>
                            </div>
                        </li>
                        <li className="sidebar-dropdown">
                            <a href="#">
                                <i className="fa fa-globe"></i>
                                <span>Maps</span>
                            </a>
                            <div className="sidebar-submenu">
                                <ul>
                                    <li>
                                        <a href="#">Google maps</a>
                                    </li>
                                    <li>
                                        <a href="#">Open street map</a>
                                    </li>
                                </ul>
                            </div>
                        </li>
                        <li className="header-menu">
                            <span>Extra</span>
                        </li> */}
                        <li>
                            <Link to="/admin">
                                <i className="fas fa-home"></i>
                                <span className="ml-2">Dashboard</span>
                                {/* <span className="badge badge-pill badge-primary">Beta</span> */}
                            </Link>
                        </li>
                        <li>
                            <Link to="/admin/users">
                                <i className="fas fa-users"></i>
                                <span className="ml-2">Users</span>
                                {/* <span className="badge badge-pill badge-primary">Beta</span> */}
                            </Link>
                        </li>
                        <li>
                            <Link to="/admin/categories">
                                <i className="fas fa-atlas"></i>
                                <span className="ml-2">Categories</span>
                            </Link>
                        </li>
                        <li>
                            <Link to="/admin/words">
                                <i className="far fa-file-word"></i>
                                <span className="ml-2">Words</span>
                            </Link>
                        </li>
                        <li>
                            <Link to="/admin/questions">
                                <i className="far fa-question-circle"></i>
                                <span className="ml-2">Questions</span>
                            </Link>
                        </li>
                        <li>
                            <Link to="/admin/answers">
                                <i className="fas fa-font"></i>
                                <span className="ml-2">Answers</span>
                            </Link>
                        </li>
                        <li>
                            <Link to="/admin/tests">
                                <i className="fas fa-file-alt"></i>
                                <span className="ml-2">Tests</span>
                            </Link>
                        </li>
                    </ul>
                </div>
            </div>
            <div className="sidebar-footer">
                {/* <a href="#">
                    <i className="fa fa-bell"></i>
                    <span className="badge badge-pill badge-warning notification">3</span>
                </a>
                <a href="#">
                    <i className="fa fa-envelope"></i>
                    <span className="badge badge-pill badge-success notification">7</span>
                </a>
                <a href="#">
                    <i className="fa fa-cog"></i>
                    <span className="badge-sonar"></span>
                </a> */}
                <Link to="/">
                    <i className="fas fa-chalkboard"></i>
                </Link>
                <Link to="#" onClick={logout}>
                    <i className="fa fa-power-off"></i>
                </Link>
            </div>
        </nav>
    </>
    )
}