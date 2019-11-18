import React, { Component } from 'react';
import API from '../../services/API';

import logo from '../../../public/images/icon.png'

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

class PageRegister extends Component {

  constructor(props) {
    super(props);
    this.state = {
      message: false,
      username: null,
      password: null,
    }
  }


   async createNewUser() {
    const response = await API.createUser("eqewr434324234234erw", "jsonis323r2e");
    this.setState({ password: response.data.data.password });

  };

  componentDidMount() {

  };
  componentDidUpdate(prevProps, prevState, snapshot) {

  }
  componentWillUnmount() {

  }

  render() {
    return (
      <div className="gray-bg" style={divStyle}>
        <div className="middle-box text-center loginscreen animated fadeInDown">
          <div>
            <div>
              <img alt="image" className="-square-full" width="100" src={logo} />
              <h1 className="logo-name" />
            </div>
            <h2 style={h1Style}>PARKAIDE</h2>
            <p style={pStyle}>Welcome to ParkAide </p>
            <div className="form-group">
              <input
                type="text"
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
            <button onClick={() => this.createNewUser()} className="btn btn-primary block full-width m-b">Register</button>
            <p>{this.state.message}</p>
            <small>Already have an account?</small>

            <button onClick={() => this.props.history.push('/login')} className="btn btn-primary block full-width m-b">Login</button>

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

