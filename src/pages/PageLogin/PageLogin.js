import React, { Component } from 'react';
import SimpleReactValidator from 'simple-react-validator';
import ReactLoading from 'react-loading';

import API from '../../services/API';

import logo from '../../../public/images/icon.png'

const divStyle = {
  height: '1200px'
};

const showBtn = {
  textAlign: 'center',
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
          message: 'Password does not match',
          rule: (val, params, validator) => {
            return validator.helpers.testRegex(val,/(?=.*[a-z])/i) && params.indexOf(val) === -1
          },
          messageReplace: (message, params) => message.replace('', this.helpers.toSentence(params)),  // optional
          required: true
        }
      },
      showMessages() {
        return 'email invalid please try again!'
      }

    })

  }

  state = {
    username: null,
    password: null,
    message: null,
    show: false,
    showLoading: false
  };


  async handleLoginUser() {
    return await API.loginUser(this.state.username, this.state.password);
  };

  async submitForm() {
    try {
      if (this.validator.allValid()) {
        const res = await this.handleLoginUser();
        console.log(res)
        if (res.data.success) {
          this.setState({
            show: true,
            message: '',
            showLoading: true
          });
          localStorage.setItem('user', JSON.stringify(res.data));
          setTimeout(() => {
            this.props.history.push('/choose-account')
          }, 2500);
        }

      } else {

        this.validator.showMessages();
        this.forceUpdate();
      }
    } catch (e) {
      this.setState({
        message: e.message
      });
    }

  }

  componentDidMount() {

  };
  componentWillMount() {

  }

  render() {

    return (
        <div className="gray-bg" style={divStyle}>
          <div className="middle-box text-center loginscreen animated fadeInDown">
            <div>
              <div>
                <img alt="image" className="-square-full" width="100" src={logo} />
              <h1 className="logo-name"></h1>
            </div>
            <h2 style={h1Style}>PARKAIDE</h2>
            <p style={pStyle}>Welcome to ParkAide</p>
            <div className="form-group">
              <input
                type="text"
                onChange={(e) => this.setState({ username: e.target.value })}
                className="form-control"
                placeholder="username"
              />
              <div>{this.validator.message('username', this.state.username, 'required|username')}</div>
            </div>
            <div className="form-group">
              <input
                type="password"
                onChange={(e) => {this.setState({ password: e.target.value })}}
                className="form-control"
                placeholder="Password"
                required
              />
              <div>{this.validator.message('password', this.state.password, 'required|password')}</div>
              <div>{this.state.message}</div>
            </div>
              <small>Forgot password?</small>

              <button className="btn btn-primary block full-width m-b" onClick={() => this.submitForm()} disabled={this.state.show} >
                {this.state.showLoading ? (
                  <ReactLoading type={"spokes"} color={"white"} height={23} width={25} />
                ) : (
                  <span>Login</span>
                )}
              </button>

              <a className="block full-width m-b" onClick={() => this.props.history.push('/register')}>Create New Account</a>
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

