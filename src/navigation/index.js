import React from 'react';
import { BrowserRouter as Router, Route, Redirect, Switch } from 'react-router-dom';
import PageDashboard from "../pages/PageDashboard/PageDashboard";
import PageLogin from '../pages/PageLogin/PageLogin';
import PageRegister from '../pages/PageRegister/PageRegister'
import PageAccount from '../pages/PageAccount/PageAccount';


const Navigator = () => {
  return (
    <div>
      <Router>
        <Switch>
          <Route exact path={'/'} component={PageDashboard}/>
          <Route path={'/login'} component={PageLogin}/>
          <Route path={'/register'} component={PageRegister}/>
          <Route path={'/choose-account'} component={PageAccount}/>
        </Switch>
      </Router>
    </div>

  )
};

export default Navigator;
