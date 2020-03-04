import React from 'react';
import { render } from 'react-dom';
import * as Sentry from '@sentry/browser';
import App from './components/App/App';
import { transitions, positions, Provider as AlertProvider } from 'react-alert'
import AlertTemplate from 'react-alert-template-basic'

Sentry.init({dsn: "https://9c900031445148e8a524791707b2aaf5@sentry.io/2962883"});


const options = {
    position: positions.BOTTOM_LEFT,
    timeout: 3000,
    offset: '30px',
    transition: transitions.SCALE,
  }
   
  const Root = () => (
    <AlertProvider template={AlertTemplate} {...options}>
      <App />
    </AlertProvider>
  )

render(<Root />, document.getElementById('root'));
