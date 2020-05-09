import React, { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import ImageUploader from 'react-images-upload';

const CreateCategoryItem = ({onSubmit, closeModal}) => {

    const { errors, register, handleSubmit } = useForm();
    const [values, setValues] = useState({
        isValid: false,
        selectedOption: "Western",
        pictures: []
    });
    const onDrop = (picture) => {
        setValues({ pictures: values.pictures.concat(picture) });
        console.log("PICS", values.pictures)
    }

    useEffect(() => {
    }, [])

    return (
        <div>
            <div className="card" >
                <div className="card-header text-center"><span className="splash-description" style={{ textAlign: "left", fontSize: "1.2rem" }}>Create New Category Item</span></div>
                <div className="card-body" style={{ padding: "2.25rem" }}>
                    <form onSubmit={handleSubmit(onSubmit)}>
                        <div className="form-group">
                            <input className={"form-control form-control-lg " + (errors.name ? 'is-invalid' : values.isValid)} ref={register({ required: true })} type="text" name="name" placeholder="Item Name" autoComplete="off" />
                            <div className="invalid-feedback">
                                {errors.name && 'Category Item Name is required.'}
                            </div>
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

                        <div className="form-group" >
                            <button type="submit" className="btn btn-space btn-primary">Create</button>
                            <button type="button" className="btn btn-space btn-secondary" onClick={() => closeModal()}>Cancel</button>
                        </div>

                    </form>

                </div>

            </div>
        </div>
    )

}

export default CreateCategoryItem;