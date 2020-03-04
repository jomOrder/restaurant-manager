import React, { useState, useEffect } from 'react';

const SuccessModal = () => {
    const [values, setValues] = useState({

    });

    useEffect(() => {

    }, []);
    return (

        <div className="splash-container">
            <div class="col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12">
                <div class="card" style={{ marginTop: "150px" }}>
                    <div class="card-body">
                        <h3 class="card-title" style={{ color: "#40AF4B" }}>Successfully Sent</h3>
                        <p class="card-text">
                            <img className="logo-img" src="../assets/images/fogg-message-sent.svg" alt="logo" />
                            Check your email for verification.</p>
                        <a href="/signin" class="btn btn-primary">Check My Account</a>
                    </div>
                </div>
            </div>
        </div>
    )
};

export default SuccessModal;