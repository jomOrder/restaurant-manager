import React, { useState, useEffect } from 'react';
import { CardElement, Elements} from 'react-stripe-elements';


const StripePayment = () => {
    
    
    const handleSubmit = (ev) => {
        ev.preventDefault();
        if (props.stripe) {
          props.stripe
            .createToken()
            .then((payload) => console.log('[token]', payload));
        } else {
          console.log("Stripe.js hasn't loaded yet.");
        }
      };
    
      const handleBlur = () => {
        console.log('[blur]');
      };
      const handleChange = (change) => {
        console.log('[change]', change);
      };
      const handleClick = () => {
        console.log('[click]');
      };
      const handleFocus = () => {
        console.log('[focus]');
      };
      const handleReady = () => {
        console.log('[ready]');
      };
    
    

    
    return (
        <div class="card-body">
            <form onSubmit={handleSubmit}>
                <label>
                    Card details
                </label>
                <div className="form-group">
                    <Elements>
                        <CardElement
                            className="form-control"
                            onBlur={handleBlur}
                            onChange={handleChange}
                            onFocus={handleFocus}
                            onReady={handleReady}
                            style={{ base: { fontSize: '18px' } }} />
                    </Elements>
                </div>
                <button>Pay</button>
            </form>
        </div>
    )
}

export default StripePayment;