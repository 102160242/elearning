import React from 'react';
import './App.css';
import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap/dist/js/bootstrap.js';

/* Import Component */
import Auth from './app/auth/Auth';
import Pages from './app/pages/Pages';
import Admin from './app/admin/Admin';
import _404 from './app/pages/errors/_404';
import _403 from './app/pages/errors/_403';
//import Loading from './app/Loading';
// import toastr from 'toastr'
// import 'toastr/build/toastr.min.css'

//import { connect } from 'react-redux'
/* Import Component */
import { Route, Switch } from 'react-router-dom';

require('dotenv').config();
class App extends React.Component {
  constructor(props)
  {
    super(props);
    // console.log("Message: " + this.props.message)

    // this.state = {
    //   isLoading: true,
    // }
  }
  componentDidMount()
  {
  }
  render()
  {
    console.log("PROPS: " + JSON.stringify(this.props));
    return (
      <div>
        <Switch>
          <Route path="/auth" component={Auth} />
          <Route exact path="/admin" component={Admin} />
          <Route exact path="/404" component={_404} />
          <Route exact path="/403" component={_403} />
          <Route component={Pages} />
        </Switch>
      </div>
    ); 
  }
}

export default App;
