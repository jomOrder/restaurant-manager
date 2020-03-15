import React, { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import QRCode from 'qrcode.react';
import { components } from 'react-select';
import Select from 'react-select';
import Avatar from 'react-avatar';
import { isEmpty } from 'lodash';

const options = [
    { value: 'Anwar Maju - Kelana Jaya', label: 'Anwar Maju - Kelana Jaya', avatar: "" },
    { value: 'Anwar Maju - Suwnay Payramid', label: 'Anwar Maju - Suwnay Payramid', avatar: "32" },
    { value: 'Anwar Maju - Chearas', label: 'Anwar Maju - Chearas', avatar: "34" },
];

const GenerateQRCode = ({ onSubmit, closeModal }) => {

    const { errors, register, handleSubmit } = useForm();
    const [values, setValues] = useState({
        isValid: false,
        selectedOption: null,
        showQRCode: false,
    });


    const BranchOption = props => {
        const { data } = props;
        return (
            <components.Option {...props}>
                <Avatar round size={30} name={data.label} src={data.avatar} />
                <label style={{ padding: "5px" }}>
                    {data.label}
                </label>
            </components.Option>
        );
    };

    const handleChange = selectedOption => {
        setValues({ selectedOption, visible: true })
        console.log(`Option selected:`, selectedOption);
    };

    const downloadQR = () => {
        const canvas = document.getElementById("123456");
        const pngUrl = canvas
            .toDataURL("image/png")
            .replace("image/png", "image/octet-stream");
        let downloadLink = document.createElement("a");
        downloadLink.href = pngUrl;
        downloadLink.download = "123456.png";
        document.body.appendChild(downloadLink);
        downloadLink.click();
        document.body.removeChild(downloadLink);
    };


    const handleQRCode = () => {
        if (!isEmpty(errors)) setValues({ showQRCode: true });
    }


    useEffect(() => {
       
    }, [])

    return (
        <div>
            <div className="card" >
                <div className="card-header text-center"><span className="splash-description" style={{ textAlign: "left", fontSize: "1.2rem" }}>Generate New QRCode</span></div>
                <div className="card-body" style={{ padding: "2.25rem" }}>
                    <form onSubmit={handleSubmit(onSubmit)}>
                        {!values.showQRCode ?
                            <div>
                                
                                <div className="form-group">
                                    <Select
                                        isSearchable
                                        autoFocus
                                        placeholder={"Choose Your Branch"}
                                        value={values.selectedOption}
                                        onChange={handleChange}
                                        components={{ Option: BranchOption }}
                                        options={options}
                                    />
                                </div>
                                <div className="form-group">
                                    <input className="form-control form-control-lg" type="text" name="regNo" value={"EFVBV-DFDVZ-1"} disabled autoComplete="off" />
                                </div>
                                <div className="form-group">
                                    <input className={"form-control form-control-lg " + (errors.tableNo ? 'is-invalid' : values.isValid)} ref={register({ required: true })} type="text" name="tableNo" placeholder="Table No." autoComplete="off" />
                                    <div className="invalid-feedback">
                                        {errors.tableNo && 'TableNo. is required.'}
                                    </div>
                                </div>
                            </div>
                            : <div className="orm-group">
                                <div style={{ textAlign: "center", marginBottom: "30px" }}>
                                    <QRCode
                                        id="123456"
                                        value="123456"
                                        size={250}
                                        level={"H"}
                                    />
                                    <button className="btn btn-outline-primary center-block" onClick={downloadQR}> Download QR </button>
                                </div>
                            </div>}
                        <div className="form-group" >
                            <button type="submit" className="btn btn-space btn-primary" onClick={handleQRCode}> <i className={values.showQRCode ? "fas fa-redo" : "fas fa-sync"}></i> {values.showQRCode ? "Restore" : "Generate"}</button>
                            <button type="button" className="btn btn-space btn-secondary" onClick={() => closeModal()}>Cancel</button>
                        </div>

                    </form>

                </div>

            </div>
        </div>
    )

}

export default GenerateQRCode;