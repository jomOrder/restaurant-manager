import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useHistory } from 'react-router-dom'
import Notification from 'rc-notification';
import 'rc-notification/assets/index.css';
import Modal from 'react-awesome-modal'
import HashLoader from 'react-spinners/HashLoader'
import { css } from "@emotion/core";
import './index.css';
import qs from 'qs';
import { Base64 } from 'js-base64';

import { connect } from 'react-redux';
import { userLogin } from '../../actions'
import { toaster } from 'evergreen-ui'

let notification = null;
Notification.newInstance({}, (n) => notification = n);
const override = css`
  display: block;
  margin: 20px auto;
`;

const PageLogin = ({ location, auth, userLogin }) => {
    let history = useHistory();
    const { register, errors, handleSubmit, watch } = useForm();
    const [username, setUsername] = useState(null);
    const [token, setToken] = useState('');
    const [values, setValues] = useState({
        showLoading: false,
        isValid: ''
    });

    const onSubmit = (data) => {
        userLogin(data);
        setValues({ isValid: 'is-valid', showLoading: true})
    }

    const notifyErr = (message) => {
        toaster.danger(message)
    }

    const checkToken = () => {
        setTimeout(() => {
            setValues({ isValid: '', showLoading: false})
            if(!auth.token) return notifyErr(auth.message)
            localStorage.setItem('token', auth.token);
            toaster.success("User has been login successfully")
            setTimeout(() => {
                history.push('/');
            }, 1000)
        }, 2000)
    };

    useEffect(() => {
        if(location.search) {
            let email = qs.parse(location.search, { ignoreQueryPrefix: true }).authorization
            let decodedUsername = Base64.decode(email)
            setUsername(decodedUsername)
            document.getElementById("email").value = username;
        }
        if(auth.err) checkToken()
    }, [username, auth]);

    return (
        <div>
            <div className="splash-container">
                <Modal visible={values.showLoading} width="100" height="110" effect="fadeInUp">
                    <HashLoader
                        css={override}
                        size={35}
                        color={"#123abc"}
                        loading={values.showLoading}
                    />
                    <span style={{margin: "5px 0 0 17px"}}>Loading...</span>
                </Modal>
                <div className="card" style={{ marginTop: "140px" }}>
                    <div className="card-header text-center"><a href="/"><img className="logo-img" style={{ width: "240px" }} src="../assets/images/jom_logo.png" alt="logo" /></a><span className="splash-description">Let's get started. <br />  No credit card, no commitments.</span></div>
                    <div className="card-body">
                        <form onSubmit={handleSubmit(onSubmit)}>
                            <div className="form-group">
                                <input ref={register({ required: true, pattern: /^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$/ })} className={"form-control form-control-lg " + (errors.email ? 'is-invalid' : values.isValid)} type="email" id="email"  name="email" placeholder="E-mail"  autoComplete="off" />
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
            </div>
        </div>
    )

}


const mapStateToProps = ({ auth }) => {
    return { auth }
}


export default connect(mapStateToProps, { userLogin })(PageLogin);


