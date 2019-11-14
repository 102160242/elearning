import React from 'react';
import { Route, Switch } from 'react-router-dom';
import _DoTest from './_DoTest';
import _TestResult from './_TestResult';

class Test extends React.Component {
    constructor(props) {
        super(props);
        this.state = {  };
    }
    render() {
        return (
            <Switch>
                <Route exact path="/test/:test_id/do" component={_DoTest}></Route>
                <Route exact path="/test/:test_id/result" component={_TestResult}></Route>
            </Switch>
        );
    }
}

export default Test;