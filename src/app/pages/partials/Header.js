import React from 'react';
import { Link } from 'react-router-dom';

class Header extends React.Component {
    constructor(props) {
        super(props);
        this.state = { a: 1 };
    }
    render() {
        return (
            <nav className="navbar navbar-expand-lg navbar-light bg-light">
                <div className="container">
                    <Link to="/" className="navbar-brand"><i className="fas fa-home"></i> Home</Link>
                    <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>

                    <div className="collapse navbar-collapse" id="navbarSupportedContent">
                        <ul className="navbar-nav mr-auto">
                            <li className="nav-item">
                                <Link className="nav-link" to="/categories"><i className="fas fa-atlas"></i> Categories</Link>
                            </li>
                        </ul>
                        <ul className="navbar-nav ml-auto">
                            <li className="nav-item">
                                <Link className="nav-link" to="/newsfeed"><i className="fas fa-newspaper"></i> News Feed</Link>
                            </li>
                            <li className="nav-item">
                                <li className="nav-item dropdown">
                                    <a className="nav-link dropdown-toggle" href="#" id="navbarDropdown" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                        <i className="fas fa-user"></i> Jess Klocko MD
                                    </a>
                                    <div className="dropdown-menu" aria-labelledby="navbarDropdown">
                                        <Link className="dropdown-item" to="/admin"><i className="fas fa-user-shield"></i> Admin Dashboard</Link>
                                        <div className="dropdown-divider"></div>
                                        <Link className="dropdown-item" to="/profile"><i className="far fa-address-card"></i> Profile</Link>
                                        <div className="dropdown-divider"></div>
                                        <Link className="dropdown-item" to="/learnt_words"><i className="fab fa-wikipedia-w"></i> Learnt Words</Link>
                                        <div className="dropdown-divider"></div>
                                        <Link className="dropdown-item" rel="nofollow" data-method="delete" to="/logout"><i className="fas fa-sign-out-alt"></i> Logout</Link>
                                    </div>
                                </li>
                            </li>
                        </ul>
                    </div>
                </div>
            </nav>
        );
    }
}

export default Header;