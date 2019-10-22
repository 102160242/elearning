import React from 'react';
import { Route, Switch, Redirect } from 'react-router-dom';
import Profile from './Profile';
import Categories from './Categories';
import Following from './Following';
import Followers from './Followers';
import LearntWords from './LearntWords';
import NewsFeed from './NewsFeed';
import Test from './Test';
import Words from './Words';
import Home from './Home';

class Pages extends React.Component {
    constructor(props) {
        super(props);
        this.state = {  };
    }
    render() {
        return (
            <Switch>
                <Route exact path="/profile" component={Profile} />
                <Route exact path="/categories" component={Categories} />
                <Route exact path="/followers" component={Followers} />
                <Route exact path="/following" component={Following} />
                <Route exact path="/learnt_words" component={LearntWords} />
                <Route exact path="/newsfeed" component={NewsFeed} />
                <Route path="/test" component={Test} />
                <Route exact path="/words/:category_id" component={Words} />
                <Route exact path="/" component={Home} />
                <Redirect to="/404" />
            </Switch>
        );
    }
}

export default Pages;