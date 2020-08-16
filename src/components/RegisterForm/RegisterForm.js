import React, { useEffect, useState, forwardRef } from 'react';
import { useForm } from 'react-hook-form';
import { useAlert } from 'react-alert'
import _ from 'lodash';
import ReactLoading from "react-loading";


const RegisterForm = forwardRef(({ onSubmitSignup }, ref) => {
    const { register, errors, handleSubmit, watch } = useForm(); // initialise the hook
    const [user, setUser] = useState();
    const alert = useAlert()
    const [values, setValues] = useState({
        isValid: '',
        showLoading: false,
        validation: false,
    });

    const onSubmit = (data) => {
        let dataWithoutPass2 = _.omit(data, ['password2'])
        setUser(data);
        setValues({ isValid: 'is-valid', showLoading: true })

    }

   

    useEffect(() => {
       
    }, []);
    return (
        <div>
            <h3>Congratulations!</h3>
            <p>Sign up to get your 14 Days FREE TRIAL and check out your menu!</p>
            <form className="omga-03__form-shape-holder" onSubmit={handleSubmit(onSubmitSignup)}>
                <div class="omga-03__hero-form ">
                    <div class="form-group from-group--with-label">
                        <input className={"form-control form-control-lg " + (errors.username ? 'is-invalid' : values.isValid)} ref={register({ required: true })} type="text" name="username" placeholder="Username" autoComplete="off" />
                        <div className="invalid-feedback">
                            {errors.username && 'username is required.'}
                        </div>
                    </div>
                    <div class="form-group from-group--with-label">
                        <input ref={register({ required: true, pattern: /^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$/ })} className={"form-control form-control-lg " + (errors.email ? 'is-invalid' : values.isValid)} type="email" name="email" placeholder="E-mail" autoComplete="off" />
                        <div className="invalid-feedback">
                            {errors.email && 'email is required.'}
                        </div>
                    </div>
                    <div class="form-group from-group--with-label">
                        <input className={"form-control form-control-lg " + (errors.password ? 'is-invalid' : values.isValid)} ref={register({ required: true, minLength: 9, pattern: /(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,}/ })} name="password" type="password" placeholder="Password" />
                        <div className="invalid-feedback">
                            {errors.password && 'password required min 8 length. at least one number, one lowercase and one uppercase letter'}
                        </div>
                    </div>
                    <div class="form-group from-group--with-label">
                        <input className={"form-control form-control-lg " + (errors.password2 ? 'is-invalid' : values.isValid)} type="password" name="password2" placeholder="Confirm" ref={register({
                            required: true, validate: (value) => {
                                return value === watch('password');
                            }
                        })} />
                        <div className="invalid-feedback">
                            {errors.password2 && 'password does not match '}
                        </div>
                    </div>
                    <button type="submit" style={{ borderRadius: 30, height: 45, minWidth: 90, fontWeight: 300, fontSize: 15, paddingLeft: 45, paddingRight: 45 }} class="btn--primary">Signup</button>
                </div>
            </form>
        </div>
    )
});

export default RegisterForm;