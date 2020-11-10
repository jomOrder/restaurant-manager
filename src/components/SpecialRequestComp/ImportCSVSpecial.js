import React, { useState, useEffect, forwardRef, useImperativeHandle } from 'react';
import BarLoader from 'react-spinners/BarLoader'
import { css } from "@emotion/core";

import { CSVReader } from 'react-papaparse'
import { timeToInt } from 'time-number';

const override = css`
  display: block;
  margin: 20px auto;
`;
const ImportCSVSpecial = forwardRef(({ closeModal, exportCSVSpecialModal }, ref) => {
    const [isValid, setIsValid] = useState(true);
    const [loading, setLoading] = useState(false);

    const [specials, setSpecials] = useState(true)

    const [values, setValues] = useState({
        showLoading: false,
        progress: 0,
    });

    useImperativeHandle(ref, () => ({
        removeFile() {
            setIsValid(true);
            setLoading(false);
        },
        exportSpecials() {
            setLoading(true)
            setIsValid(true)
            return specials;
        }
    }));


    const handleOnDrop = (result) => {
        setIsValid(false)
        let specials = [];
        for (let i = 0; i < result.length; i++) {
            if (result[i].data[0] !== "") {
                let name = result[i].data[0].replace(/\b\w/g, l => l.toUpperCase()).trim();
                specials.push({ name, status: 1 })
            }
        }
        let data = {
            bulkSpecial: specials
        };
        setSpecials(data)
    }
    const handleOnError = (err, file, inputElem, reason) => {
        setIsValid(true)
        console.log(err)
    }

    const handleOnRemoveFile = (result) => {
        setIsValid(true);
    }

    useEffect(() => {
    }, [])

    return (
        <div>
            <div className="card" >
                <div className="card-header text-center"><span className="splash-description" style={{ textAlign: "left", fontSize: "1.2rem" }}>Import Category</span></div>
                <div className="card-body" style={{ padding: "2.25rem" }}>
                    {
                        !loading ? <div className="form-goup">
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
                                <BarLoader
                                    css={override}
                                    size={50}
                                    color={"#123abc"}
                                    loading={loading}
                                />
                                <span style={{ margin: "5px 0 0 17px" }}>Loading...</span>
                            </div>
                    }
                    <div className="form-group" >
                        <button disabled={isValid} onClick={() => exportCSVSpecialModal()} type="submit" className="btn btn-space btn-primary">Import</button>
                        <button type="button" className="btn btn-space btn-secondary" onClick={() => closeModal()}>Close</button>
                    </div>
                </div>
            </div>
        </div>
    )
});
export default ImportCSVSpecial;