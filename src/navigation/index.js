import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { isUserTokenAuthenticated } from '../actions'
import { Router, Route, Redirect, Switch } from 'react-router-dom';
import PageDashboard from "../pages/PageDashboard/PageDashboard";
import PageLogin from '../pages/PageLogin/PageLogin';
import PageRegister from '../pages/PageRegister/PageRegister'
import PageStore from '../pages/PageStore/PageStore';
import PageViewStore from '../pages/PageViewStore/PageViewStore';
import PageForgotPassword from '../pages/PageForgotPassword/PageForgotPassword'
import PageAccount from '../pages/PageAccount/PageAccount';
import PageQRCode from '../pages/PageQRCode/PageQRCode';
import PagesSuccessMessage from '../pages/PageSuccessMessage/PageSuccessMessage'
import PageResetPassword from '../pages/PageResetPassword/PageResetPassword';
import PageTransaction from '../pages/PageTransaction/PageTransaction';
import PageViewCategoryItem from '../pages/PageViewCategoryItem/PageViewCategoryItem';
import PagePayment from '../pages/PagePayment/PagePayment';
import PageNotFound from '../pages/PageNotFound/PageNotFound'
import PageServerError from '../pages/PageServerError/PageServerError'
import { createBrowserHistory } from 'history'
import PagePaymentHistory from '../pages/PagePaymentHistory/PagePaymentHistory';
import is from 'is_js'

export const history = createBrowserHistory()


const Navigator = ({ auth, isUserTokenAuthenticated }) => {
  const [connection, setConnection] = useState(null);
  const isConnected = () => {
    const res = localStorage.getItem('isConnected')
    setConnection(res);
  }

  const checkToken = () => {
    if (auth.err !== 16) isUserTokenAuthenticated();
  }
  useEffect(() => {
    //if(is.android() || is.iphone()) history.push('/pageNotFound')
    setTimeout(() => {
      isConnected();
    }, 4000)
    checkToken()

  }, [connection]);
  return (
    <div>
      {  localStorage.getItem('isConnected') !== "false" && connection !== "false" ? <Router history={history}>
        <Switch>
          <Redirect exact from='/' to='/dashboard' />
          <Route exact path='/dashboard' render={props => <PageDashboard {...props} />} />
          <Route exact path='/stores' render={props => <PageStore {...props} />} />
          <Route exact path='/stores/view/:id' render={props => <PageViewStore {...props} />} />
          <Route exact path='/stores/view/category-item/:branch/:id' render={props => <PageViewCategoryItem {...props} />} />
          <Route exact path='/signup' render={props => <PageRegister {...props} />} />
          <Route exact path='/signin' render={props => <PageLogin {...props} />} />
          <Route exact path='/verify' render={props => <PagesSuccessMessage {...props} />} />
          <Route exact path='/account' render={props => <PageAccount {...props} />} />
          <Route exact path='/forgot' render={props => <PageForgotPassword {...props} />} />
          <Route exact path='/reset-password' render={props => <PageResetPassword {...props} />} />
          <Route exact path='/branch/qr_code_generator' render={props => <PageQRCode {...props} />} />
          <Route exact path='/transactions' render={props => <PageTransaction {...props} />} />
          <Route exact path='/payment/:id' render={props => <PagePayment {...props} />} />
          <Route exact path='/history/view/payment' render={props => <PagePaymentHistory {...props} />} />
          <Route exact path='*' component={PageNotFound} />
        </Switch>
      </Router>
        : <PageServerError />}
    </div>
  )
};

const mapStateToProps = ({ auth }) => {
  return { auth }
}


export default connect(mapStateToProps, { isUserTokenAuthenticated })(Navigator);
