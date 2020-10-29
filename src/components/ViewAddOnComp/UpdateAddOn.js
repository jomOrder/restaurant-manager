import React, { useState, useEffect, forwardRef, useImperativeHandle, useRef } from 'react';
import { useForm } from 'react-hook-form';

const UpdateAddOn = forwardRef(({ onSubmit, closeModal, item }, ref) => {
    let mounted = useRef();
    const { errors, register, handleSubmit } = useForm();
    const [itemID, setItemID] = useState(null);
    const [itemName, setItemName] = useState(null);
    const [itemPrice, setItemPrice] = useState(null);

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

    const handleOnChangePrice = (e) => {
        setItemPrice(e.target.value)
    }

    useEffect(() => {
        if (!mounted.current) {
            // do componentDidMount logic
            mounted.current = true;
        } else {
            // do componentDidUpdate logic
            setItemName(item.name)
            setItemPrice(item.price)
            setItemID(item.id)
            document.getElementById("name").value = item.name;
            document.getElementById("price").value = item.price;

        }
    }, [item, mounted.current])

    return (
        <div>
            <div className="card" >
                <div className="card-header text-center"><span className="splash-description" style={{ textAlign: "left", fontSize: "1.2rem" }}>Update AddOn</span></div>
                <div className="card-body" style={{ padding: "2.25rem" }}>
                    <form onSubmit={handleSubmit(onSubmit)}>
                        <div className="form-group">
                            <input className={"form-control form-control-lg " + (errors.name ? 'is-invalid' : values.isValid)} id="name" ref={register({ required: true })} value={itemName || ''} onChange={(e) => handleOnChangeName(e)} type="text" name="name" placeholder="Item Name" autoComplete="off" />
                            <div className="invalid-feedback">
                                {errors.name && 'Item Name is required.'}
                            </div>
                        </div>
                        <div className="form-group">
                            <div className="input-group">
                                <div class="input-group-prepend">
                                    <div class="input-group-text">RM</div>
                                </div>
                                <input className={"form-control form-control-lg " + (errors.price ? 'is-invalid' : values.isValid)} ref={register({ required: true })} type="text" name="price" value={itemPrice || ''} onChange={(e) => handleOnChangePrice(e)}  id="price" placeholder="Item Price" autoComplete="off" />
                            </div>
                            <div className="invalid-feedback">
                                {errors.price && 'Item Price is required.'}
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
export default UpdateAddOn;