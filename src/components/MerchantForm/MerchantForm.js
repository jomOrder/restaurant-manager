import { useHistory } from "react-router-dom";
import React, { forwardRef, useState, useEffect, useImperativeHandle } from 'react';
import { useForm } from 'react-hook-form'
import ReactLoading from "react-loading";

const MerchantForm = forwardRef((props, ref) => {

    const { errors, handleSubmit, register } = useForm();
    let history = useHistory();
    const [values, setValues] = useState({
        isValid: '',
        showLoading: false
    })

    useImperativeHandle(ref, () => ({

        hanldeValidInput() {
            setValues({ isValid: 'is-valid', showLoading: true })
            setTimeout(() => {
                history.push("/auth/verify/check");
            }, 2000)
        }

    }));

    useEffect(() => {
    }, []);
    return (
        <form onSubmit={handleSubmit(props.onSubmitMerchant)}>
             <div className="form-group">
                <input className={"form-control form-control-lg " + (errors.first_name ? 'is-invalid' : values.isValid)} ref={register({ required: true })} type="text" name="first_name" placeholder="First Name" autoComplete="off" onChange={(event) => props.handleProgressBarOnChange(event, 4)} />
                <div class="invalid-feedback">
                    {errors.first_name && 'First Name is required.'}
                </div>
            </div>
            <div className="form-group">
                <input className={"form-control form-control-lg " + (errors.last_name ? 'is-invalid' : values.isValid)} ref={register({ required: true })} type="text" name="last_name" placeholder="Last Name" autoComplete="off" onChange={(event) => props.handleProgressBarOnChange(event, 5)} />
                <div class="invalid-feedback">
                    {errors.last_name && 'Last Name is required.'}
                </div>
            </div>
            <div className="form-group">
                <input className={"form-control form-control-lg " + (errors.mobile ? 'is-invalid' : values.isValid)} ref={register({ required: true })} type="phone" name="mobile" placeholder="Mobile Number" autoComplete="off" onChange={(event) => props.handleProgressBarOnChange(event, 6)} />
                <div class="invalid-feedback">
                    {errors.mobile && 'Mobile Number is required.'}
                </div>
            </div>
            <div className="form-group">
                <input className={"form-control form-control-lg " + (errors.restaurant ? 'is-invalid' : values.isValid)} ref={register({ required: true })} type="text" name="restaurant" placeholder="Restaurant Name" autoComplete="off" onChange={(event) => props.handleProgressBarOnChange(event, 7)} />
                <div class="invalid-feedback">
                    {errors.restaurant && 'Restaurant Name is required.'}
                </div>
            </div>
            <div className="form-group">
                <input className={"form-control form-control-lg " + (errors.registerNo ? 'is-invalid' : values.isValid)} ref={register({ required: true })} type="text" name="registerNo" placeholder="Register Number" autoComplete="off" onChange={(event) => props.handleProgressBarOnChange(event, 8)} />
                <div class="invalid-feedback">
                    {errors.registerNo && 'Register Number is required.'}
                </div>
            </div>
            <div className="form-group pt-2">
                <button disabled={values.showLoading ? 'disabled' : ''} value="E" className="btn btn-block btn-primary" type="submit">
                    {values.showLoading ?
                        <div style={{ textAlign: "center", display: "flex" }}><span style={{ textAlign: 'center', margin: "0 auto" }}>Sign Up</span><ReactLoading type={"spin"} color={"#444"} height={'8%'} width={'8%'} /></div>
                        :
                        <span>Sign Up</span>
                    }
                </button>
            </div>
        </form>
    )

});


export default MerchantForm;