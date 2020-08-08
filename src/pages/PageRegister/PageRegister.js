import React, { useEffect, useState, useCallback } from 'react';
import API from '../../services/API';
import "react-step-progress-bar/styles.css";
import 'rsuite/dist/styles/rsuite-default.css';
import ProgressBarAlignment from '../../components/ProgressBarAlignment/ProgressBarAlignment';
import RegisterForm from '../../components/RegisterForm/RegisterForm';
import { Steps, Checkbox, ButtonToolbar, Panel } from 'rsuite';
import MerchantForm from '../../components/MerchantForm/MerchantForm';
const styles = {
    width: '200px',
    display: 'inline-table',
    verticalAlign: 'top',
};


const PageRegister = props => {
    const [step, setStep] = useState(0);

    const [values, setValues] = useState({
        loading: 5,
        submitRegister: false,
        name: null,
        email: null,
        password: null,
    });

    const renderSwitch = (param) => {
        switch (param) {
            case 0:
                return <RegisterBusiness />;
            case 1:
                return <ChooseSolution />;
            case 2:
                return <MerchantForm />;
            case 3:
                return <RegisterForm />;
            default:
                return 'foo';
        }
    }

    const onChange = nextStep => {
        setStep(nextStep < 0 ? 0 : nextStep > 3 ? 3 : nextStep);
    };
    const onNext = () => onChange(step + 1);
    const onPrevious = () => onChange(step - 1);


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
                            <div class="col-lg-5 col-xl-4 col-md-5 col-sm-6 mb--30 mb-md--0" data-aos="fade-right" data-aos-duration="500" data-aos-delay="1600" data-aos-once="true">
                                <div class="omga-07__hero-image">
                                    <img src="./image/png/l7-hero-image.png" alt="" />
                                </div>
                            </div>
                            <div class="col-lg-12 col-xl-12 col-md-12" data-aos="fade-right" data-aos-duration="500" data-aos-once="true">
                                <div class="omga-07__hero-content ">
                                    <h1 class="title">Create your menu just in <br class="d-none d-lg-block"></br> seconds and get your <span style={{ color: "#e02d2d" }}>14 Days FREE!</span></h1>
                                    <form action="./" class="mt--35">
                                        <div class="omga-07__hero-form">
                                            <div class="input-group">
                                                <input type="text" placeholder="What's the name of your business?" />
                                                <i class="fa fa-store"></i>
                                            </div>
                                        </div>
                                        <div class="cta-form--1">
                                            <button onClick={onNext} class="btn--primary hvr-bounce-to-left submit-btn">Next </button>
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
                <div class="widgets-wrapper">
                    <div class="content-widget--1 mb--15">
                        <div class="widget-icon">
                            <Checkbox />
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
            </div>

        )
    }
    useEffect(() => {
    }, [values.loading]);

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
                                <button onClick={onPrevious} disabled={step === 0} style={{ borderRadius: 30, height: 45, minWidth: 90, fontWeight: 300, fontSize: 15, paddingLeft: 45, paddingRight: 45 }} class="btn--primary">Back</button>
                                <button onClick={onNext} disabled={step === 3} style={{ borderRadius: 30, height: 45, minWidth: 90, fontWeight: 300, fontSize: 15, paddingLeft: 45, paddingRight: 45 }} class="btn--primary">Next</button>
                            </ButtonToolbar>
                        </div>
                    </Panel>

                </div>

            </div>
                : renderSwitch(step)
            }
            {/* <div className="splash-container">
                <ProgressBarAlignment loading={values.loading} />
                <div className="card" style={{ marginTop: "30px" }}>
                    <div className="card-header text-center"><a href="/"><img className="logo-img" style={{ width: "240px" }} src="../assets/images/JomOrder-logo.png" alt="logo" /></a><span className="splash-description">Let's get started. <br />  No credit card, no commitments.</span></div>
                    <div className="card-body">

                        <RegisterForm handleProgressBarOnChange={handleProgressBarOnChange} handleRegisterOnSubmit={handleRegisterOnSubmit} />

                    </div>
                    {values.loading < 50 ? <div className="card-footer bg-white">
                        <p>Already member? <a href="/signin" className="text-secondary">Login Here.</a></p>
                    </div> : ""}
                </div>
                <p >Copyright © 2020 JomOrder Inc. All Rights Reserved.</p>
            </div> */}
        </div >
    )

}

export default PageRegister;

