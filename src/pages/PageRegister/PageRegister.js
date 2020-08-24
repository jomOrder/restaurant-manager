import React, { useEffect, useState, useCallback, useRef } from 'react';
import "react-step-progress-bar/styles.css";
import 'rsuite/dist/styles/rsuite-default.css';
import RegisterForm from '../../components/RegisterForm/RegisterForm';
import { Steps, Checkbox, ButtonToolbar, Panel } from 'rsuite';
import MerchantForm from '../../components/MerchantForm/MerchantForm';
import { useForm } from 'react-hook-form'
import { useHistory } from "react-router-dom";
import { connect } from 'react-redux'
import { userRegister, uploadMerchantImage } from '../../actions'
import _ from 'lodash';
import { useAlert } from 'react-alert'

const PageRegister = ({ userRegister, auth, uploadMerchant, uploadMerchantImage }) => {
    const childRef = useRef();
    const alert = useAlert()
    const { errors, handleSubmit, register } = useForm();
    const [step, setStep] = useState(0);
    const [merchant, setMerchant] = useState(null);
    const [merchantImage, setMerchantImage] = useState(null);
    const [retail, setRetail] = useState(null);

    let history = useHistory();
    const [values, setValues] = useState({
        isValid: '',
    });

    const renderSwitch = (param) => {
        switch (param) {
            case 0:
                return <RegisterBusiness />;
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

    const handleBusinessNameSubmit = (data) => {
        setRetail(data);
        if (data) onNext();
    }

    const onSubmitMerchant = useCallback((data) => {
        let file = childRef.current.handleFileUpload();
        console.log("File image: ", file)
        let retail_name = retail.retail_name.toLowerCase().trim().split(/\s+/).join('-');
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
        console.log(dataWithoutPass2);
        userRegister(dataWithoutPass2);
        // handleRegisterOnSubmit(100)
        // childRef.current.hanldeValidInput()
    });

    const onSubmitSolution = (data) => {
        console.log(data);
        onNext();
    }

    const successRegister = () => {
        history.push("/verify")
    }

    const checkUser = () => {
        alert.error(<div style={{ textTransform: "lowercase" }}>{auth.message}</div>)
    }

    const RegisterBusiness = () => {
        return (
            <div>
                <header class="site-header sticky-header mobile-sticky">
                    <div style={{ marginTop: 10 }} class="container-fluid pr-lg--30 pl-lg--30">
                        <nav class="navbar site-navbar offcanvas-active navbar-expand-lg navbar-light">
                            <div class="brand-logo"><a href="/"><img src="/assets/images/logo-1.png" alt="" /></a></div>
                            <div class="collapse navbar-collapse" id="mobile-menu">
                                <div class="navbar-nav ml-lg-auto mr--10">
                                    <button class="btn-close navbar-toggler" type="button" data-toggle="collapse" data-target="#mobile-menu" aria-controls="mobile-menu" aria-expanded="true" aria-label="Toggle navigation">
                                        <i class="icon icon-simple-remove"></i>
                                    </button>
                                </div>
                            </div>
                            <p>Already have an account? </p>
                            <div class="header-btns ml-auto ml-lg-0 mr--15 mr-lg--0"><a style={{ marginLeft: 20, marginRight: 40, color: "#e02d2d", marginBottom: 20 }} class="hvr-bounce-to-left" href="#">Sign in</a></div>
                        </nav>
                    </div>
                </header>
                <div style={{ textAlign: 'center' }} class="omga-07__hero-area bg-black-squeeze">
                    <div class="container">
                        <div class="row align-items-center">
                            <div class="col-lg-12 col-xl-12 col-md-12" data-aos="fade-right" data-aos-duration="500" data-aos-once="true">
                                <div class="omga-07__hero-content ">
                                    <h1 class="title">Create your menu just in <br class="d-none d-lg-block"></br> seconds and get your <span style={{ color: "#e02d2d" }}>14 Days FREE!<br></br> No credit card, no commitments</span></h1>
                                    <form onSubmit={handleSubmit(handleBusinessNameSubmit)} class="mt--35">
                                        <div class="omga-07__hero-form">
                                            <div class="input-group">
                                                <input className={"form-control form-control-lg " + (errors.retail_name ? 'is-invalid' : values.isValid)} ref={register({ required: true })} type="text" placeholder="What's the name of your business?" name="retail_name" autoComplete="off" />
                                                <i class="fa fa-store"></i>
                                                <div class="invalid-feedback">
                                                    {errors.retail_name && 'Restauran Name is required.'}
                                                </div>
                                            </div>
                                        </div>
                                        <div class="cta-form--1">
                                            <button type="submit" class="btn--primary hvr-bounce-to-left submit-btn">Next </button>
                                            {/* <Spinner radius={30} color={"#FFF"} stroke={3} visible={true} /> */}
                                        </div>
                                    </form>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
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
        if (uploadMerchant.err === 0) setMerchantImage(uploadMerchant.image);
        if (auth.err === 12 || auth.err === 20) checkUser()
        if (auth.err === 15) successRegister()
    }, [auth, uploadMerchant.length]);
    return (
        <div>
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
