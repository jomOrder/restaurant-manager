import React, { } from 'react';

const PagesSuccessMessage = (props) => {
    return (
        <div className="splash-container">
            <div class="col-12 d-flex justify-content-center">
                <div>
                    <img width="300" height="300" src="../assets/images/mailbox.svg" alt="mail_box" />
                </div>

            </div>
            <div class="col-12 d-flex justify-content-center">
                <div>
                    <h3 style={{textAlign: "center"}}>Thanks for registering with us. you can check your email account for verification purpose.</h3>
                </div>
            </div>
        </div>
    )
}

export default PagesSuccessMessage;