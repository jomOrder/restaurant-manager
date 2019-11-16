import React, { Component } from 'react'
import SideNav from '../SideNav/SideNav';
import Header from '../Header/Header';
import Footer from '../Footer/Footer';

import PageDashboard from '../../pages/PageDashboard/PageDashboard';
import Navigator from "../../navigation/index";

class App extends Component {


  render() {
    return (
      <div id="wrapper">
        <SideNav />
        <div id="page-wrapper" className="gray-bg">
          <div className="wrapper wrapper-content animated fadeInRight">
            <Header />
            <Navigator />
          </div>
          <Footer />
        </div>
      </div>
    )
  }

}


export default App;
