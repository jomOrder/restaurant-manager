import React, { Component } from 'react';


class PageRegister extends Component {
  render() {
    return (
      <div className="gray-bg" style="height: 1200px">
        <div className="middle-box text-center loginscreen animated fadeInDown">
          <div>
            <div>
              <img alt="image" className="-square-full" width="100" src="/public/images/icon.png" />
              <h1 className="logo-name"></h1>
            </div>
            <h2 style="color:#57606f; font-size:45px; font-weight: 400">PARKAIDE</h2>
            <p style="font-weight:600">Welcome to ParkAide</p>
            <div className="form-group">
              <input
                type="username"
                className="form-control"
                placeholder="username"
                required
              />
            </div>
            <div className="form-group">
              <input
                type="password"
                className="form-control"
                placeholder="Password"
                required
              />
            </div>
            <button className="btn btn-primary block full-width m-b">Register</button>
            {/*<p>{{message}}</p>*/}
            <p className="m-t">
              <small>Copyright PARKAIDE &copy; 2018</small>
            </p>
          </div>
        </div>
      </div>
    )
  }
}

export default PageRegister;
