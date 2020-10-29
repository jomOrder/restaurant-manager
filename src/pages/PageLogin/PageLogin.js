import React, { useEffect, useState, useRef } from 'react';
import { useForm } from 'react-hook-form';
import { useHistory } from 'react-router-dom'
import Notification from 'rc-notification';
import TopBarProgress from "react-topbar-progress-indicator";
import 'rc-notification/assets/index.css';
import Modal from 'react-awesome-modal'
import HashLoader from 'react-spinners/HashLoader'
import { css } from "@emotion/core";
import './index.css';
import qs from 'qs';
import { Base64 } from 'js-base64';
import store from 'storejs';
import { connect } from 'react-redux';
import { userLogin } from '../../actions'
import { toaster } from 'evergreen-ui'
import { setTime } from 'zent/es/datetimepicker/utils';


TopBarProgress.config({
    barColors: {
        "0": "#be1c1c",
        "0.5": "#be1c1c",
        "1.0": "#be1c1c"
    },
    shadowBlur: 1
});


let notification = null;
Notification.newInstance({}, (n) => notification = n);
const override = css`
  display: block;
  margin: 20px auto;
`;

const PageLogin = ({ location, auth, userLogin }) => {
    let history = useHistory();
    const mounted = useRef();

    const { register, errors, handleSubmit, watch } = useForm();
    const [username, setUsername] = useState(null);
    const [token, setToken] = useState('');
    const [loading, setLoading] = useState(true);

    const [values, setValues] = useState({
        showLoading: false,
        isValid: ''
    });

    const onSubmit = (data) => {
        userLogin(data);
        setValues({ isValid: 'is-valid', showLoading: true })
    }

    const notifyErr = (message) => {
        console.log("Hello")
        return toaster.danger(message)
    }

    const checkToken = () => {
        setTimeout(() => {
            setValues({ isValid: '', showLoading: false })
            if (!auth.token) return notifyErr(auth.message)
            localStorage.setItem('token', auth.token);
            store.set('profile', auth.merchant)
            toaster.success("User has been login successfully")
            setTimeout(() => {
                history.push('/');
            }, 500)
        }, 800)
    };

    useEffect(() => {
        if (!mounted.current) {
            // do componentDidMount logic
            setTimeout(() => {
                setLoading(false);
            }, 400)
            if (location.search) {
                let email = qs.parse(location.search, { ignoreQueryPrefix: true }).authorization
                let decodedUsername = Base64.decode(email)
                setUsername(decodedUsername)
                //document.getElementById("email_new").value = username;
            }
            mounted.current = true;
        } else {
            if (auth.err) checkToken()
        
        }

       
        
    }, [username, auth, loading]);

    return (
        <div class="site-wrapper overflow-hidden">
            {loading ? <TopBarProgress /> : false}
            <Modal visible={values.showLoading} width="100" height="110" effect="fadeInUp">
                <HashLoader
                    css={override}
                    size={35}
                    color={"#123abc"}
                    loading={values.showLoading}
                />
                <span style={{ margin: "5px 0 0 17px" }}>Loading...</span>
            </Modal>
            <div class="sign-page">
                <div class="site-wrapper contact-wrapper">
                    <div class="container">
                        <div class="row justify-content-center">
                            <div class="col-lg-7 col-xl-6">
                                <div class="main-block text-center">
                                    <div class="omega-form">
                                        <form onSubmit={handleSubmit(onSubmit)}>
                                            <div class="form-title text-center pb--25">
                                                <a href="https://thejomorder.com"><img className="logo-img" style={{ width: "360px" }} src="../assets/images/JomOrder-logo.png" alt="logo" /></a>
                                                <h3 className="title">Sign in to JomOrder Menu</h3>
                                                <p>Enter your details below.</p>
                                            </div>
                                            <div class="form-group">
                                                <input ref={register({ required: true, pattern: /^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$/ })} id="email_new" className={"form-control form-control-lg " + (errors.email ? 'is-invalid' : values.isValid)} name="email" type="email" placeholder="Email address" />
                                                <div style={{ marginBottom: 10 }} className="invalid-feedback">
                                                    {errors.email && 'email is required.'}
                                                </div>
                                                <input className={"form-control form-control-lg " + (errors.password ? 'is-invalid' : values.isValid)} ref={register({ required: true, minLength: 3 })} name="password" type="password" placeholder="Password" />
                                                <div className="invalid-feedback">
                                                    {errors.password && 'password required'}
                                                </div>
                                            </div>
                                            <div class="form-group form-check-label">
                                                <label for="tarms-check">
                                                    <input class="d-none" type="checkbox" id="tarms-check" /><span class="checkbox"></span>
                                                    <p>Keep me signed in</p>
                                                </label>
                                            </div>
                                            <div class="form-group button-block text-center">
                                                <button disabled={values.showLoading ? 'disabled' : ''} value="E" type="submit" class="form-btn btn--primary hvr-bounce-to-left">Sign in</button>
                                                <p class="sign-up-text">Don't have an account?<a href="/signup">Sign up</a></p>
                                            </div>
                                        </form>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

const mapStateToProps = ({ auth }) => {
    return { auth }
}


export default connect(mapStateToProps, { userLogin })(PageLogin);


// <div class="omga-02__content-text section-title order-lg-1">
// <div class="site-wrapper overflow-hidden ">

// </div>

// </div>


{/* <div className="splash-container">
<Modal visible={values.showLoading} width="100" height="110" effect="fadeInUp">
    <HashLoader
        css={override}
        size={35}
        color={"#123abc"}
        loading={values.showLoading}
    />
    <span style={{ margin: "5px 0 0 17px" }}>Loading...</span>
</Modal>
<div className="card" style={{ marginTop: "140px" }}>
    <div className="card-header text-center"><a href="/"><img className="logo-img" style={{ width: "240px" }} src="../assets/images/JomOrder-logo.png" alt="logo" /></a><span className="splash-description">Let's get started. <br />  No credit card, no commitments.</span></div>
    <div className="card-body">
        <form onSubmit={handleSubmit(onSubmit)}>
            <div className="form-group">
                <input ref={register({ required: true, pattern: /^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$/ })} className={"form-control form-control-lg " + (errors.email ? 'is-invalid' : values.isValid)} type="email" id="email" name="email" placeholder="E-mail" autoComplete="off" />
                <div className="invalid-feedback">
                    {errors.email && 'email is required.'}
                </div>
            </div>
            <div className="form-group">
                <input className={"form-control form-control-lg " + (errors.password ? 'is-invalid' : values.isValid)} ref={register({ required: true, minLength: 3 })} name="password" type="password" placeholder="Password" />
                <div className="invalid-feedback">
                    {errors.password && 'password required'}
                </div>
            </div>
            <div className="form-group pt-2">
                <button disabled={values.showLoading ? 'disabled' : ''} value="E" className="btn btn-block btn-primary" type="submit">Signin</button>
            </div>
        </form>
    </div>
    <div className="card-footer bg-white p-0  ">
        <div className="card-footer-item card-footer-item-bordered">
            <a href="/signup" className="footer-link">Create An Account</a></div>
        <div className="card-footer-item card-footer-item-bordered">
            <a href="/forgot" className="footer-link">Forgot Password</a>
        </div>
    </div>
</div>
<p >Copyright © 2020 JomOrder Inc. All Rights Reserved.</p>
</div> */}