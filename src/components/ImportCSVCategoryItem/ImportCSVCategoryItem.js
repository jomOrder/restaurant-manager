import React, { useState, useEffect, forwardRef, useImperativeHandle } from 'react';
import BarLoader from 'react-spinners/BarLoader'
import { css } from "@emotion/core";

import { CSVReader } from 'react-papaparse'

const override = css`
  display: block;
  margin: 20px auto;
`;
const ImportCSVCategoryItem = forwardRef(({ closeModal, exportModal }, ref) => {
    const [isValid, setIsValid] = useState(true);
    const [loading, setLoading] = useState(false);
    const [items, setItems] = useState(true)
    useImperativeHandle(ref, () => ({
        removeFile() {
            setIsValid(true);
            setLoading(false);

        },
        exportItems() {
            setLoading(true)
            setIsValid(true)
            return items;
        }
    }));


    const handleOnDrop = (result) => {
        setIsValid(false)
        let items = [];
        for (let i = 0; i < result.length; i++) {
            if(result[i].data[0] !== "") items.push({ name: result[i].data[0], price: result[i].data[1], in_store: 1, photo: { url: "" } })
        }
        let data = {
            bulkItem: items
        };
        setItems(data)
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
                <div className="card-header text-center"><span className="splash-description" style={{ textAlign: "left", fontSize: "1.2rem" }}>Import Items</span></div>
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
                        <button disabled={isValid} onClick={() => exportModal()} type="submit" className="btn btn-space btn-primary" >Export</button>
                        <button type="button" className="btn btn-space btn-secondary" onClick={() => closeModal()}>Close</button>
                    </div>
                </div>
            </div>
        </div>
    )
});
export default ImportCSVCategoryItem;