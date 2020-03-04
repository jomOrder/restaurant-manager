import React, { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import ReactLoading from 'react-loading';

const PageLogin = () => {
  const [values, setValues] = useState({
    email: null,
    password: null
  });

  useEffect(() => {
    return () => {};
  }, []);

  return (
    <div>
      <div>
      <div className="splash-container">
        <div className="card" style={{marginTop: "100px"}}>
            <div className="card-header text-center"><a href="../index.html"><img className="logo-img" style={{width: "170px"}} src="../assets/images/jom_logo.png" alt="logo" /></a><span className="splash-description">Log-in to veggible.</span></div>
            <div className="card-body">
                <form>
                    <div className="form-group">
                        <input className="form-control form-control-lg" id="username" type="text" placeholder="Username" autocomplete="off" />
                    </div>
                    <div className="form-group">
                        <input className="form-control form-control-lg" id="password" type="password" placeholder="Password" />
                    </div>
                    <div className="form-group">
                        <label className="custom-control custom-checkbox">
                            <input className="custom-control-input" type="checkbox" /><span className="custom-control-label">Remember Me</span>
                        </label>
                    </div>
                    <button type="submit" className="btn btn-primary btn-lg btn-block">Sign in</button>
                </form>
            </div>
            <div className="card-footer bg-white p-0  ">
                <div className="card-footer-item card-footer-item-bordered">
                    <a href="/signup" className="footer-link">Create An Account</a></div>
                <div className="card-footer-item card-footer-item-bordered">
                    <a href="forgot-password" className="footer-link">Forgot Password</a>
                </div>
            </div>
        </div>
        <p >Copyright © 2020 Veggible Inc. All Rights Reserved.</p>

    </div>
      </div>
    </div>
  );
};

export default PageLogin;

