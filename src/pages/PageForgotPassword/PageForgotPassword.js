import React, { useEffect, useState } from 'react';
import ReactLoading from 'react-loading';
import { useForm } from 'react-hook-form';
import API from '../../services/API';
import SuccessModal from '../../components/SuccessModal/SuccessModal';


const PageForgotPassword = props => {
  const { register, errors, handleSubmit } = useForm(); // initialise the hook
  const [values, setValues] = useState({
    email: null,
    isValid: '',
    success: false,
    showLoading: false,
  });

  const onSubmit = (data) => {
    console.log(data)
    setValues({ isValid: 'is-valid', showLoading: true });
    setTimeout(() => {
      setValues({ success: true });
    }, 2000)
  }

  return (
    <div>
      <div class="splash-container">
        {
          !values.success ? <div class="card" style={{ marginTop: "100px" }}>
          <div class="card-header text-center"><img class="logo-img" style={{ width: "240px" }} src="../assets/images/jom_logo.png" alt="logo" /><span class="splash-description">Please enter your user information.</span></div>
          <div class="card-body">
            <form onSubmit={handleSubmit(onSubmit)}>
              <p>Don't worry, we'll send you an email to reset your password.</p>
              <div className="form-group">
                <input ref={register({ required: true, pattern: /^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$/ })} className={"form-control form-control-lg " + (errors.email ? 'is-invalid' : values.isValid)} type="email" name="email" placeholder="E-mail" autoComplete="off" />
                <div className="invalid-feedback">
                  {errors.email && 'email is required.'}
                </div>
              </div>
              <div className="form-group pt-2">
                <button disabled={values.showLoading ? 'disabled' : ''} value="E" className="btn btn-block btn-primary" type="submit">
                  {values.showLoading ?
                    <div style={{ textAlign: "center", display: "flex" }}><span style={{ textAlign: 'center', margin: "0 auto" }}>Reset My Password</span><ReactLoading type={"spin"} color={"#444"} height={'8%'} width={'8%'} /></div>
                    :
                    <span>Reset My Password</span>
                  }
                </button>
              </div>            </form>
          </div>
          <div class="card-footer text-center">
            <span>Don't have an account? <a href="/signup">Sign Up</a></span>
          </div>

        </div> : <SuccessModal />
        }
        <p >Copyright © 2020 JomOrder Inc. All Rights Reserved.</p>

      </div>
    </div>
  )
};

export default PageForgotPassword;

