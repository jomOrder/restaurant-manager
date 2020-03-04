import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import ReactLoading from "react-loading";

const PageResetPassword = () => {


    const { errors, handleSubmit, register, watch } = useForm();

    const [values, setValues] = useState({
        isValid: '',
        showLoading: false,
        success: false,
        password: null,
        newPassword: null
    });

    const onSubmit = (data) => {
        console.log(data)
        setValues({ isValid: 'is-valid', showLoading: true });
        setTimeout(() => {
            setValues({ success: true });
        }, 2000)
    }

    useEffect(() => {

    }, []);

    return (
        <div>
            <div class="splash-container">
                <div class="card" style={{ marginTop: "100px" }}>
                    <div class="card-header text-center"><img class="logo-img" src="../assets/images/logo-5.png" alt="logo" /><span class="splash-description">Please enter your user information.</span></div>
                    <div class="card-body">
                        <form onSubmit={handleSubmit(onSubmit)}>
                            <p>please enter your information.</p>
                            <div className="form-group">
                                <input className={"form-control form-control-lg " + (errors.password1 ? 'is-invalid' : values.isValid)} ref={register({ required: true, minLength: 9, pattern: /(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,}/ })} name="password1" type="password" placeholder="New Password" />
                                <div className="invalid-feedback">
                                    {errors.password1 && 'password required min 8 length. at least one number, one lowercase and one uppercase letter'}
                                </div>
                            </div>
                            <div className="form-group">
                                <input className={"form-control form-control-lg " + (errors.password2 ? 'is-invalid' : values.isValid)} type="password" name="password2" placeholder="Confirm" ref={register({
                                    required: true, validate: (value) => {
                                        return value === watch('password1');
                                    }
                                })} />
                                <div className="invalid-feedback">
                                    {errors.password2 && 'password does not match '}
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
                            </div>
                        </form>
                    </div>
                </div>
                <p >Copyright © 2020 Veggible Inc. All Rights Reserved.</p>

            </div>
        </div>
    )

};

export default PageResetPassword;