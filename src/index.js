import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
import { createBrowserHistory } from 'history'
import { combineReducers, createStore, compose, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import thunk from 'redux-thunk';
import { connectRouter, routerMiddleware, ConnectedRouter } from 'connected-react-router'

// Import Reducers
import { reducer as toastrReducer } from 'react-redux-toastr';
import authReducer from './reducers/auth';
import categoriesReducer from './reducers/categories';
import userReducer from './reducers/user';
import appReducer from './reducers/app';
import testReducer from './reducers/test';
import wordsReducer from './reducers/word';
import adminCategoriesReducer from './reducers/admin/categories';
import adminUsersReducer from './reducers/admin/user';
import adminWordsReducer from './reducers/admin/words';
import adminQuestionsReducer from './reducers/admin/questions';
import adminAnswersReducer from './reducers/admin/answers';
import adminTestsReducer from './reducers/admin/test';

const rootReducer = (history) => combineReducers({
    router: connectRouter(history),
    admin: combineReducers({
        categories: adminCategoriesReducer,
        users: adminUsersReducer,
        words: adminWordsReducer,
        questions: adminQuestionsReducer,
        answers: adminAnswersReducer,
        tests: adminTestsReducer,
    }),
    auth: authReducer,
    categories: categoriesReducer,
    words: wordsReducer,
    user: userReducer,
    test: testReducer,
    app: appReducer,
    toastr: toastrReducer
});
const middleware = [thunk];
const history = createBrowserHistory();
const store = createStore(
    rootReducer(history),
    compose(
        applyMiddleware(
            routerMiddleware(history),
            ...middleware
        )
    )
);
ReactDOM.render(
    <Provider store={store}>
        <ConnectedRouter history={history}>
            <App />
        </ConnectedRouter>
    </Provider>,
    document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
