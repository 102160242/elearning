import React from 'react';

class Footer extends React.Component {
    constructor(props) {
        super(props);
        this.state = {  };
    }
    render() {
        return (
            <footer className="footer py-4 bg-dark text-white-50">
                <div className="container text-center">
                    <small>Copyright &copy; <strong>Team 5</strong></small>
                </div>
            </footer>
        );
    }
}

export default Footer;