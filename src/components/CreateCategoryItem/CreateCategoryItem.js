import React, { useState, useEffect, forwardRef, useImperativeHandle } from 'react';
import { useForm } from 'react-hook-form';
import ImageUploader from 'react-images-upload';
import { Line } from 'rc-progress';
import Select from 'react-select';
import makeAnimated from 'react-select/animated';
const animatedComponents = makeAnimated();

const options = [
    { value: 1, label: 'Item Avaliable in store' },
    { value: 0, label: 'Item Not Avaliable in store' },
];

const CreateCategoryItem = forwardRef(({ onSubmit, closeModal }, ref) => {

    const { errors, register, handleSubmit } = useForm();
    const [selectedOption, setSelectedOption] = useState(null);
    const [itemInSotre, setItemInSotre] = useState(null);
    const [uploadTime, setUploadTime] = useState(true);

    const [values, setValues] = useState({
        isValid: false,
        progress: 0,
    });
    const [picture, setPicture] = useState([]);

    const handleInSotreChange = selectedOption => {
        setSelectedOption(selectedOption);
        setItemInSotre(selectedOption.value);
    };

    const onDrop = (pic) => {
        setPicture(pic);
    }

    useImperativeHandle(ref, () => ({
        hanldeUploadImage() {
            return picture
        },
        handleItemInSotre() {
            return itemInSotre;
        },
        hanldeClearForm() {
            setUploadTime(false);
            setPicture([]);
            document.getElementById("item_name").value = '';
            document.getElementById("item_price").value = '';
        }
    }));
    useEffect(() => {
    }, [picture])

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
                            <div className="input-group">
                                <div class="input-group-prepend">
                                    <div class="input-group-text">RM</div>
                                </div>
                                <input className={"form-control form-control-lg " + (errors.price ? 'is-invalid' : values.isValid)} ref={register({ required: true })} type="text" name="price" id="item_price" placeholder="Item Price" autoComplete="off" />
                            </div>
                            <div className="invalid-feedback">
                                {errors.price && 'Category Item Price is required.'}
                            </div>
                        </div>
                        <div className="form-group">
                            <Select
                                components={animatedComponents}
                                closeMenuOnSelect={true}
                                isLoading
                                value={selectedOption}
                                onChange={handleInSotreChange}
                                placeholder={"Item In Store"}
                                options={options}
                            />
                        </div>
                        <div className="form-group">
                            <ImageUploader
                                singleImage={true}
                                withPreview={true}
                                withIcon={true}
                                buttonText='Upload image'
                                onChange={onDrop}
                                fileTypeError={"File Size big"}
                                fileSizeError={"file size is too big"}
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

});

export default CreateCategoryItem;