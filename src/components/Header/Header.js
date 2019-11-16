import React from 'react';

const Header = () => {
  return (
    <div>
      <div className="row border-bottom">
        <nav className="navbar navbar-static-top" role="navigation">
          <div className="navbar-header">
            <a className="navbar-minimalize minimalize-styl-2 btn btn-primary " href="#"><i className="fa fa-bars"></i> </a>
          </div>
          <div className="navbar-header">
          </div>
          <ul className="nav navbar-top-links navbar-right">
            <li>
              <span className="m-r-sm text-muted welcome-message">Welcome </span>
            </li>

            <li>
              <a href="/login">
                <i className="fa fa-sign-out"></i> Log out
              </a>
            </li>
          </ul>
        </nav>
      </div>
    </div>
  )
};


export default Header;
