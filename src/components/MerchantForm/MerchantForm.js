import React, { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form'

const MerchantForm = props => {

    const { errors, handleSubmit, register } = useForm();

    const [values, setValues] = useState({
        isValid: ''
    })

    const onSubmit = (data) => {
        console.log(data)
        setValues({ isValid: 'is-valid', loading: 100 })
    }

    useEffect(() => {

    }, []);
    return (
        <form onSubmit={handleSubmit(onSubmit)}>
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
                <button className="btn btn-block btn-primary" type="submit">Sign Up</button>
            </div>
        </form>
    )

}


export default MerchantForm;