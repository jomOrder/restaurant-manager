import React, { useState, useEffect, forwardRef, useImperativeHandle } from 'react';
import { useForm } from 'react-hook-form';

const CreateSpecialRequest = forwardRef(({ onSubmit, closeModal }, ref) => {
    const { errors, register, handleSubmit } = useForm();

    const [values, setValues] = useState({
        isValid: false,
    });

    useImperativeHandle(ref, () => ({
        hanldeClearForm() {
            document.getElementById("item_name").value = '';
        }
    }));

    useEffect(() => {
    }, [])

    return (
        <div>
            <div className="card" >
                <div className="card-header text-center"><span className="splash-description" style={{ textAlign: "left", fontSize: "1.2rem" }}>Create New Special Request</span></div>
                <div className="card-body" style={{ padding: "2.25rem" }}>
                    <form onSubmit={handleSubmit(onSubmit)}>
                        <div className="form-group">
                            <input className={"form-control form-control-lg " + (errors.name ? 'is-invalid' : values.isValid)} id="item_name" ref={register({ required: true })} type="text" name="name" placeholder="Speical Name" autoComplete="off" />
                            <div className="invalid-feedback">
                                {errors.name && 'Speical Name is required.'}
                            </div>
                        </div>
                        <div className="form-group" >
                            <button type="submit" className="btn btn-space btn-primary" >Create</button>
                            <button type="button" className="btn btn-space btn-secondary" onClick={() => closeModal()}>Cancel</button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    )
});
export default CreateSpecialRequest;