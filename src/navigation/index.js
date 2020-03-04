import React from 'react';
import { BrowserRouter as Router, Route, Redirect, Switch } from 'react-router-dom';
import PageDashboard from "../pages/PageDashboard/PageDashboard";
import PageLogin from '../pages/PageLogin/PageLogin';
import PageRegister from '../pages/PageRegister/PageRegister'
import PageAccount from '../pages/PageAccount/PageAccount';
import PageForgotPassword from '../pages/PageForgotPassword/PageForgotPassword'
import PageQRCode from '../pages/PageQRCode/PageQRCode';
import PagesSuccessMessage from '../pages/PageSuccessMessage/PageSuccessMessage'
import PageResetPassword from '../pages/PageResetPassword/PageResetPassword';
import PageStore from '../pages/PageStore/PageStore';

const Navigator = () => {

  return (
    <div>
    <Router>
      <Switch>
        {/* <Redirect exact from='/' to='/' /> */}
       <Route exact path={'/'} component={PageDashboard}/>
          <Route path={'/signin'} component={PageLogin}/>
          <Route path={'/success'} component={PagesSuccessMessage}/>
          <Route path={'/signup'} component={PageRegister}/>
          <Route path={'/forgot-password'} component={PageForgotPassword}/>
          <Route path={'/reset-password'} component={PageResetPassword}/>
          <Route path={'/qr-code'} component={PageQRCode}/>
          <Route path={'/store'} component={PageStore}/>
          <Route path={'/account'} component={PageAccount}/>

      </Switch>
    </Router>
    </div>

  )
};

export default Navigator;
