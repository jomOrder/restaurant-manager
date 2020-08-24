import React, { useState, useEffect, forwardRef, useImperativeHandle } from 'react';
import ClipLoader from 'react-spinners/ClipLoader'
import { css } from "@emotion/core";
import { useForm } from 'react-hook-form';
import { Upload, Notify } from 'zent';
import { Uploader, Icon, Loader, Alert } from 'rsuite'

const styles = {
    width: 150,
    height: 150
};

const override = css`
  display: block;
  margin: 20px auto;
`;
const UpdateCategory = forwardRef(({ onSubmit, closeModal }, ref) => {
    const { errors, register, handleSubmit } = useForm();
    const [uploading, setUploading] = React.useState(false);
    const [fileInfo, setFileInfo] = React.useState(null);

    const [isValid, setIsValid] = useState(true)
    const [loading, setLoading] = useState(true)
    const [item, setItem] = useState(null)
    const [categoryName, setCategoryName] = useState(null)
    const [file, setFile] = useState([]);
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


    useImperativeHandle(ref, () => ({
        handleShowLoading() {
            setTimeout(() => {
                setLoading(false)
            }, 300)
        },
        handleCloseLoading() {
            setLoading(true)

        },
        viewCategoryByID(item) {
            console.log(item);
            setCategoryName(item.name);
            setItem(item);
            document.getElementById("category_name").value = item.name;
        }

    }));

    const handleOnChange = (e) => {
        setCategoryName(e.target.value)
    }
    useEffect(() => {
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

                        </div> : <form onSubmit={handleSubmit(onSubmit)}>
                                <div className="form-group">
                                    <input className={"form-control form-control-lg " + (errors.name ? 'is-invalid' : values.isValid)} value={categoryName} onChange={(e) => handleOnChange(e)} id="category_name" ref={register({ required: true })} type="text" name="name" placeholder="Category Name" autoComplete="off" />
                                    <div className="invalid-feedback">
                                        {errors.name && 'category Name is required.'}
                                    </div>
                                </div>
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
                                                    console.log(file.blobFile)
                                                    console.log(value)
                                                    setFileInfo(value);
                                                });
                                            }}
                                            onRemove={() => {

                                            }}
                                            onSuccess={(response, file) => {
                                                setUploading(false);
                                                Alert.success('Uploaded successfully');
                                                console.log(response);
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
                                <div className="form-group" >
                                    <button disabled={isValid} type="submit" className="btn btn-space btn-primary" >Save</button>
                                    <button type="button" className="btn btn-space btn-secondary" onClick={() => closeModal()}>Cancel</button>
                                </div>
                            </form>
                    }
                </div>
            </div>
        </div>
    )
});
export default UpdateCategory;