import React, { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form'

const RegisterBusiness = ({ onSubmitBusinessName }) => {
    const { errors, handleSubmit, register } = useForm();
    const [values, setValues] = useState({
        isValid: '',
    });

    useEffect(() => {
    }, []);
    return (
        <div>
            <div className="dashboard-header">
                <nav className="navbar navbar-expand-lg bg-white fixed-top">
                    <a className="navbar-brand" style={{ marginTop: 0, marginBottom: 0, marginLeft: 'auto', marginRight: 'auto' }} href="/"><img className="logo-img" style={{ width: 180 }} src="../assets/images/JomOrder-logo.png" alt="logo" /></a>
                </nav>
            </div>
            <div style={{ textAlign: 'center' }} class="omga-07__hero-area bg-black-squeeze">
                <div class="container">
                    <div class="row align-items-center">
                        <div class="col-lg-12 col-xl-12 col-md-12" data-aos="fade-right" data-aos-duration="500" data-aos-once="true">
                            <div class="omga-07__hero-content ">
                                <h1 class="title">Create your menu just in <br class="d-none d-lg-block"></br> seconds and get your <span style={{ color: "#e02d2d" }}>14 Days FREE!<br></br> No credit card, no commitments</span></h1>
                                <form onSubmit={handleSubmit(onSubmitBusinessName)} class="mt--35">
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
                                    </div>
                                </form>
                                <div style={{marginTop: 20}}>
                                    <div class="header-btns ml-auto ml-lg-0 mr--15 mr-lg--0">
                                        <span>Already have an account? </span> <a style={{ marginLeft: 5, marginRight: 40, color: "#e02d2d", marginBottom: 20 }} class="hvr-bounce-to-left" href="/signin"> Sign in</a>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
};

export default RegisterBusiness;