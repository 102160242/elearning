import React from 'react';

class Header extends React.Component {
    constructor(props) {
        super(props);
        this.state = { a: 1 };
    }
    render() {
        var style = {
        }
        return (
            <nav className="navbar navbar-expand-lg navbar-light bg-light">
                <div className="container">
                    <a className="navbar-brand" href={process.env.PUBLIC_URL}><i className="fas fa-home"></i> Home</a>
                    <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>

                    <div className="collapse navbar-collapse" id="navbarSupportedContent">
                        <ul className="navbar-nav mr-auto">
                            <li className="nav-item">
                                <a className="nav-link" href="/categories"><i className="fas fa-atlas"></i> Categories</a>
                            </li>
                        </ul>
                        <ul className="navbar-nav ml-auto">
                            <li className="nav-item">
                                <a className="nav-link" href="/users/1"><i className="fas fa-newspaper"></i> News Feed</a>
                            </li>
                            <li className="nav-item">
                                <li className="nav-item dropdown">
                                    <a className="nav-link dropdown-toggle" href="#" id="navbarDropdown" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                        <i className="fas fa-user"></i> Jess Klocko MD
                                    </a>
                                    <div className="dropdown-menu" aria-labelledby="navbarDropdown">
                                        <a className="dropdown-item" href="/admin/users"><i className="fas fa-user-shield"></i> Admin Dashboard</a>
                                        <div className="dropdown-divider"></div>
                                        <a className="dropdown-item" href="/users/edit.1"><i className="far fa-address-card"></i> Profile</a>
                                        <div className="dropdown-divider"></div>
                                        <a className="dropdown-item" href="/learnt_words"><i className="fab fa-wikipedia-w"></i> Learnt Words</a>
                                        <div className="dropdown-divider"></div>
                                        <a className="dropdown-item" rel="nofollow" data-method="delete" href="/logout"><i className="fas fa-sign-out-alt"></i> Logout</a>
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