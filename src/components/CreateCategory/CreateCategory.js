import React, { useState, useEffect, forwardRef, useImperativeHandle  } from 'react';
import { useForm } from 'react-hook-form';
import ImageUploader from 'react-images-upload';
import { Line } from 'rc-progress';
import Img from 'react-image'

const CreateCategory = forwardRef(({ onSubmit, closeModal }, ref) => {
    const { errors, register, handleSubmit } = useForm();
    const [tm, setTm] = useState(500);
    const [picture, setPicture] = useState([]);
    const [upload, setUpload] = useState(false);
    const [values, setValues] = useState({
        isValid: false,
        progress: 0,
    });

    useImperativeHandle(ref, () => ({
        hanldeUploadImage() {
           return picture
        },
        hanldeClearForm() {
            setPicture([]);
            document.getElementById("category_name").value = '';

        }
    }));
    const increse = () => {
        const newPercent = values.progress + 5;
        if (newPercent >= 105) {
            setUpload(true);
            return;
        }
        setValues({ progress: newPercent })
    }
    const restart = () => {
        clearTimeout(tm);
        setValues({ progress: 0 });
        increse()
    }
    const onDrop = (pic) => {
        setPicture(pic);
        if (picture.length === 0) restart();
    }
    useEffect(() => {
        setTm(setTimeout(() => increse(), tm))
    }, [values.progress, picture])

    return (
        <div>
            <div className="card" >
                <div className="card-header text-center"><span className="splash-description" style={{ textAlign: "left", fontSize: "1.2rem" }}>Create New Category</span></div>
                <div className="card-body" style={{ padding: "2.25rem" }}>
                    <form onSubmit={handleSubmit(onSubmit)}>
                        <div className="form-group">
                            <input className={"form-control form-control-lg " + (errors.name ? 'is-invalid' : values.isValid)} id="category_name" ref={register({ required: true })} type="text" name="name" placeholder="Category Name" autoComplete="off" />
                            <div className="invalid-feedback">
                                {errors.name && 'category Name is required.'}
                            </div>
                        </div>
                        <div className="form-goup">
                            {picture.length > 1 ? <span>Sorry only one picture</span> : ""}
                            <ImageUploader
                                withIcon={true}
                                buttonText='Upload image'
                                onChange={onDrop}
                                imgExtension={['.jpg', '.png']}
                                maxFileSize={5242880}
                            />
                        </div>
                        {/* {<div className="form-group">
                            <Img
                                src={['assets/images/github.png']} loader={<div>Hello</div>} decode={false} width={70} height={70}
                            />
                        </div>} */}
                        {
                            values.progress !== 100 ? <div className="form-goup" style={{ marginBottom: "10px" }}>
                                <Line percent={values.progress} strokeWidth="1" strokeColor="#2DC551" /> {`${values.progress}%`}
                            </div> : ""
                        }
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
export default CreateCategory;