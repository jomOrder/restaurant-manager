import React, { useEffect, useState, useCallback } from 'react';
import API from '../../services/API';
import './index.css';
import Notification from 'rc-notification';
import 'rc-notification/assets/index.css';
import Modal from 'react-awesome-modal'
import HashLoader from 'react-spinners/HashLoader'


let notification = null;
Notification.newInstance({}, (n) => notification = n);
const override = css`
  display: block;
  margin: 0 auto;
`;

const PageLogin = props => {
    const { register, errors, handleSubmit, watch } = useForm(); // initialise the hook

    const [values, setValues] = useState({
        showLoading: false,
        isValid: ''
    });

    const onSubmit = (data) => {
        console.log(data)
    }

    const closableFn = () => {
        notification.notice({
          content: <span>closable</span>,
          onClose() {
            console.log('closable close');
          },
          closable: true,
          onClick() {
            console.log('clicked!!!');
          },
        });
      }

    useEffect(() => {
    }, [values.showLoading]);

    return (
        <div>
            <div className="splash-container">
                <Modal visible={values.showLoading} width="100" height="110" effect="fadeInUp">
                    <HashLoader
                        css={override}
                        size={35}
                        color={"#123abc"}
                        loading={values.showLoading}
                    />
                </Modal>
                <div className="card" style={{ marginTop: "30px" }}>
                    <div className="card-header text-center"><a href="/"><img className="logo-img" style={{ width: "240px" }} src="../assets/images/jom_logo.png" alt="logo" /></a><span className="splash-description">Let's get started. <br />  No credit card, no commitments.</span></div>
                    <div className="card-body">
                        <form onSubmit={handleSubmit(onSubmit)}>
                            <div className="form-group">
                                <input ref={register({ required: true, pattern: /^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$/ })} className={"form-control form-control-lg " + (errors.email ? 'is-invalid' : values.isValid)} type="email" name="email" placeholder="E-mail" autoComplete="off" />
                                <div className="invalid-feedback">
                                    {errors.email && 'email is required.'}
                                </div>
                            </div>
                            <div className="form-group">
                                <input className={"form-control form-control-lg " + (errors.password ? 'is-invalid' : values.isValid)} ref={register({ required: true, minLength: 9, pattern: /(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,}/ })} name="password" type="password" placeholder="Password" />
                                <div className="invalid-feedback">
                                    {errors.password && 'password required'}
                                </div>
                            </div>
                            <div className="form-group pt-2">
                                <button disabled={values.showLoading ? 'disabled' : ''} value="E" className="btn btn-block btn-primary" type="submit">Signin</button>
                            </div>
                        </form>
                    </div>
                </div>
                <p >Copyright © 2020 JomOrder Inc. All Rights Reserved.</p>
            </div>
        </div>
    )

}

export default PageLogin;

