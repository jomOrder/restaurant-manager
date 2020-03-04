import React, { } from 'react';

const PagesSuccessMessage = () => {
    return (
        <div className="splash-container">
            <div class="col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12">
                <div class="card" style={{ marginTop: "150px" }}>
                    <div class="card-body">
                        <h3 class="card-title" style={{ color: "#40AF4B" }}>Successfully Registered</h3>
                        <p class="card-text">
                            <img className="logo-img" src="../assets/images/hugo-success.svg" alt="logo" />
                            Check your email for verification.</p>
                        <a href="/signin" class="btn btn-primary">Check My Account</a>
                    </div>
                </div>
            </div>
            <p >Copyright © 2020 Veggible Inc. All Rights Reserved.</p>

        </div>
    )
}

export default PagesSuccessMessage;