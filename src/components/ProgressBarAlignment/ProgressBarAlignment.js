import React, { useEffect, useState } from 'react';
import { ProgressBar, Step } from "react-step-progress-bar";



const ProgressBarAlignment = props => {
    return (
        <ProgressBar filledBackground="linear-gradient(to right, #E02D2D, #D41F1F)"
            percent={props.loading}>
            <Step>
                {({ accomplished, index }) => (
                    <div
                    style={{backgroundColor: "#E02D2D"}}
                        className={`indexedStep ${accomplished ? "accomplished" : null}`}
                    >
                        {index + 1}
                    </div>
                )}
            </Step>
            <Step>
                {({ accomplished, index }) => (
                    <div
                    
                        className={`indexedStep ${accomplished ? "accomplished" : null}`}
                    >
                        {index + 1}
                    </div>
                )}
            </Step>
            <Step>
                {({ accomplished, index }) => (
                    <div
                        className={`indexedStep ${accomplished ? "accomplished" : null}`}
                    >
                        {index + 1}
                    </div>
                )}
            </Step>
        </ProgressBar>
    )
};

export default ProgressBarAlignment;