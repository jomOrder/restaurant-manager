import React, { useState, useEffect, forwardRef, useImperativeHandle } from 'react';
import ClipLoader from 'react-spinners/ClipLoader'
import { css } from "@emotion/core";
import { useForm } from 'react-hook-form';
import { Upload, Notify } from 'zent';
import { Uploader, Icon, Loader, Alert } from 'rsuite'
import Select from 'react-select';
import TimePicker from 'react-bootstrap-time-picker';
import { timeFromInt } from 'time-number';
import makeAnimated from 'react-select/animated';
const animatedComponents = makeAnimated();

const styles = {
    width: 150,
    height: 150
};

const options = [
    { value: 1, label: 'Food' },
    { value: 2, label: 'Beverage' },
    { value: 3, label: 'Dessert' },
];

const override = css`
  display: block;
  margin: 20px auto;
`;
const UpdateCategory = forwardRef(({ onSubmit, closeModal }, ref) => {
    const { errors, register, handleSubmit } = useForm();
    const [uploading, setUploading] = React.useState(false);
    const [fileInfo, setFileInfo] = React.useState(null);
    const [selectedOption, setSelectedOption] = useState(null);
    const [categoryType, setCategoryType] = useState(null);
    const [isValid, setIsValid] = useState(true)
    const [loading, setLoading] = useState(true)
    const [item, setItem] = useState(null)
    const [categoryName, setCategoryName] = useState(null)
    const [file, setFile] = useState([]);
    const [startTime, setStartTime] = useState(null);
    const [endTime, setEndTime] = useState(null);

    const [values, setValues] = useState({
        showLoading: true,
        progress: 0,
    });


    const previewFile = (file, callback) => {
        const reader = new FileReader();
        reader.onloadend = () => {
            callback(reader.result);
        };
        reader.readAsDataURL(file);
    }

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

    useImperativeHandle(ref, () => ({
        handleShowLoading() {
            setTimeout(() => {
                setLoading(false)
            }, 300)
        },
        handleCloseLoading() {
            setFileInfo(null)
            setFile([]);
            setLoading(true)

        },
        getCategoryType() {
            return categoryType || 0;
        },
        hanldeGetImageFile() {
            return file;
        },
        handleGetStartTime() {
            return startTime;
        },
        handleGetEndTime() {
            return endTime;
        },
        viewCategoryByID(item) {
            setCategoryName(item.name);
            setStartTime(item.timer.from);
            setEndTime(item.timer.to);
            setSelectedOption({ value: item.category_type, label: item.category_type == 1 ? 'Food' : item.category_type == 2 ? 'Beverage' : item.category_type == 3 ? 'Dessert' : "Category Type" },);
            setCategoryType(item.category_type);
            setItem(item);
            document.getElementById("name").value = item.name;
        }

    }));

    const handleOnChange = (e) => {
        setCategoryName(e.target.value)
    }
    useEffect(() => {
        //if(!loading) Alert.success('This is a successful message.')
    }, [loading])

    return (
        <div>
            <div className="card" >
                <div className="card-header text-center"><span className="splash-description" style={{ textAlign: "left", fontSize: "1.2rem" }}>Modify {categoryName}</span></div>
                <div className="card-body" style={{ padding: "2.25rem" }}>
                    {
                        loading ? <div style={{ marginBottom: "50px", textAlign: "center" }}>
                            <ClipLoader
                                css={override}
                                size={50}
                                color={"#123abc"}
                                loading={loading}
                            />
                            <span style={{ margin: "5px 0 0 17px" }}>Loading...</span>

                        </div> : <div>
                                <div className="form-group">
                                    <div>
                                        <p>Upload Menu Image</p>
                                        <Uploader
                                            fileListVisible={false}
                                            listType="picture"
                                            removable
                                            onUpload={file => {
                                                setUploading(true);
                                                previewFile(file.blobFile, value => {
                                                    setFile(file.blobFile);
                                                    setFileInfo(value);
                                                });
                                            }}
                                            onRemove={() => {

                                            }}
                                            onSuccess={(response, file) => {
                                                setUploading(false);
                                            }}
                                            onError={() => {
                                                setTimeout(() => {
                                                    setUploading(false);
                                                }, 400)
                                            }}
                                        >
                                            <button style={styles}>
                                                {uploading && <Loader backdrop center />}
                                                {fileInfo ? (
                                                    <img src={fileInfo} width="100%" height="100%" />
                                                ) : (
                                                        <Icon icon="camera-retro" size="5x" />
                                                    )}
                                            </button>
                                        </Uploader>
                                    </div>
                                </div>
                                <form onSubmit={handleSubmit(onSubmit)}>
                                    <div className="form-group">
                                        <input className={"form-control form-control-lg " + (errors.name ? 'is-invalid' : values.isValid)} value={categoryName} onChange={(e) => handleOnChange(e)} id="name" ref={register({ required: true })} type="text" name="name" placeholder="Category Name" autoComplete="off" />
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
                                    <div className="form-group" >
                                        <button type="submit" className="btn btn-space btn-primary" >Save</button>
                                        <button type="button" className="btn btn-space btn-secondary" onClick={() => closeModal()}>Cancel</button>
                                    </div>
                                </form>
                            </div>

                    }
                </div>
            </div>
        </div>
    )
});
export default UpdateCategory;