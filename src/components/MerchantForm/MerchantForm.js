import { useHistory } from "react-router-dom";
import React, { forwardRef, useState, useEffect, useImperativeHandle } from 'react';
import { useForm } from 'react-hook-form'
import Select from 'react-select';
import ReactLoading from "react-loading";
import { Uploader, Icon, Loader, Alert } from 'rsuite'
const styles = {
    width: 150,
    height: 150
};

const options = [
    { value: 1, label: 'Mamak' },
    { value: 2, label: 'Coffee Shop' },
    { value: 3, label: 'Hotel' },
];

const MerchantForm = forwardRef(({ onSubmitMerchant }, ref) => {
    const { errors, handleSubmit, register } = useForm();
    const [uploading, setUploading] = React.useState(false);
    const [file, setFile] = React.useState(null);
    const [fileInfo, setFileInfo] = React.useState(null);
    const [values, setValues] = useState({
        isValid: '',
        showLoading: false,
    })
    const [businessType, setBusinessType] = React.useState(null);


    const previewFile = (file, callback) => {
        const reader = new FileReader();
        reader.onloadend = () => {
            callback(reader.result);
        };
        reader.readAsDataURL(file);
    }

    const handleBusinessType = (selected) => {
        setBusinessType(selected.value)
    }

    useImperativeHandle(ref, () => ({
        hanldeValidInput() {
            setValues({ isValid: 'is-valid', showLoading: true })
            setTimeout(() => {
                //history.push("/verify");
            }, 2000)
        },
        handleBusinessType() {
            return businessType;
        },
        handleFileUpload() {
           return file;
        }
    }));

    useEffect(() => {
    }, []);
    return (
        <div>
            <h3>Fill up basic information</h3>
            <p>Enter your details below.</p>
            <div>
                <Uploader
                    fileListVisible={false}
                    listType="picture"
                    removable
                    onUpload={file => {
                        setUploading(true);
                        previewFile(file.blobFile, value => {
                            setFile(file.blobFile)
                            setFileInfo(value);
                        });
                    }}
                    onRemove={() => {
                        
                    }}
                    onSuccess={(response, file) => {
                        setUploading(false);
                        Alert.success('Uploaded successfully');
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
                <p>Upload your business logo 👆</p>
            </div>
            <form onSubmit={handleSubmit(onSubmitMerchant)} class="omga-03__form-shape-holder">
                <div class="omga-03__hero-form ">
                    <div class="form-group">
                        <Select
                            placeholder={"Choose Your Business Type"}
                            value={values.branch}
                            onChange={handleBusinessType}
                            options={options}
                        />
                    </div>
                    <div class="form-group from-group--with-label">
                        <input className={"form-control form-control-lg " + (errors.firstName ? 'is-invalid' : values.isValid)} ref={register({ required: true })} type="text" name="firstName" placeholder="First Name" autoComplete="off" />
                        <div class="invalid-feedback">
                            {errors.firstName && 'First Name is required.'}
                        </div>
                    </div>
                    <div class="form-group from-group--with-label">
                        <input className={"form-control form-control-lg " + (errors.lastName ? 'is-invalid' : values.isValid)} ref={register({ required: true })} type="text" name="lastName" placeholder="Last Name" autoComplete="off" />
                        <div class="invalid-feedback">
                            {errors.lastName && 'Last Name is required.'}
                        </div>
                    </div>
                    <div class="form-group from-group--with-label">
                        <input className={"form-control form-control-lg " + (errors.phoneNumber ? 'is-invalid' : values.isValid)} ref={register({ required: true })} type="phone" name="phoneNumber" placeholder="Phone Number" autoComplete="off" />
                        <div class="invalid-feedback">
                            {errors.phoneNumber && 'Phone Number is required.'}
                        </div>
                    </div>
                    <button type="submit" style={{ borderRadius: 30, height: 45, minWidth: 90, fontWeight: 300, fontSize: 15, paddingLeft: 45, paddingRight: 45 }} class="btn--primary">Next</button>
                </div>

            </form>
        </div>
    )
});

export default MerchantForm;