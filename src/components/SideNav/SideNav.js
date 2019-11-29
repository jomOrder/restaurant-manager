import React from 'react';


const SideNav = () => {
  return (
    <div>
      <div id="wrapper">
        <nav className="navbar-default navbar-static-side" role="navigation">
          <div className="sidebar-collapse">
            <ul className="nav metismenu" id="side-menu">
              <li className="nav-header">
                <div className="dropdown profile-element">
                  <a data-toggle="dropdown" className="dropdown-toggle" href="#">
                    <span className="text-muted text-xs block"> Account <b className="caret"></b></span>
                  </a>
                  <ul className="dropdown-menu animated fadeInRight m-t-xs">
                    <li>
                      <a className="dropdown-item" href="/profile">Account</a>
                    </li>
                    <li className="dropdown-divider"></li>
                    <li>
                      <a className="dropdown-item" href="/login">Logout</a>
                    </li>
                  </ul>
                </div>
              </li>
              <li>
                <a href="/">
                  <i className="fa fa-dashboard"></i>
                  <span className="nav-label">Dashboard</span>
                </a>
              </li>
              <li>
                <a href="#">
                  <i className="fa fa-car"></i>
                  <span className="nav-label">Car Park</span>
                  <span className="fa arrow"></span>
                </a>
                <ul className="nav nav-second-level collapse">
                  <li>
                    <a href="/carpark">Car Park</a>
                  </li>
                </ul>
              </li>
            </ul>
          </div>
        </nav>
      </div>
    </div>
  )
};


export default SideNav;
