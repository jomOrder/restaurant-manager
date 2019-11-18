import React, { Component } from 'react';
import SideNav from '../../components/SideNav/SideNav';
import Header from "../../components/Header/Header";
import Footer from "../../components/Footer/Footer";

class PageDashboard extends Component {
  render() {
    return (
      <div id="wrapper">
        <SideNav />
        <div id="page-wrapper" className="gray-bg">
          <div className="wrapper wrapper-content animated fadeInRight">
            <Header />
            <div>
              <div className="wrapper wrapper-content">
                <div className="row">
                  <div className="col-lg-2">
                    <div className="ibox ">
                      <div className="ibox-title">
                        <span className="label label-success float-right">Monthly</span>
                        <h5>Views</h5>
                      </div>
                      <div className="ibox-content">
                        <h1 className="no-margins">386,200</h1>
                        <div className="stat-percent font-bold text-success">98% <i className="fa fa-bolt"></i></div>
                        <small>Total views</small>
                      </div>
                    </div>
                  </div>
                  <div className="col-lg-2">
                    <div className="ibox ">
                      <div className="ibox-title">
                        <span className="label label-info float-right">Annual</span>
                        <h5>Orders</h5>
                      </div>
                      <div className="ibox-content">
                        <h1 className="no-margins">80,800</h1>
                        <div className="stat-percent font-bold text-info">20% <i className="fa fa-level-up"></i></div>
                        <small>New orders</small>
                      </div>
                    </div>
                  </div>

                  <div className="col-lg-4">
                    <div className="ibox ">
                      <div className="ibox-title">
                        <span className="label label-primary float-right">Today</span>
                        <h5>visits</h5>
                      </div>
                      <div className="ibox-content">

                        <div className="row">
                          <div className="col-md-6">
                            <h1 className="no-margins">406,42</h1>
                            <div className="font-bold text-navy">44% <i className="fa fa-level-up"></i>
                              <small>Rapid pace</small>
                            </div>
                          </div>
                          <div className="col-md-6">
                            <h1 className="no-margins">206,12</h1>
                            <div className="font-bold text-navy">22% <i className="fa fa-level-up"></i>
                              <small>Slow pace</small>
                            </div>
                          </div>
                        </div>


                      </div>
                    </div>
                  </div>
                  <div className="col-lg-4">
                    <div className="ibox ">
                      <div className="ibox-title">
                        <h5>Monthly income</h5>
                        <div className="ibox-tools">
                          <span className="label label-primary">Updated 12.2015</span>
                        </div>
                      </div>
                      <div className="ibox-content no-padding">
                        <div className="flot-chart m-t-lg">
                          <div className="flot-chart-content" id="flot-chart1"></div>
                        </div>
                      </div>

                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <Footer />
        </div>
      </div>


    )
  }
};

export default PageDashboard;
