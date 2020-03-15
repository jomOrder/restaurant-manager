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
                <input className={"form-control form-control-lg " + (errors.registerNo ? 'is-invalid' : values.isValid)} ref={register({ required: true })} type="text" name="registerNo" placeholder="Register Number" autoComplete="off" onChange={(event) => props.handleProgressBarOnChange(event, 4)} />
                <div class="invalid-feedback">
                    {errors.registerNo && 'Register Number is required.'}
                </div>
            </div>
            <div className="form-group">
                <input className={"form-control form-control-lg " + (errors.name ? 'is-invalid' : values.isValid)} ref={register({ required: true })} type="text" name="name" placeholder="Restaurant Name" autoComplete="off" onChange={(event) => props.handleProgressBarOnChange(event, 5)} />
                <div class="invalid-feedback">
                    {errors.name && 'restaurant name is required.'}
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