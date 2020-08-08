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
    { value: '01', label: 'Mamak' },
    { value: '02', label: 'Coffee Shop' },
    { value: '03', label: 'Hotel' },
];

const MerchantForm = forwardRef((props, ref) => {

    const { errors, handleSubmit, register } = useForm();
    let history = useHistory();
    const [uploading, setUploading] = React.useState(false);
    const [fileInfo, setFileInfo] = React.useState(null);
    const [values, setValues] = useState({
        isValid: '',
        showLoading: false
    })

    const previewFile = (file, callback) => {
        const reader = new FileReader();
        reader.onloadend = () => {
            callback(reader.result);
        };
        reader.readAsDataURL(file);
    }



    const handleBusinessType = (selected) => {
        // setValues({ branch: selected })
    }


    useImperativeHandle(ref, () => ({

        hanldeValidInput() {
            setValues({ isValid: 'is-valid', showLoading: true })
            setTimeout(() => {
                history.push("/verify");
            }, 2000)
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
                    action="https://jsonplaceholder.typicode.com/post"
                    onUpload={file => {
                        setUploading(true);
                        previewFile(file.blobFile, value => {
                            setFileInfo(value);
                        });
                    }}
                    onSuccess={(response, file) => {
                        setUploading(false);
                        Alert.success('Uploaded successfully');
                        console.log(response);
                    }}
                    onError={() => {
                        setFileInfo(null);
                        setUploading(false);
                        Alert.error('Upload failed');
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
            <form onSubmit={handleSubmit(props.onSubmitMerchant)} class="omga-03__form-shape-holder">
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
                        <input className={"form-control form-control-lg " + (errors.first_name ? 'is-invalid' : values.isValid)} ref={register({ required: true })} type="text" name="first_name" placeholder="First Name" autoComplete="off" onChange={(event) => props.handleProgressBarOnChange(event, 4)} />
                        <div class="invalid-feedback">
                            {errors.first_name && 'First Name is required.'}
                        </div>
                    </div>
                    <div class="form-group from-group--with-label">
                        <input className={"form-control form-control-lg " + (errors.last_name ? 'is-invalid' : values.isValid)} ref={register({ required: true })} type="text" name="last_name" placeholder="Last Name" autoComplete="off" onChange={(event) => props.handleProgressBarOnChange(event, 5)} />
                        <div class="invalid-feedback">
                            {errors.last_name && 'Last Name is required.'}
                        </div>
                    </div>
                    <div class="form-group from-group--with-label">
                        <input className={"form-control form-control-lg " + (errors.restaurant ? 'is-invalid' : values.isValid)} ref={register({ required: true })} type="text" name="restaurant" placeholder="Restaurant Name" autoComplete="off" onChange={(event) => props.handleProgressBarOnChange(event, 7)} />
                        <div class="invalid-feedback">
                            {errors.restaurant && 'Restaurant Name is required.'}
                        </div>
                    </div>
                    <div class="form-group from-group--with-label">
                        <input className={"form-control form-control-lg " + (errors.mobile ? 'is-invalid' : values.isValid)} ref={register({ required: true })} type="phone" name="mobile" placeholder="Mobile Number" autoComplete="off" onChange={(event) => props.handleProgressBarOnChange(event, 6)} />
                        <div class="invalid-feedback">
                            {errors.mobile && 'Mobile Number is required.'}
                        </div>
                    </div>


                </div>
            </form>
        </div>

    )


});


// <form onSubmit={handleSubmit(props.onSubmitMerchant)}>
// <div className="form-group">
//     <input className={"form-control form-control-lg " + (errors.first_name ? 'is-invalid' : values.isValid)} ref={register({ required: true })} type="text" name="first_name" placeholder="First Name" autoComplete="off" onChange={(event) => props.handleProgressBarOnChange(event, 4)} />
//     <div class="invalid-feedback">
//         {errors.first_name && 'First Name is required.'}
//     </div>
// </div>
// <div className="form-group">
//     <input className={"form-control form-control-lg " + (errors.last_name ? 'is-invalid' : values.isValid)} ref={register({ required: true })} type="text" name="last_name" placeholder="Last Name" autoComplete="off" onChange={(event) => props.handleProgressBarOnChange(event, 5)} />
//     <div class="invalid-feedback">
//         {errors.last_name && 'Last Name is required.'}
//     </div>
// </div>
// <div className="form-group">
//     <input className={"form-control form-control-lg " + (errors.mobile ? 'is-invalid' : values.isValid)} ref={register({ required: true })} type="phone" name="mobile" placeholder="Mobile Number" autoComplete="off" onChange={(event) => props.handleProgressBarOnChange(event, 6)} />
//     <div class="invalid-feedback">
//         {errors.mobile && 'Mobile Number is required.'}
//     </div>
// </div>
// <div className="form-group">
//     <input className={"form-control form-control-lg " + (errors.restaurant ? 'is-invalid' : values.isValid)} ref={register({ required: true })} type="text" name="restaurant" placeholder="Restaurant Name" autoComplete="off" onChange={(event) => props.handleProgressBarOnChange(event, 7)} />
//     <div class="invalid-feedback">
//         {errors.restaurant && 'Restaurant Name is required.'}
//     </div>
// </div>
// <div className="form-group">
//     <input className={"form-control form-control-lg " + (errors.register_no ? 'is-invalid' : values.isValid)} ref={register({ required: true })} type="text" name="register_no" placeholder="Register Number" autoComplete="off" onChange={(event) => props.handleProgressBarOnChange(event, 8)} />
//     <div class="invalid-feedback">
//         {errors.register_no && 'Register Number is required.'}
//     </div>
// </div>
// <div className="form-group pt-2">
//     {/* <button disabled={values.showLoading ? 'disabled' : ''} value="E" className="btn btn-block btn-primary" type="submit">
//         {values.showLoading ?
//             <div style={{ textAlign: "center", display: "flex" }}><span style={{ textAlign: 'center', margin: "0 auto" }}>Sign Up</span><ReactLoading type={"spin"} color={"#444"} height={'8%'} width={'8%'} /></div>
//             :
//             <span>Sign Up</span>
//         }
//     </button> */}
// </div>
// </form>

export default MerchantForm;