import React, { Component } from 'react';
import API from '../../services/API';
import logo from "../../../public/images/icon.png";
import AccountDetails from '../../components/Account/AccountDetails';

const divStyle = {
  height: '1200px'
};

const cardStyle = {
  display: 'flex',
  justifyContent: 'center'
};

const h1Style = {

  color: '#57606f',
  fontSize: '45px',
  fontWeight: 400
};

const pStyle = {
  fontWeight: 600
};

class PageAccount extends Component {

  constructor(props){
    super(props);
  }
  state = {
    accounts: []
  };
  async handleWebAccount() {
    return await API.getAllWebAccount();

  }
  async getAllAccounts() {
    const res = await this.handleWebAccount();

    this.setState({
      accounts: res.data.result.emails
    });
    return res;
  }
   componentDidMount() {
    return this.getAllAccounts()
  }

  render() {

    const items = this.state.accounts.map((item, key) =>
      <AccountDetails key={item.id} account={item.email} />
    );

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

            <h3 style={pStyle}>Please select account to processed</h3>
              {items}
            <p className="m-t">
              <small>Copyright PARKAIDE &copy; 2018</small>
            </p>
          </div>
        </div>
      </div>
    )
  }

}

export default PageAccount;
