import React, { useEffect, useState, useCallback, useRef } from 'react';
import { connect } from 'react-redux'
import { userRegister, userCheck } from '../../actions'
import { useForm } from 'react-hook-form';
import { useAlert } from 'react-alert'
import _ from 'lodash';
import MerchantForm from '../MerchantForm/MerchantForm';
import ReactLoading from "react-loading";
const RegisterForm = ({ handleProgressBarOnChange, handleRegisterOnSubmit, userRegister, userCheck, auth }) => {
    const { register, errors, handleSubmit, watch } = useForm(); // initialise the hook
    const [user, setUser] = useState();
    const alert = useAlert()
    const [values, setValues] = useState({
        isValid: '',
        showLoading: false,
        validation: false,
    });

    const childRef = useRef();
    const onSubmit = (data) => {
        setUser(data);
        let credentials = { email: data.email };
        userCheck(credentials)
        setValues({ isValid: 'is-valid', showLoading: true })

    }

    const completeMerchant = () => {
        let data = _.omit(user, ['password2'])
        setUser(data);
        setTimeout(() => {
            handleRegisterOnSubmit(50, setValues({ validation: true }))
        }, 2000)
    }

    const checkUser = () => {
        setTimeout(() => {
            setValues({ isValid: '', showLoading: false })
            alert.error(auth.message)
        }, 500)
        
    }


    const onSubmitMerchant = useCallback((data) => {
        let merchant = data
        let complete_user = user;
        _.assign(complete_user, { merchant })
        setUser(complete_user)
        userRegister(user);
        handleRegisterOnSubmit(100)
        childRef.current.hanldeValidInput()
    })

    useEffect(() => {
        if (auth.err === 12) checkUser()
        if (auth.err === 0) completeMerchant()
    }, [auth]);
    return (
        <div>
            {
                !values.validation ? <form onSubmit={handleSubmit(onSubmit)}>
                    <div className="form-group">
                        <input className={"form-control form-control-lg " + (errors.username ? 'is-invalid' : values.isValid)} ref={register({ required: true })} type="text" name="username" placeholder="Username" autoComplete="off" onChange={(event) => handleProgressBarOnChange(event, 0)} />
                        <div className="invalid-feedback">
                            {errors.username && 'username is required.'}
                        </div>
                    </div>
                    <div className="form-group">
                        <input ref={register({ required: true, pattern: /^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$/ })} className={"form-control form-control-lg " + (errors.email ? 'is-invalid' : values.isValid)} type="email" name="email" placeholder="E-mail" autoComplete="off" onChange={(event) => handleProgressBarOnChange(event, 1)} />
                        <div className="invalid-feedback">
                            {errors.email && 'email is required.'}
                        </div>
                    </div>
                    <div className="form-group">
                        <input className={"form-control form-control-lg " + (errors.password ? 'is-invalid' : values.isValid)} ref={register({ required: true, minLength: 9, pattern: /(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,}/ })} name="password" type="password" placeholder="Password" onChange={(event) => handleProgressBarOnChange(event, 2)} />
                        <div className="invalid-feedback">
                            {errors.password && 'password required min 8 length. at least one number, one lowercase and one uppercase letter'}
                        </div>
                    </div>
                    <div className="form-group">
                        <input className={"form-control form-control-lg " + (errors.password2 ? 'is-invalid' : values.isValid)} type="password" name="password2" placeholder="Confirm" ref={register({
                            required: true, validate: (value) => {
                                return value === watch('password');
                            }
                        })} onChange={(event) => handleProgressBarOnChange(event, 3)} />
                        <div className="invalid-feedback">
                            {errors.password2 && 'password does not match '}
                        </div>
                    </div>
                    <div className="form-group pt-2">
                        <button disabled={values.showLoading ? 'disabled' : ''} value="E" className="btn btn-block btn-primary" type="submit">
                            {values.showLoading ?
                                <div style={{ textAlign: "center", display: "flex" }}><span style={{ textAlign: 'center', margin: "0 auto" }}>Register My Account</span><ReactLoading type={"spin"} color={"#444"} height={'8%'} width={'8%'} /></div>
                                :
                                <span>Register My Account</span>
                            }
                        </button>
                    </div>
                </form> : <MerchantForm ref={childRef} onSubmitMerchant={onSubmitMerchant} handleProgressBarOnChange={handleProgressBarOnChange} />}
        </div>
    )
};

const mapStateToProps = ({ auth }) => {
    return { auth }
}

export default connect(mapStateToProps, { userRegister, userCheck })(RegisterForm);