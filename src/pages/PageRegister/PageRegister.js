import React, { Component } from 'react';
import API from '../../services/API';

import logo from '../../../public/images/icon.png'
import SimpleReactValidator from "simple-react-validator";

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

  state = {
    username: null,
    password: null,
  };

  constructor(props) {
    super(props);
    this.validator = new SimpleReactValidator({});
  }

  onUsernameChange(event) {

  }

  static onSubmitForm(e) {
    e.preventDefault();
  }

  async createNewUser() {
    if (this.validator.allValid()) {

      const response = await API.createUser(this.state.username, this.state.password);
      if (response.data.success) {
        setTimeout(() => {
          this.props.history.push('/login')
        }, 2000)
      }

    } else {
      this.validator.showMessages();
      this.forceUpdate();
    }

  };

  componentDidMount() {

  };

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
            <form onSubmit={this.onSubmitForm}>
              <div className="form-group">
                <input
                  onChange={(e) => { this.setState({ username: e.target.value }) }}
                  type="text"
                  className="form-control"
                  placeholder="username"
                  required
                />
                <div>{this.validator.message('username', this.state.username, 'required|username')}</div>

              </div>
              <div className="form-group">
                <input
                  type="password"
                  onChange={(el) => this.setState({ password: el.target.value })}
                  className="form-control"
                  placeholder="Password"
                  required
                />
                <div>{this.validator.message('password', this.state.password, 'required|password')}</div>

              </div>
              <button onClick={() => this.createNewUser()} className="btn btn-primary block full-width m-b">Register</button>
            </form>
            <a onClick={() => this.props.history.push('/login')} className="full-width m-b" >Already have an account?</a>
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

