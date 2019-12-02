import React, { Component } from 'react';
import API from '../../services/API';

import logo from '../../../public/images/icon.png'
import SimpleReactValidator from "simple-react-validator";
import ReactLoading from "react-loading";

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
    showLoading: false,
  };

  constructor(props) {
    super(props);
    this.validator = new SimpleReactValidator({
      validators: {
        username: {  // name the rule
          message: 'email invalid please try again!',
          rule: (val, params, validator) => {
            return validator.helpers.testRegex(val,/^([a-zA-Z0-9_\-\.]+)@([a-zA-Z0-9_\-\.]+)\.([a-zA-Z]{2,5})$/i) && params.indexOf(val) === -1
          },
          messageReplace: (message, params) => message.replace(':values', this.helpers.toSentence(params)),  // optional
          required: true  // optional
        },
        password: {  // name the rule
          message: 'Password must be 8 character',
          rule: (val, params, validator) => {
            return validator.helpers.testRegex(val,/(?=.*[a-z])/i) && params.indexOf(val) === -1
          },
          messageReplace: (message, params) => message.replace('', this.helpers.toSentence(params)),  // optional
          required: true
        }
      }

    })
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
        this.setState({
          showLoading: true
        })
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
              <button onClick={() => this.createNewUser()} className="btn btn-primary block full-width m-b" disabled={this.state.showLoading}>
                {this.state.showLoading ? (
                  <ReactLoading type={"spokes"} color={"white"} height={23} width={25} />
                ) : (
                  <span>Register</span>
                )}
              </button>
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

