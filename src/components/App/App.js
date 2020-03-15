import React from 'react'
import { connect } from 'react-redux';
import Navigator from "../../navigation/index";

const App = () => {
  return (
    <Navigator />
  )
}
export default connect()(App);
