import React, { useEffect, useState, useCallback } from 'react';
import API from '../../services/API';
import "react-step-progress-bar/styles.css";
import ProgressBarAlignment from '../../components/ProgressBarAlignment/ProgressBarAlignment';
import RegisterForm from '../../components/RegisterForm/RegisterForm';

const PageRegister = props => {

    const [values, setValues] = useState({
        loading: 5,
        submitRegister: false,
        name: null,
        email: null,
        password: null,
    });

    const handleProgressBarOnChange = useCallback(
        (event, val) => {
            if (event.target.value.length === 0) return setValues({ loading: 0 })
            switch (val) {
                case 0:
                    setValues({ loading: 10 });
                    break;
                case 1:
                    setValues({ loading: 20 })
                    break;
                case 2:
                    setValues({ loading: 30 })
                    break;
                case 3:
                    setValues({ loading: 40 })
                    break;
                case 4:
                    setValues({ loading: 50 })
                    break;
                case 5:
                    setValues({ loading: 60 })
                    break;
                case 6:
                    setValues({ loading: 70 })
                    break;
                case 7:
                    setValues({ loading: 80 })
                    break;
                case 8:
                    setValues({ loading: 85 })
                    break;
            }
        },
        [values.loading]
    );

    const handleRegisterOnSubmit = useCallback(
        (val) => {
            setValues({ loading: val })
        }
    )

    useEffect(() => {
    }, [values.loading]);

    return (
        <div>
            <div className="splash-container">
                <ProgressBarAlignment loading={values.loading} />
                <div className="card" style={{ marginTop: "30px" }}>
                    <div className="card-header text-center"><a href="/"><img className="logo-img" style={{ width: "240px" }} src="../assets/images/JomOrder-logo.png" alt="logo" /></a><span className="splash-description">Let's get started. <br />  No credit card, no commitments.</span></div>
                    <div className="card-body">
                        <RegisterForm handleProgressBarOnChange={handleProgressBarOnChange} handleRegisterOnSubmit={handleRegisterOnSubmit} />
                        <div className="form-group">
                            <label className="custom-control custom-checkbox">
                                <input className="custom-control-input" type="checkbox" /><span className="custom-control-label">you agree the <a href="#">terms and conditions</a></span>
                            </label>
                        </div>
                    </div>
                    {values.loading < 50 ? <div className="card-footer bg-white">
                        <p>Already member? <a href="/signin" className="text-secondary">Login Here.</a></p>
                    </div> : ""}
                </div>
                <p >Copyright © 2020 JomOrder Inc. All Rights Reserved.</p>
            </div>
        </div >
    )

}

export default PageRegister;

