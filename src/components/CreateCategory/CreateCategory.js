import React, { useState, useEffect, forwardRef, useImperativeHandle } from 'react';
import { useForm } from 'react-hook-form';
import ImageUploader from 'react-images-upload';
import { Line } from 'rc-progress';
import Img from 'react-image'
import Select from 'react-select';
import makeAnimated from 'react-select/animated';
const animatedComponents = makeAnimated();
import DatePicker from 'react-datepicker'
import TimePicker from 'react-bootstrap-time-picker';
import { timeFromInt } from 'time-number';

import "react-datepicker/dist/react-datepicker.css";


const options = [
    { value: 1, label: 'Food' },
    { value: 2, label: 'Beverage' },
    { value: 3, label: 'Dessert' },
];

const CreateCategory = forwardRef(({ onSubmit, closeModal }, ref) => {
    const { errors, register, handleSubmit } = useForm();
    const [picture, setPicture] = useState([]);
    const [startDate, setStartDate] = useState(new Date());
    const [selectedOption, setSelectedOption] = useState(null);
    const [startTime, setStartTime] = useState(null);
    const [endTime, setEndTime] = useState(null);

    const [categoryType, setCategoryType] = useState(new Date());

    const [values, setValues] = useState({
        isValid: false,
    });

    useImperativeHandle(ref, () => ({
        hanldeUploadImage() {
            return picture
        },
        hanldeClearForm() {
            setPicture([]);
            document.getElementById("name").value = '';
        },
        handleGetCategoryType() {
            return categoryType;
        },
        handleGetStartTime() {
            return startTime;
        },
        handleGetEndTime() {
            return endTime;
        }
    }));

    const handleCategoryTypeChange = selectedOption => {
        setSelectedOption(selectedOption);
        setCategoryType(selectedOption.value);
    };

    const handleStartTimeChange = (time) => {
        setStartTime(time)
    }


    const handleEndTimeChange = (time) => {
        setEndTime(time)
    }

    const onDrop = (pic) => {
        setPicture(pic);
    }
    useEffect(() => {
    }, [picture])

    return (
        <div>
            <div className="card" >
                <div className="card-header text-center"><span className="splash-description" style={{ textAlign: "left", fontSize: "1.2rem" }}>Create New Category</span></div>
                <div className="card-body" style={{ padding: "2.25rem" }}>
                    <form onSubmit={handleSubmit(onSubmit)}>
                        <div className="form-group">
                            <input className={"form-control form-control-lg " + (errors.name ? 'is-invalid' : values.isValid)} id="name" ref={register({ required: true })} type="text" name="name" placeholder="Category Name" autoComplete="off" />
                            <div className="invalid-feedback">
                                {errors.name && 'category Name is required.'}
                            </div>
                        </div>
                        <div className="form-group">
                            <span style={{ marginRight: 10 }}>Start Time </span>
                            <TimePicker start="00:00" onChange={handleStartTimeChange} value={startTime} />
                        </div>
                        <div className="form-group">
                            <span style={{ marginRight: 16 }}>End Time </span>
                            <TimePicker start="00:00" onChange={handleEndTimeChange} value={endTime} />
                        </div>
                        <div className="form-group">
                            <Select
                                components={animatedComponents}
                                closeMenuOnSelect={true}
                                isLoading
                                value={selectedOption}
                                onChange={handleCategoryTypeChange}
                                placeholder={"Category Type"}
                                options={options}
                            />
                        </div>
                        <div className="form-goup">
                            {picture.length > 1 ? <span>Sorry only one picture</span> : ""}
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