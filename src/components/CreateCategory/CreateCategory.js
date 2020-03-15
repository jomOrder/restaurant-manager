import React, { useState, useEffect, useRef } from 'react';
import Select from 'react-select';
import { useForm } from 'react-hook-form';
import ImageUploader from 'react-images-upload';
import { Line, Circle } from 'rc-progress';

const options = [
    { value: 'chocolate', label: 'Chocolate' },
    { value: 'strawberry', label: 'Strawberry' },
    { value: 'vanilla', label: 'Vanilla' },
];

const CreateCategory = props => {

    const { errors, register, handleSubmit } = useForm();
    const [tm, setTm] = useState(500)
    const [values, setValues] = useState({
        isValid: false,
        selectedOption: null,
        progress: 0,
        picture: []

    });

    const handleChange = selectedOption => {
        setValues({ selectedOption, visible: true })
        console.log(`Option selected:`, selectedOption);
    };

    const increse = () => {
        const newPercent = values.progress + 5;
        if (newPercent >= 105) {
            return;
        }
        setValues({ progress: newPercent })

    }

    const restart = () => {
        clearTimeout(tm);
        setValues({ progress: 0 });
        increse()
    }
    const onDrop = (picture) => {
        setValues({ picture });
        restart()
    }

    useEffect(() => {
        setTm(setTimeout(() => increse(), tm))
    }, [props, values.progress])

    return (
        <div>
            <div className="card" >
                <div className="card-header text-center"><span className="splash-description" style={{ textAlign: "left", fontSize: "1.2rem" }}>Create New Category</span></div>
                <div className="card-body" style={{ padding: "2.25rem" }}>
                    <form onSubmit={handleSubmit(props.onSubmit)}>
                        <div className="form-group">
                            <input className={"form-control form-control-lg " + (errors.name ? 'is-invalid' : values.isValid)} ref={register({ required: true })} type="text" name="name" placeholder="Category Name" autoComplete="off" />
                            <div className="invalid-feedback">
                                {errors.name && 'name is required.'}
                            </div>
                        </div>
                        <div className="form-group">
                            <Select
                                isSearchable
                                autoFocus
                                placeholder={"Select Your Type"}
                                value={values.selectedOption}
                                onChange={handleChange}
                                options={options}
                            />
                        </div>
                        <div className="form-goup">
                            <ImageUploader
                                withIcon={true}
                                buttonText='Choose images'
                                onChange={onDrop}
                                imgExtension={['.jpg', '.png']}
                                maxFileSize={5242880}
                            />
                        </div>
                        {
                            values.progress !== 100 ? <div className="form-goup" style={{ marginBottom: "10px" }}>
                                <Line percent={values.progress} strokeWidth="1" strokeColor="#2DC551" /> {`${values.progress}%`}
                            </div> : ""
                        }

                        <div className="form-group" >
                            <button type="submit" className="btn btn-space btn-primary" >Create</button>
                            <button type="button" className="btn btn-space btn-secondary" onClick={() => props.closeModal()}>Cancel</button>
                        </div>

                    </form>

                </div>

            </div>
        </div>
    )

}

export default CreateCategory;