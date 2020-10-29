import React, { useState, useEffect, forwardRef, useImperativeHandle, useRef } from 'react';
import { useForm } from 'react-hook-form';

const UpdateSpecialRequest = forwardRef(({ onSubmit, closeModal, item }, ref) => {
    let mounted = useRef();
    const { errors, register, handleSubmit } = useForm();
    const [itemID, setItemID] = useState(null);
    const [itemName, setItemName] = useState(null);
    const [values, setValues] = useState({
        isValid: false,
    });

    useImperativeHandle(ref, () => ({
        handleItemID() {
            return itemID;
        }
    }));

    const handleOnChangeName = (e) => {
        setItemName(e.target.value)
    }
    useEffect(() => {
        if (!mounted.current) {
            // do componentDidMount logic
            mounted.current = true;
        } else {
            // do componentDidUpdate logic
            setItemName(item.name)
            setItemID(item.id)
            document.getElementById("name").value = item.name;
        }
    }, [item, mounted.current])

    return (
        <div>
            <div className="card" >
                <div className="card-header text-center"><span className="splash-description" style={{ textAlign: "left", fontSize: "1.2rem" }}>Update Special Request</span></div>
                <div className="card-body" style={{ padding: "2.25rem" }}>
                    <form onSubmit={handleSubmit(onSubmit)}>
                        <div className="form-group">
                            <input className={"form-control form-control-lg " + (errors.name ? 'is-invalid' : values.isValid)} id="name" ref={register({ required: true })} value={itemName || ''} onChange={(e) => handleOnChangeName(e)} type="text" name="name" placeholder="Speical Name" autoComplete="off" />
                            <div className="invalid-feedback">
                                {errors.name && 'Speical Name is required.'}
                            </div>
                        </div>
                        <div className="form-group" >
                            <button type="submit" className="btn btn-space btn-primary">Save</button>
                            <button type="button" className="btn btn-space btn-secondary" onClick={() => closeModal()}>Cancel</button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    )
});
export default UpdateSpecialRequest;