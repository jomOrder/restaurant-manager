import React, { useState, useEffect, forwardRef, useImperativeHandle } from 'react';
import { useForm } from 'react-hook-form';
import HashLoader from 'react-spinners/HashLoader'
import { css } from "@emotion/core";
import Map from '../Map/Map'

const override = css`
  display: block;
  margin: 20px auto;
`;
const CreateBranch = forwardRef((props, ref) => {

    const { errors, register, handleSubmit } = useForm();
    const [message, setMessage] = useState(null);
    const [values, setValues] = useState({
        isValid: false,
        selectedOption: null,
        showLoading: false,
        showForm: true,
        showSuccessMessage: false
    });

    useImperativeHandle(ref, () => ({
        hanldeValidInput() {
            setValues({ isValid: 'is-valid', showLoading: true })
        },
        handleSuccessMessage(message) {
            setMessage(message)
            setValues({ showLoading: false, showForm: false, showSuccessMessage: true })
        },
        closeSuccessMessage() {
            setValues({ showForm: true, showSuccessMessage: false })
        }
    }));

    useEffect(() => {
    }, [props])

    return (
        <div>
            <div className="card" >
                <div className="card-header text-center"><span className="splash-description" style={{ textAlign: "left", fontSize: "1.2rem" }}>Create New Branch</span></div>
                <div className="card-body" style={{ padding: "2.25rem" }}>
                    <form onSubmit={handleSubmit(props.onSubmit)}>
                        {!values.showLoading && values.showForm ?
                            <div>
                                <div className="form-group">
                                    <Map />
                                </div>
                                <div className="form-group">
                                    <input className={"form-control form-control-lg " + (errors.name ? 'is-invalid' : values.isValid)} ref={register({ required: true })} type="text" name="name" placeholder="Branch Name" autoComplete="off" />
                                    <div className="invalid-feedback">
                                        {errors.name && 'Branch Name is required.'}
                                    </div>
                                </div>
                                <div className="form-group">
                                    <input className={"form-control form-control-lg " + (errors.location ? 'is-invalid' : values.isValid)} ref={register({ required: true })} type="text" name="location" placeholder="Location" autoComplete="off" />
                                    <div className="invalid-feedback">
                                        {errors.location && 'Location is required.'}
                                    </div>
                                </div>
                            </div>
                            : !values.showSuccessMessage ? <div style={{ marginBottom: "50px", textAlign: "center" }}>
                                <HashLoader
                                    css={override}
                                    size={50}
                                    color={"#123abc"}
                                    loading={values.showLoading}
                                />
                                <span style={{ margin: "5px 0 0 17px" }}>Loading...</span>

                            </div> : <div style={{ marginBottom: "70px", textAlign: "center" }}>
                                    <div className="form-group">
                                        <img src="https://img.icons8.com/cute-clipart/128/000000/ok.png" />
                                    </div>
                                    <div className="form-group">
                                        <span>{message}</span>
                                    </div>
                                </div>}
                        <div className="form-group" >
                            <button disabled={!values.showForm} type="submit" className="btn btn-space btn-primary">Create</button>
                            <button type="button" className="btn btn-space btn-secondary" onClick={() => props.closeCreateModal()}>Close</button>
                        </div>
                    </form>

                </div>

            </div>
        </div>
    )

})

export default CreateBranch;