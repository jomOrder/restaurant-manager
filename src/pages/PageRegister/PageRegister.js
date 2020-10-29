import "react-step-progress-bar/styles.css";
import 'rsuite/dist/styles/rsuite-default.css';
import React, { useEffect, useState, useCallback, useRef } from 'react';
import TopBarProgress from "react-topbar-progress-indicator";
import RegisterForm from '../../components/RegisterForm/RegisterForm';
import MerchantForm from '../../components/MerchantForm/MerchantForm';
import RegisterBusiness from '../../components/RegisterBusiness';
import { Steps, Checkbox, ButtonToolbar, Panel } from 'rsuite';
import { useForm } from 'react-hook-form'
import { useHistory } from "react-router-dom";
import { connect } from 'react-redux'
import { useAlert } from 'react-alert'
import { userRegister, uploadMerchantImage } from '../../actions'
import _ from 'lodash';

TopBarProgress.config({
    barColors: {
        "0": "#be1c1c",
        "0.5": "#be1c1c",
        "1.0": "#be1c1c"
    },
    shadowBlur: 1
});


const PageRegister = ({ userRegister, auth, uploadMerchant, uploadMerchantImage }) => {
    let history = useHistory();
    const { errors, handleSubmit, register } = useForm();
    const childRef = useRef();
    const alert = useAlert()
    const [step, setStep] = useState(0);
    const [merchant, setMerchant] = useState(null);
    const [loading, setLoading] = useState(true);
    const [merchantImage, setMerchantImage] = useState(null);
    const [retail, setRetail] = useState(null);

    const renderSwitch = (param) => {
        switch (param) {
            case 0:
                return <RegisterBusiness onSubmitBusinessName={onSubmitBusinessName} />;
            case 1:
                return <ChooseSolution />;
            case 2:
                return <MerchantForm ref={childRef} onSubmitMerchant={onSubmitMerchant} />;
            case 3:
                return <RegisterForm ref={childRef} onSubmitSignup={onSubmitSignup} />;
        }
    }

    const onChange = nextStep => {
        setStep(nextStep < 0 ? 0 : nextStep > 3 ? 3 : nextStep);
    };
    const onNext = () => {
        onChange(step + 1);
        if (step === 3) history.push('/verify')
    };
    const onPrevious = () => onChange(step - 1);

    const onSubmitBusinessName = (data) => {
        setRetail(data);
        if (data) onNext();
    }

    const onSubmitMerchant = useCallback((data) => {
        let file = childRef.current.handleFileUpload();
        let business_type = childRef.current.handleBusinessType();
        let retail_name = retail.retail_name.toLowerCase().trim().split(/\s+/).join('-');
        retail.business_type = business_type;
        uploadMerchantImage(file, retail_name);
        let complete_merchant = data;
        _.assign(complete_merchant, retail)
        setMerchant(complete_merchant);
        onNext()

    });

    const onSubmitSignup = useCallback((data) => {
        let image = {
            url: merchantImage
        }
        merchant.image = image;
        setMerchant(merchant);
        let dataWithoutPass2 = _.omit(data, ['password2'])
        _.assign(dataWithoutPass2, { merchant })
        userRegister(dataWithoutPass2);
    });

    const onSubmitSolution = (data) => {
        onNext();
    }

    const successRegister = () => {
        history.push("/verify")
    }

    const checkUser = () => {
        alert.error(<div style={{ textTransform: "lowercase" }}>{auth.message}</div>)
    }

    const ChooseSolution = () => {
        return (
            <div style={{ marginBottom: 40 }}>
                <div style={{ marginBottom: 20 }}>
                    <h3>Choose the solutions you need</h3>
                    <p>You can add or remove solutions later</p>
                </div>
                <form onSubmit={handleSubmit(onSubmitSolution)}>
                    <div class="widgets-wrapper">
                        <div class="content-widget--1 mb--15">
                            <div class="widget-icon">
                                <Checkbox ref={register({ required: true })} />
                            </div>
                            <div class="widget-text">
                                <h3 class="title">QR / Mobile Menu</h3>
                                <span class="sub-title">Customers can check your menu and order from their personal smartphones. Just place QR codes on the tables at your restaurant.</span>
                            </div>
                        </div>
                        <div class="content-widget--1 mb--15">
                            <div class="widget-icon">
                                <Checkbox />
                            </div>
                            <div class="widget-text">
                                <h3 class="title">Handheld Terminal Starter Pack</h3>
                                <span class="sub-title">Customers can check your menu and order from their personal smartphones. Just place QR codes on the tables at your restaurant.</span>
                            </div>
                        </div>
                        <div class="content-widget--1 mb--15">
                            <div class="widget-icon">
                                <Checkbox />
                            </div>
                            <div class="widget-text">
                                <h3 class="title">Enterprise Desktop POS System</h3>
                                <span class="sub-title">Customers can check your menu and order from their personal smartphones. Just place QR codes on the tables at your restaurant.</span>
                            </div>
                        </div>
                        <div class="content-widget--1 mb--15">
                            <div class="widget-icon">
                                <Checkbox />
                            </div>
                            <div class="widget-text">
                                <h3 class="title">POS System Integration</h3>
                                <span class="sub-title">Your partners are our partners! JomOrder integrates with the world’s leading POS, payment, printer systems and your existing partners to fit all the needs of your business. Check our current partners below.</span>
                            </div>
                        </div>
                    </div>
                </form>
            </div>
        )
    }
    useEffect(() => {
        setTimeout(() => {
            setLoading(false);
        }, 400)
        if (uploadMerchant.err === 0) setMerchantImage(uploadMerchant.image);
        if (auth.err === 12 || auth.err === 20) checkUser()
        if (auth.err === 15) successRegister()
    }, [auth, uploadMerchant.length, loading]);
    return (
        <div>
            {loading ? <TopBarProgress /> : false}
            {step > 0 ? <div>
                <Steps current={step} style={{
                    width: 500,
                    justifyContent: 'center', alignContent: 'center', alignItems: 'center',
                    alignSelf: 'center',
                }}>
                    <Steps.Item />
                    <Steps.Item />
                    <Steps.Item />
                    <Steps.Item />
                </Steps>
                <div className="container">
                    <Panel>
                        <div style={{ margin: "0 auto" }} class="col-lg-6 col-xl-6 col-md-6" data-aos="fade-right" data-aos-duration="500" data-aos-once="true">
                            {renderSwitch(step)}
                            <ButtonToolbar style={{ textAlign: 'center' }}>
                                {step >= 2 ? null : <button onClick={onPrevious} disabled={step === 0} style={{ borderRadius: 30, height: 45, minWidth: 90, fontWeight: 300, fontSize: 15, paddingLeft: 45, paddingRight: 45 }} class="btn--primary">Back</button>}
                                {step >= 2 ? null : <button onClick={onNext} style={{ borderRadius: 30, height: 45, minWidth: 90, fontWeight: 300, fontSize: 15, paddingLeft: 45, paddingRight: 45 }} class="btn--primary">Next</button>}
                            </ButtonToolbar>
                        </div>
                    </Panel>
                </div>
            </div>
                : renderSwitch(step)
            }
        </div >
    )
}

const mapStateToProps = ({ auth, uploadMerchant }) => {
    return { auth, uploadMerchant }
}

export default connect(mapStateToProps, { userRegister, uploadMerchantImage })(PageRegister);
