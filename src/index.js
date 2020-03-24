import React from 'react';
import { render } from 'react-dom';
import * as Sentry from '@sentry/browser';
import App from './components/App/App';
import { transitions, positions, Provider as AlertProvider } from 'react-alert'
import AlertTemplate from 'react-alert-template-basic'
import { Provider } from 'react-redux'


import thunk from 'redux-thunk'
import configureStore from './store';
import reducer from './reducers'
Sentry.init({ dsn: "https://9c900031445148e8a524791707b2aaf5@sentry.io/2962883" });

const options = {
  position: positions.BOTTOM_LEFT,
  timeout: 3000,
  offset: '30px',
  transition: transitions.SCALE,
}

const Root = () => (
  <AlertProvider template={AlertTemplate} {...options}>
    <Provider store={configureStore()}>
      <App />
    </Provider>
  </AlertProvider>

)

render(<Root />, document.getElementById('root'));
