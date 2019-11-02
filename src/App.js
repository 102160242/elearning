import React from 'react';
import './App.css';
import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap/dist/js/bootstrap.js';
import 'react-redux-toastr/lib/css/react-redux-toastr.min.css';
import ReduxToastr from 'react-redux-toastr';
import { connect } from 'react-redux';

/* Import Component */
import Auth from './app/auth/Auth';
import Pages from './app/pages/Pages';
import Admin from './app/admin/Admin';
import _404 from './app/pages/errors/_404';
import _403 from './app/pages/errors/_403';
/* Import Component */

import { Route, Switch } from 'react-router-dom';
import { getUserInfo } from './actions/auth';

require('dotenv').config();

class App extends React.Component {
  constructor(props) {
    super(props);

    // Check if token exists
    var token = localStorage.getItem(process.env.REACT_APP_TOKEN_KEY);
    if(token !== null)
    {
      this.props.getUserInfo(token);
    }
  }
  componentDidMount() {
  }
  render() {
    return (
      <div>
        <Switch>
          <Route path="/auth" component={Auth} />
          <Route exact path="/admin" component={Admin} />
          <Route exact path="/404" component={_404} />
          <Route exact path="/403" component={_403} />
          <Route component={Pages} />
        </Switch>
        <ReduxToastr
          timeOut={5000}
          newestOnTop={false}
          preventDuplicates
          position="top-right"
          getState={(state) => state.toastr} // This is the default
          transitionIn="fadeIn"
          transitionOut="fadeOut"
          progressBar={true}
          closeOnToastrClick />
      </div>
    );
  }
}

// const mapStateToProps = (state /*, ownProps*/) => {
//   return {
//     requestResponse: state.auth.requestResponse,
//     currentUser: state.auth.currentUser,
//     isLoggedIn: state.auth.isLoggedIn
//   }
// }
const mapDispatchToProps = dispatch => ({
  getUserInfo: (token) => dispatch(getUserInfo(token))
})

export default connect(null, mapDispatchToProps) (App);