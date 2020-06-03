import React, { useState, useEffect, forwardRef, useImperativeHandle } from 'react';
import { Line } from 'rc-progress';

const ImportCSVCategory = forwardRef(({ closeModal }, ref) => {
    const [values, setValues] = useState({
        isValid: false,
        progress: 0,
    });

    useImperativeHandle(ref, () => ({
       
    }));


    useEffect(() => {
    }, [])

    return (
        <div>
            <div className="card" >
                <div className="card-header text-center"><span className="splash-description" style={{ textAlign: "left", fontSize: "1.2rem" }}>Create New Category</span></div>
                <div className="card-body" style={{ padding: "2.25rem" }}>
                    <div className="form-goup">
                    </div>
                    {
                        values.progress !== 100 ? <div className="form-goup" style={{ marginBottom: "10px" }}>
                            <Line percent={values.progress} strokeWidth="1" strokeColor="#2DC551" /> {`${values.progress}%`}
                        </div> : ""
                    }
                    <div className="form-group" >
                        <button type="submit" className="btn btn-space btn-primary" >Create</button>
                        <button type="button" className="btn btn-space btn-secondary" onClick={() => closeModal()}>Cancel</button>
                    </div>
                </div>
            </div>
        </div>
    )
});
export default ImportCSVCategory;