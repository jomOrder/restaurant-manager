import React, { useEffect, useState, useCallback, useRef } from 'react';
import { useAlert } from 'react-alert'
import ReactLoading from "react-loading";
import _ from 'lodash';


const OnlineBankingFPX = ({ }) => {
    const [click, setClick] = useState(0)
    const hanldeOnlineBanking = () => {
        setClick(1);
    }
    useEffect(() => {
    }, []);
    return (
        <div class="d-flex flex-row">
            <div class="p-4">
                <div style={{ borderWidth: 2, borderStyle: "solid", borderColor: "#DDD", borderRadius: 2 }}>
                    <img width="300" src="https://fpxdemo.mobiversa.com/BankLogo/hongleong.png" />
                </div>
            </div>
            <div class="p-4">
                <div style={{ borderWidth: 2, borderStyle: "solid", borderColor: "#DDD", borderRadius: 2 }}>
                    <img width="300" src="https://fpxdemo.mobiversa.com/BankLogo/affin.png" />
                </div>
            </div>
            <div class="p-4">
                <div style={{ borderWidth: 2, borderStyle: "solid", borderColor: "#DDD", borderRadius: 2 }}>
                    <img width="300" src="https://fpxdemo.mobiversa.com/BankLogo/ambank.png" />
                </div>
            </div>
            <div class="p-4">
                <div onClick={hanldeOnlineBanking} style={{ borderWidth: click == 0 ?  2 : 3, borderStyle: "solid", borderColor: click == 0 ? "#DDD" : "#f04037", borderRadius: 2 }}>
                    <img width="300" src="https://fpxdemo.mobiversa.com/BankLogo/maybank.png" />
                </div>
            </div>
        </div>
    )
};

export default OnlineBankingFPX;