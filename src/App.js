import React from 'react';
import logo from './logo.svg';
import './App.css';
import './config.js';
import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap/dist/js/bootstrap.js';
/* Import Component */
import Auth from './app/auth/Auth';
import Pages from './app/pages/Pages';
import Admin from './app/admin/Admin';
import _404 from './app/pages/errors/_404';
import _403 from './app/pages/errors/_403';
import Loading from './app/Loading';
/* Import Component */
import { Route, Redirect, Switch } from 'react-router-dom';

class App extends React.Component {
  constructor(props)
  {
    super(props);
    this.state = {
      isLoading: true
    }
  }
  componentDidMount()
  {
    this.setState({
      isLoading: false
    });
  }
  render()
  {
    if(this.state.isLoading)
    {
      return (
        <Loading />
      );
    }
    else
    {
      return (
        <div>
          <Switch>
            <Route component={Auth} />
            <Route exact path="/admin" component={Admin} />
            <Route exact path="/404" component={_404} />
            <Route exact path="/403" component={_403} />
            <Route component={Pages} />
          </Switch>
        </div>
      );
    }
  }
}

export default App;
