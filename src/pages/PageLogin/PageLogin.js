import React, { Component } from 'react';
import API from '../../services/API';


const divStyle = {
  height: '1200px'
};

const h1Style = {

  color: '#57606f',
  fontSize: '45px',
  fontWeight: 400
};

const pStyle = {
  fontWeight: 600
};

class PageLogin extends Component {

  constructor() {
    super()
  }


  createNewUser = () => {
    const addUser = API.createUser();
  };

  componentDidMount() {

  }

  render() {
    return (
        <div className="gray-bg" style={divStyle}>
          <div className="middle-box text-center loginscreen animated fadeInDown">
            <div>
              <div>
                <img alt="image" className="-square-full" width="100" src="Image" />
              <h1 className="logo-name"></h1>
            </div>
            <h2 style={h1Style}>PARKAIDE</h2>
            <p style={pStyle}>Welcome to ParkAide</p>
            <div className="form-group">
              <input
                type="email"
                className="form-control"
                placeholder="Email Address"
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
            <button className="btn btn-primary block full-width m-b">Login</button>
          {/*<p>{{message}}</p>*/}
          <small>Forgot password?</small>
          <p className="m-t">
            <small>Copyright PARKAIDE &copy; 2018</small>
          </p>
        </div>
        </div>
      </div>
    )
  }
}

export default PageLogin;

