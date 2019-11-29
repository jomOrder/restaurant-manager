import React, { Component } from 'react'
import SideNav from '../SideNav/SideNav';
import Header from '../Header/Header';
import Footer from '../Footer/Footer';

import PageDashboard from '../../pages/PageDashboard/PageDashboard';
import Navigator from "../../navigation/index";

class App extends Component {


  render() {
    return (
      <Navigator />
    )
  }

}


export default App;
