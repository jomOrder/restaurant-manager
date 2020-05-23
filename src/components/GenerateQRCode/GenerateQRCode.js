import React, { useState, useEffect, forwardRef, useImperativeHandle } from 'react';
import { useForm } from 'react-hook-form';
import QRCode from 'qrcode.react';
import { components } from 'react-select';
import Select from 'react-select';
import Avatar from 'react-avatar';
import ReactLoading from "react-loading";
import { isEmpty } from 'lodash';


const GenerateQRCode = forwardRef(({ onSubmit, closeModal, branches, merchant }, ref) => {

    const { errors, register, handleSubmit } = useForm();
    const [BRANCHES, setBranches] = useState([]);
    const [progress, setProgress] = useState(false);
    const [spotID, setSpotID] = useState(null);
    const [branchKey, setBranchKey] = useState(null);
    const [selectedOption, setSelectedOption] = useState(null);
    const [values, setValues] = useState({
        isValid: false,
        branchError: false,
        showQRCode: false,
        showStatus: false,
    });

    useImperativeHandle(ref, () => ({

        hanldeShowQRCode() {
            if (!selectedOption) {
                setValues({ branchError: true });

            }

            else {
                setProgress(true)
                setTimeout(() => {
                    setValues({ showQRCode: true, showStatus: true })
                    setProgress(false)
                }, 2000)
            }

        }

    }));

    const BranchOption = props => {
        const { data } = props;
        return (
            <components.Option {...props}>
                <label>
                    {data.label} - 
                </label>
                <label style={{ padding: "5px" }}>
                    {data.location}
                </label>
            </components.Option>
           
        );
    };

    const handleChange = selectedOption => {
        setSelectedOption(selectedOption);
        setBranchKey(selectedOption.branch_key)
        setValues({ visible: true })
    };

    const handleSpotID = (val) => {
        setSpotID(val);
    }
    const getAllBranches = async () => {
        try {
            let BRANCHES = [];
            branches.map((el) => {
                BRANCHES.push({ name: el.name, value: el.name, label: el.name + " - " + el.location, location: el.location, branch_key: el.branch_key })
            })

            setBranches(BRANCHES);

        } catch (e) {

        }
    }

    const toggleQRCode = () => {
        setValues({ showQRCode: false, showStatus: true });

    }

    const downloadQR = () => {
        setValues({ showQRCode: false, showStatus: true })
        const canvas = document.getElementById("qrcode");
        const pngUrl = canvas
            .toDataURL("image/png")
            .replace("image/png", "image/octet-stream");
        let downloadLink = document.createElement("a");
        downloadLink.href = pngUrl;
        downloadLink.download = "table-1.png";
        document.body.appendChild(downloadLink);
        downloadLink.click();
        document.body.removeChild(downloadLink);
    };


    useEffect(() => {
        getAllBranches();
        console.log("merchant_key: ", merchant.merchant_key);
    }, [merchant, branchKey, selectedOption, spotID, progress, branches.length])

    return (
        <div>
            <div className="card" >
                <div className="card-header text-center"><span className="splash-description" style={{ textAlign: "left", fontSize: "1.2rem" }}>Generate New QRCode</span></div>
                <div className="card-body" style={{ padding: "2.25rem" }}>
                    <form onSubmit={handleSubmit(onSubmit)}>
                        {!values.showQRCode ?
                            <div>
                                {!progress ? <div>
                                    <div className="form-group">
                                        <Select
                                            styles={{
                                                control: (provided, state) => (values.branchError ? {
                                                    ...provided, borderColor: 'red',
                                                } : provided)
                                            }}
                                            isSearchable
                                            autoFocus
                                            isOptionSelected
                                            placeholder={"Choose Your Branch"}
                                            value={selectedOption}
                                            onChange={handleChange}
                                            //components={{ Option: BranchOption }}
                                            options={BRANCHES}
                                        />
                                        {values.branchError ?
                                            <div>
                                                branch is required.
                                        </div>
                                            : ""}
                                    </div>
                                    <div className="form-group">
                                        <input className="form-control form-control-lg" type="text" name="regNo" value={"EFVBV-DFDVZ-1"} disabled autoComplete="off" />
                                    </div>
                                    <div className="form-group">
                                        <input  className={"form-control form-control-lg " + (errors.tableNo ? 'is-invalid' : values.isValid)} ref={register({ required: true })} type="text" onChange={(e) => handleSpotID(e.target.value)} name="tableNo" placeholder="Table No." autoComplete="off" />
                                        <div className="invalid-feedback">
                                            {errors.tableNo && 'TableNo. is required.'}
                                        </div>
                                    </div>
                                </div> : <div className="form-goup" style={{ marginBottom: "60px", textAlign: "center" }}>
                                        <ReactLoading type={"spin"} color={"#EEE"} style={{ margin: "0 auto", width: "40%", height: "40%" }} />Loading...
                                    </div>}
                                <button type="submit" className="btn btn-space btn-primary" disabled={progress || values.showStatus}> <i className="fas fa-sync"></i> Generate</button>
                                <button type="button" className="btn btn-space btn-secondary" onClick={() => closeModal()}>Cancel</button>
                            </div>
                            : <div className="form-group">
                                <div style={{ textAlign: "center", marginBottom: "30px" }}>
                                    <QRCode
                                        id="qrcode"
                                        value={`http://order.thejomorder.com/store?merchant_key=${merchant.merchant_key}&branch_key=${branchKey}&spotID=${spotID}`}
                                        size={250}
                                        level={"H"}
                                    />
                                    <button className="btn btn-outline-primary center-block" disabled={!values.showQRCode} onClick={downloadQR}> Download QR </button>
                                </div>
                                <button type="button" className="btn btn-space btn-primary" onClick={toggleQRCode}> <i className="fas fa-redo"></i> Restore</button>
                                <button type="button" className="btn btn-space btn-secondary" onClick={() => closeModal()}>Cancel</button>
                            </div>}
                    </form>
                </div>

            </div>
        </div >
    )

});

export default GenerateQRCode;