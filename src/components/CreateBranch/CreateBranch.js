import React, { useState, useEffect } from 'react';
import Select from 'react-select';
import { useForm } from 'react-hook-form';
import ImageUploader from 'react-images-upload';

const options = [
    { value: 'chocolate', label: 'Chocolate' },
    { value: 'strawberry', label: 'Strawberry' },
    { value: 'vanilla', label: 'Vanilla' },
];

const CreateBranch = props => {

    const { errors, register, handleSubmit } = useForm();
    const [values, setValues] = useState({
        isValid: false,
        selectedOption: null,
        pictures: []
    });

    const handleChange = selectedOption => {
        setValues({ selectedOption, visible: true })
        console.log(`Option selected:`, selectedOption);
    };

    const onDrop = (picture) => {
        setValues({ pictures: values.pictures.concat(picture) });
        console.log("PICS", values.pictures)
    }

    useEffect(() => {
    }, [props])

    return (
        <div>
            <div className="card" >
                <div className="card-header text-center"><span className="splash-description" style={{ textAlign: "left", fontSize: "1.2rem" }}>Create New Branch</span></div>
                <div className="card-body" style={{ padding: "2.25rem" }}>
                    <form onSubmit={handleSubmit(props.onSubmit)}>
                        <div className="form-group">
                            <input className={"form-control form-control-lg " + (errors.name ? 'is-invalid' : values.isValid)} ref={register({ required: true })} type="text" name="name" placeholder="Branch Name" autoComplete="off" />
                            <div className="invalid-feedback">
                                {errors.name && 'Branch Name is required.'}
                            </div>
                        </div>
                        <div className="form-group">
                            <input className={"form-control form-control-lg " + (errors.location ? 'is-invalid' : values.isValid)} ref={register({ required: true })} type="text" name="location" placeholder="Type" autoComplete="off" />
                            <div className="invalid-feedback">
                                {errors.location && 'Location is required.'}
                            </div>
                        </div>
                        <div className="form-group" >
                            <button type="submit" className="btn btn-space btn-primary">Create</button>
                            <button type="button" className="btn btn-space btn-secondary" onClick={() => props.closeModal()}>Cancel</button>
                        </div>

                    </form>

                </div>

            </div>
        </div>
    )

}

export default CreateBranch;