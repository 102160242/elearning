import React from 'react';
import { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { Switch, Route } from 'react-router-dom';
import '../../assets/admin/css/Admin.css';
import '../../assets/admin/js/Admin.js';
import Sidebar from '../admin/partials/Sidebar.js';
import Dashboard from './Dashboard';

import Categories_Index from './categories/Index';
import Categories_Show from './categories/Show.js';
import Categories_Create from './categories/Create';
import Categories_Edit from './categories/Edit';
import Users_Index from './users/Index';
import Users_Create from './users/Create';
import Users_Show from './users/Show';
import Users_Edit from './users/Edit';
import Words_Index from './words/Index';
import Words_Create from './words/Create';
import Words_Show from './words/Show';
import Words_Edit from './words/Edit';
import Questions_Index from './questions/Index';
import Questions_Create from './questions/Create';
import Questions_Show from './questions/Show';
import Questions_Edit from './questions/Edit';
import Answers_Index from './answers/Index';
import Answers_Create from './answers/Create';
import Answers_Show from './answers/Show';
import Answers_Edit from './answers/Edit';
import Tests_Index from './tests/Index';
import Tests_Create from './tests/Create';
import Tests_Show from './tests/Show';
import Tests_Edit from './tests/Edit';
export default function Admin(props) {
  //const [count, setCount] = useState(0)
  const auth = useSelector(state => state.auth);

  useEffect(() => {
    if(auth.isLoggedIn === false) // Neu chua login
    {
      props.history.push(process.env.REACT_APP_ROOT_URL);
    }
    else if(auth.isLoggedIn == true)
    {
      // Kiem tra quyen Admin
      if(!auth.currentUser.admin)
      {
        props.history.push(process.env.REACT_APP_ROOT_URL);
      }
    }
  }, [auth.isLoggedIn])

  return (
    <div className="page-wrapper chiller-theme toggled">
        <Sidebar />
        <main className="page-content">
            <Switch>
                <Route exact path="/admin/users" component={Users_Index} />
                <Route exact path="/admin/users/new" component={Users_Create} />
                <Route exact path="/admin/users/:user_id" component={Users_Show} />
                <Route exact path="/admin/users/:user_id/edit" component={Users_Edit} />

                <Route exact path="/admin/categories" component={Categories_Index} />
                <Route exact path="/admin/categories/new" component={Categories_Create} />
                <Route exact path="/admin/categories/:category_id" component={Categories_Show} />
                <Route exact path="/admin/categories/:category_id/edit" component={Categories_Edit} />

                <Route exact path="/admin/words" component={Words_Index} />
                <Route exact path="/admin/words/new" component={Words_Create} />
                <Route exact path="/admin/words/:word_id" component={Words_Show} />
                <Route exact path="/admin/words/:word_id/edit" component={Words_Edit} />

                <Route exact path="/admin/questions" component={Questions_Index} />
                <Route exact path="/admin/questions/new" component={Questions_Create} />
                <Route exact path="/admin/questions/:question_id" component={Questions_Show} />
                <Route exact path="/admin/questions/:question_id/edit" component={Questions_Edit} />

                <Route exact path="/admin/answers" component={Answers_Index} />
                <Route exact path="/admin/answers/new" component={Answers_Create} />
                <Route exact path="/admin/answers/:answer_id" component={Answers_Show} />
                <Route exact path="/admin/answers/:answer_id/edit" component={Answers_Edit} />

                <Route exact path="/admin/tests" component={Tests_Index} />
                <Route exact path="/admin/tests/new" component={Tests_Create} />
                <Route exact path="/admin/tests/:test_id" component={Tests_Show} />
                <Route exact path="/admin/tests/:test_id/edit" component={Tests_Edit} />

                <Route component={Dashboard} />
            </Switch>
        </main>
    </div>
  )
}