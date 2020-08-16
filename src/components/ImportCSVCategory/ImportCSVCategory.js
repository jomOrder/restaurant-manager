import React, { useState, useEffect, forwardRef, useImperativeHandle } from 'react';
import ClipLoader from 'react-spinners/ClipLoader'
import { css } from "@emotion/core";

import { CSVReader } from 'react-papaparse'

const override = css`
  display: block;
  margin: 20px auto;
`;
const ImportCSVCategory = forwardRef(({ closeModal }, ref) => {
    const [isValid, setIsValid] = useState(true)
    const [values, setValues] = useState({
        showLoading: false,
        progress: 0,
    });

    useImperativeHandle(ref, () => ({

    }));


    const handleOnDrop = (data) => {
        setIsValid(false)
        console.log(data)
    }
    const handleOnError = (err, file, inputElem, reason) => {
        setIsValid(true)
        console.log(err)
    }

    const handleOnRemoveFile = (data) => {
        setIsValid(true);
        console.log(data)
    }

    useEffect(() => {
    }, [])

    return (
        <div>
            <div className="card" >
                <div className="card-header text-center"><span className="splash-description" style={{ textAlign: "left", fontSize: "1.2rem" }}>Import Category</span></div>
                <div className="card-body" style={{ padding: "2.25rem" }}>
                    {
                        !values.showLoading ? <div className="form-goup">
                            <CSVReader
                                style={{ marginBottom: 90 }}
                                onDrop={handleOnDrop}
                                onError={handleOnError}
                                addRemoveButton
                                onRemoveFile={handleOnRemoveFile}
                            >
                                <span>Drop or Click CSV file here to upload.</span>
                            </CSVReader>
                        </div> :
                            <div style={{ marginBottom: "50px", textAlign: "center" }}>
                                <ClipLoader
                                    css={override}
                                    size={50}
                                    color={"#123abc"}
                                    loading={values.showLoading}
                                />
                                <span style={{ margin: "5px 0 0 17px" }}>Loading...</span>

                            </div>
                    }
                    <div className="form-group" >
                        <button disabled={isValid} type="submit" className="btn btn-space btn-primary" >Export</button>
                        <button type="button" className="btn btn-space btn-secondary" onClick={() => closeModal()}>Cancel</button>
                    </div>
                </div>
            </div>
        </div>
    )
});
export default ImportCSVCategory;