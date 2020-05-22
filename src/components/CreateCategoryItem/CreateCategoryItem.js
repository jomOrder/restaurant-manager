import React, { useState, useEffect, forwardRef, useImperativeHandle } from 'react';
import { useForm } from 'react-hook-form';
import ImageUploader from 'react-images-upload';
import { Line } from 'rc-progress';

const CreateCategoryItem = forwardRef(({ onSubmit, closeModal }, ref) => {

    const { errors, register, handleSubmit } = useForm();
    const [tm, setTm] = useState(500);
    const [uploadTime, setUploadTime] = useState(false);
    const [values, setValues] = useState({
        isValid: false,
        progress: 0,
    });
    const [picture, setPicture] = useState([]);
    const [upload, setUpload] = useState(false);
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
        setUploadTime(true);
        if (picture.length === 0) restart();
    }

    useImperativeHandle(ref, () => ({
        hanldeUploadImage() {
            return picture
        },
        hanldeClearForm() {
            setUploadTime(false);
            setPicture([]);
            document.getElementById("item_name").value = '';
            document.getElementById("item_price").value = '';
            document.getElementById("item_tax").value = '';
        }
    }));
    useEffect(() => {
        if (uploadTime) setTm(setTimeout(() => increse(), tm))
    }, [values.progress, picture, uploadTime])

    return (
        <div>
            <div className="card" >
                <div className="card-header text-center"><span className="splash-description" style={{ textAlign: "left", fontSize: "1.2rem" }}>Create New Category Item</span></div>
                <div className="card-body" style={{ padding: "2.25rem" }}>
                    <form onSubmit={handleSubmit(onSubmit)}>
                        <div className="form-group">
                            <input className={"form-control form-control-lg " + (errors.name ? 'is-invalid' : values.isValid)} ref={register({ required: true })} type="text" name="name" id="item_name" placeholder="Item Name" autoComplete="off" />
                            <div className="invalid-feedback">
                                {errors.name && 'Category Item Name is required.'}
                            </div>
                        </div>
                        <div className="form-group">
                            <input className={"form-control form-control-lg " + (errors.price ? 'is-invalid' : values.isValid)} ref={register({ required: true })} type="text" name="price" id="item_price" placeholder="Item Price" autoComplete="off" />
                            <div className="invalid-feedback">
                                {errors.price && 'Category Item Price is required.'}
                            </div>
                        </div>
                        <div className="form-group">
                            <input className={"form-control form-control-lg " + (errors.tax ? 'is-invalid' : values.isValid)} ref={register({ required: true })} type="text" name="tax" id="item_tax" placeholder="Item Tax Rate" autoComplete="off" />
                            <div className="invalid-feedback">
                                {errors.tax && 'Category Item Tax Rate is required.'}
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
                            <button type="submit" className="btn btn-space btn-primary">Create</button>
                            <button type="button" className="btn btn-space btn-secondary" onClick={() => closeModal()}>Cancel</button>
                        </div>

                    </form>

                </div>

            </div>
        </div>
    )

});

export default CreateCategoryItem;