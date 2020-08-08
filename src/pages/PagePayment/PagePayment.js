import { useHistory } from "react-router-dom";
import React, { forwardRef, useState, useEffect, useImperativeHandle } from 'react';
import { useForm } from 'react-hook-form'
import ReactLoading from "react-loading";
import { connect } from 'react-redux'
import 'sweetalert2/dist/sweetalert2.css'
import PropTypes from 'prop-types';
import { viewAllBanking } from '../../actions'
import Avatar from 'react-avatar';
import Spinner from 'react-spinner-material';
import { Pane, Heading, Button } from 'evergreen-ui'
import CardPaymentInfo from "../../components/CardPaymentInfo/CardPaymentInfo";
import OnlineBankingFPX from "../../components/OnlineBankingFPX/OnlineBankingFPX";

const PagePayment = ({ onSubmitMerchant, viewAllBanking, banks }) => {
    const { errors, handleSubmit, register } = useForm();
    let history = useHistory();
    const [step, setStep] = useState(0);
    const [values, setValues] = useState({
        loading: true,
        password: null,
        isValid: '',
        showLoading: false
    })

    const renderSwitch = (param) => {
        switch (param) {
            case 0:
                return <CardPaymentInfo />;
            case 1:
                return <OnlineBankingFPX />;
            default:
                return null;
        }
    }

    useEffect(() => {
        viewAllBanking();
        console.log(banks)
        setTimeout(() => {
            setValues({ loading: false })
        }, 2000)
    }, [banks.length]);

    return (
        <div>
            <div className="dashboard-header">
                <nav className="navbar navbar-expand-lg bg-white fixed-top">
                    <a className="navbar-brand" style={{ marginTop: 0, marginBottom: 0, marginLeft: 'auto', marginRight: 'auto' }} href="/"><img className="logo-img" style={{ width: 180 }} src="../assets/images/JomOrder-logo.png" alt="logo" /></a>
                </nav>
            </div>
            <div className="splash-container">
                <div>
                    <div class="d-flex flex-row">
                        <Avatar style={{ marginRight: 10 }} round size={60} name={"AM"} src={"AM"} />
                        <div>
                            <p style={{ margin: 0 }}>Restoran Anwar Maju</p>
                            <p style={{ fontWeight: 100, fontSize: 12 }}>joined since 2019</p>
                        </div>
                    </div>
                </div>
                <div style={{ marginTop: 25, marginBottom: 25 }}>
                    <h3 style={{ fontSize: 23, fontWeight: 400 }}>Order Summary</h3>
                </div>
                <div style={{
                    backgroundColor: "#dcdcdc",
                    paddingTop: 5,
                    paddingLeft: 20,
                    paddingRight: 20,
                    paddingBottom: 5
                }}>
                    <div style={{ borderBottomWidth: 2, borderBottomStyle: 'solid', borderBottomColor: "#a9a9a9", padding: 10 }} class="d-flex justify-content-between">
                        <div>
                            <p style={{ fontSize: 14, fontWeight: 100 }}>Total Price</p>
                        </div>
                        <div>
                            <p style={{ fontSize: 14, fontWeight: 100 }}>RM 188.0</p>
                        </div>
                    </div>
                    <div class="d-flex justify-content-between" style={{ padding: 10 }}>
                        <div >
                            <p>Grand Total (RM)	</p>
                        </div>
                        <div >
                            <p>RM 188.00</p>
                        </div>
                    </div>
                </div>
                <form onSubmit={handleSubmit(onSubmitMerchant)}>
                    <div style={{ marginTop: 25, marginBottom: 25 }}>
                        <h3 style={{ fontSize: 23, fontWeight: 400 }}>Your Contact Information</h3>
                    </div>
                    <div className="form-group">
                        <input className={"form-control form-control-lg " + (errors.first_name ? 'is-invalid' : values.isValid)} type="text" name="first_name" placeholder="First Name" autoComplete="off" />
                        <div class="invalid-feedback">
                            {errors.first_name && 'First Name is required.'}
                        </div>
                    </div>
                    <div className="form-group">
                        <input className={"form-control form-control-lg " + (errors.last_name ? 'is-invalid' : values.isValid)} type="text" name="last_name" placeholder="Last Name" autoComplete="off" />
                        <div class="invalid-feedback">
                            {errors.last_name && 'Last Name is required.'}
                        </div>
                    </div>
                    <div className="form-group">
                        <input className={"form-control form-control-lg " + (errors.mobile ? 'is-invalid' : values.isValid)} type="phone" name="mobile" placeholder="Mobile Number" autoComplete="off" />
                        <div class="invalid-feedback">
                            {errors.mobile && 'Mobile Number is required.'}
                        </div>
                    </div>
                    <div className="form-group">
                        <input className={"form-control form-control-lg " + (errors.email ? 'is-invalid' : values.isValid)} type="text" name="email" placeholder="Email" autoComplete="off" />
                        <div class="invalid-feedback">
                            {errors.restaurant && 'Email is required.'}
                        </div>
                    </div>
                    <div className="form-group">
                        <input className={"form-control form-control-lg " + (errors.address ? 'is-invalid' : values.isValid)} type="text" name="address" placeholder="Address" autoComplete="off" />
                        <div class="invalid-feedback">
                            {errors.postalCode && 'Address is required.'}
                        </div>
                    </div>
                    <div className="form-group">
                        <input className={"form-control form-control-lg " + (errors.postalCode ? 'is-invalid' : values.isValid)} type="text" name="postalCode" placeholder="Postal Code" autoComplete="off" />
                        <div class="invalid-feedback">
                            {errors.postalCode && 'Postal Code is required.'}
                        </div>
                    </div>
                    <div style={{ marginTop: 25, marginBottom: 25 }}>
                        <h3 style={{ fontSize: 23, fontWeight: 400 }}>Choose Payment Method</h3>
                    </div>
                    <div className="form-group">
                        <div style={{ display: "flex" }} class="btn-group" role="group" aria-label="Basic example">
                            <button style={{ marginRight: 10, flex: 1, fontSize: 19 }} onClick={() => setStep(0)} className={"btn " + (step == 0 ? "btn-secondary" : 'btn-outline-brand')}>Credit / Debit Card</button>
                            <button style={{ flex: 1, fontSize: 19 }} onClick={() => setStep(1)} className={"btn " + (step == 1 ? "btn-secondary" : 'btn-outline-brand')}>Internal Banking FPX</button>
                        </div>
                    </div>
                    <div className="form-group">
                        {renderSwitch(step)}
                        <span style={{ fontSize: 11, fontWeight: 100, color: "#71748D", paddingLeft: 5 }}><i class="fa fa-info"></i>  Yes, I agree and I have read all the <a href="/">Terms & Conditions</a></span>
                    </div>
                    <div className="form-group pt-2">
                        <button disabled={values.showLoading ? 'disabled' : ''} class="btn--primary hvr-bounce-to-left submit-btn" style={{ width: "100%" }}>
                            <span style={{ paddingRight: 10 }}>Pay RM10.0</span>
                            <Spinner radius={30} color={"#FFF"} stroke={3} visible={true} />
                        </button>
                    </div>
                </form>
            </div>
            <footer style={{ marginBottom: 50, marginTop: 20 }}>
                <div className="col-md-12 text-center">
                    <img style={{ width: 400, marginLeft: -10 }} src="https://app.senangpay.my/public//images/footer-img.png" />
                    <p style={{ fontSize: 13, fontWeight: 200 }}>By proceeding, you agree to authorise mobi (Simplepay Gateway Sdn Bhd) to debit the above net charges to your credit/debit card or <br></br> online banking account.</p>
                </div>
            </footer>
        </div >
    )
}

