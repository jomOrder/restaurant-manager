import React, { useEffect, useState, useCallback, useRef } from 'react';
import { useForm } from 'react-hook-form';
import { useAlert } from 'react-alert'
import ReactLoading from "react-loading";
import _ from 'lodash';
import Card from "react-credit-cards";
import "react-credit-cards/es/styles-compiled.css";
import { formatCreditCardNumber, formatExpirationDate, formatFormData, formatCVC } from '../../modules/utils'


const CardPaymentInfo = ({ }) => {
    const { register, errors, handleSubmit, watch } = useForm(); // initialise the hook
    const [user, setUser] = useState();
    const alert = useAlert()
    const [values, setValues] = useState({
        isValid: '',
        showLoading: false,
        validation: false,
    });
    const [number, setNumber] = useState("");
    const [name, setName] = useState("");
    const [expiry, setExpiry] = useState("");
    const [cvc, setCVC] = useState("");
    const [issuer, setIssuer] = useState("");
    const [focused, setFocused] = useState("");
    const [formData, setFormData] = useState("");


    const handleCallback = ({ issuer }, isValid) => {
        if (isValid) {
            setIssuer(issuer);
        }
    };


    const handleInputFocus = ({ target }) => {
        setFocused(target.name)
    };

    const handleInputChange = ({ target }) => {
        if (target.name === "name") {
            setName(target.value);
        }
        if (target.name === "number") {
            target.value = formatCreditCardNumber(target.value);
            setNumber(target.value);
        } else if (target.name === "expiry") {
            target.value = formatExpirationDate(target.value);
            setExpiry(target.value)
        } else if (target.name === "cvc") {
            target.value = formatCVC(target.value);
        }

        // this.setState({ [target.name]: target.value });
    };

    useEffect(() => {

    }, []);
    return (
        <div style={{ marginBottom: 30, marginTop: 30 }}>
            <Card
                number={number}
                name={name}
                expiry={expiry}
                cvc={cvc}
                focused={focused}
                callback={handleCallback}
            />
            <form action="" method="POST">
                <div style={{ marginTop: 20 }}>
                    <div className="form-group">
                        <input className={"form-control form-control-lg " + (errors.name ? 'is-invalid' : values.isValid)} type="text" ref={register({ required: true })} name="name" placeholder="Card Holder Name" autoComplete="off" onChange={(e) => handleInputChange(e)}
                            onFocus={(e) => handleInputFocus(e)} />
                        <div class="invalid-feedback">
                            {errors.name && 'Card Holder Name is required.'}
                        </div>
                    </div>
                    <div className="form-group">
                        <input className={"form-control form-control-lg " + (errors.number ? 'is-invalid' : values.isValid)} type="text" name="number" ref={register({ required: true })} placeholder="Credit / Debit Card Number" autoComplete="off" onChange={(e) => handleInputChange(e)}
                            onFocus={(e) => handleInputFocus(e)} />
                        <div class="invalid-feedback">
                            {errors.number && 'Card Number is required.'}
                        </div>
                    </div>
                    <div class="d-flex flex-row">
                        <div className="form-group" style={{ flex: 1 }}>
                            <input className={"form-control form-control-lg " + (errors.expire ? 'is-invalid' : values.isValid)} type="text" name="expiry" placeholder="Valid Thru" autoComplete="off" onChange={(e) => handleInputChange(e)}
                                onFocus={(e) => handleInputFocus(e)} />
                            <div class="invalid-feedback">
                                {errors.expiry && 'expire is required.'}
                            </div>
                        </div>
                        <div className="form-group" style={{ flex: 1, paddingLeft: 10 }}>
                            <input className={"form-control form-control-lg " + (errors.cvc ? 'is-invalid' : values.isValid)} type="password" maxlength="3" name="cvc" placeholder="CVV" autoComplete="off" onChange={(e) => handleInputChange(e)}
                                onFocus={(e) => handleInputFocus(e)} />
                            <div class="invalid-feedback">
                                {errors.cvc && 'CVC is required.'}
                            </div>
                        </div>
                    </div>
                </div>
            </form>
        </div>
    )
};

export default CardPaymentInfo;