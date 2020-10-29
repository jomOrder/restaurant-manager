import React, { useState, useEffect, forwardRef, useImperativeHandle } from 'react';
import { useForm } from 'react-hook-form';

const CreateAddOn = forwardRef(({ onSubmit, closeModal }, ref) => {
    const { errors, register, handleSubmit } = useForm();

    const [values, setValues] = useState({
        isValid: false,
    });

    useImperativeHandle(ref, () => ({
        hanldeClearForm() {
            document.getElementById("name").value = '';
            document.getElementById("price").value = '';
        }
    }));

    useEffect(() => {
    }, [])

    return (
        <div>
            <div className="card" >
                <div className="card-header text-center"><span className="splash-description" style={{ textAlign: "left", fontSize: "1.2rem" }}>Create New Add On</span></div>
                <div className="card-body" style={{ padding: "2.25rem" }}>
                    <form onSubmit={handleSubmit(onSubmit)}>
                        <div className="form-group">
                            <input className={"form-control form-control-lg " + (errors.name ? 'is-invalid' : values.isValid)} id="item_name" ref={register({ required: true })} type="text" name="name" placeholder="Item Name" autoComplete="off" />
                            <div className="invalid-feedback">
                                {errors.name && 'Item Name is required.'}
                            </div>
                        </div>
                        <div className="form-group">
                            <div className="input-group">
                                <div class="input-group-prepend">
                                    <div class="input-group-text">RM</div>
                                </div>
                                <input className={"form-control form-control-lg " + (errors.price ? 'is-invalid' : values.isValid)} ref={register({ required: true })} type="text" name="price" id="item_price" placeholder="Item Price" autoComplete="off" />
                            </div>
                            <div className="invalid-feedback">
                                {errors.price && 'Item Price is required.'}
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
export default CreateAddOn;