PagePayment.propTypes = {
    match: PropTypes.object,
    history: PropTypes.object
};

const mapStateToProps = ({ banks }) => {
    return { banks }
}

export default connect(mapStateToProps, { viewAllBanking })(PagePayment);


// <form className="omga-03__form-shape-holder" action="https://umtest.mobiversa.com/PostToFPX.aspx" method="POST">
// <div class="omga-03__hero-form">
//     <div class="form-group from-group--with-label">
//         <input className="form-control form-control-lg" name="firstName" value="omar" />
//     </div>
//     <div class="form-group from-group--with-label">
//         <input className="form-control form-control-lg" name="lastName" value="ahmed" />
//     </div>
//     <div class="form-group from-group--with-label">
//         <input className="form-control form-control-lg" name="loginId" value="Mobiversa" />
//     </div>
//     <div class="form-group from-group--with-label">
//         <input className="form-control form-control-lg" name="mobiApiKey" value="b07ad9f31df158edb188a41f725899bc" />
//     </div>
//     <div class="form-group from-group--with-label">
//         <input className="form-control form-control-lg" name="email" value="omardev19@gmail.com" />
//     </div>
//     <div class="form-group from-group--with-label">
//         <input className="form-control form-control-lg" name="orderId" value="20200725150159" />
//     </div>
//     <div class="form-group from-group--with-label">
//         <input className="form-control form-control-lg" name="postalCode" value="50490" />
//     </div>
//     <div class="form-group from-group--with-label">
//         <input className="form-control form-control-lg" name="amount" value="11.30" />
//     </div>
//     <div class="form-group from-group--with-label">
//         <input className="form-control form-control-lg" name="shippingState" value="WP Kuala Lumpur" />
//     </div>
//     <div class="form-group from-group--with-label">
//         <input className="form-control form-control-lg" name="umResponseUrl" value="https://umtest.mobiversa.com/TestPage/TestFPXResponse.aspx" />
//     </div>
//     <div class="form-group from-group--with-label">
//         <input className="form-control form-control-lg" name="bankType" value="01" />
//     </div>
//     <div class="form-group from-group--with-label">
//         <input className="form-control form-control-lg" name="bank" value="TEST0021" />
//     </div>
//     <button type="submit">Submit</button>
// </div>
// </form>