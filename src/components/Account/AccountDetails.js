import React from 'react';

const divStyle = {
  marginTop: '30px'
};
const divText = {
  display: 'flex',
  justifyContent: 'flex-start'

};

const AccountDetails = (props) => {
  return (
    <div className="col-lg-12" style={divStyle}>
      <div className="contact-box center-version">
        <a href="/" >
          <h3 className="m-b-xs" style={divText}><strong>{props.account}</strong></h3>
          <div className="font-bold" style={divText}><p><i className="fa fa-star"></i> Parker</p></div>
        </a>
      </div>
    </div>
  )
};

export default AccountDetails;
