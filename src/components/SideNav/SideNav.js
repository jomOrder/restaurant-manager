import React, { useState, useEffect } from 'react';
import Skeleton, { SkeletonTheme } from 'react-loading-skeleton';
import { useHistory } from 'react-router-dom'

const SideNav = ({ dash, store, transaction, paymentHistory, profile, payment, help, hours, loading }) => {
    let history = useHistory();
    const [attributes, setattributes] = useState({
        hover: false
    });

    const destoryMerchantToken = () => {
        localStorage.removeItem('token');
    }
    const onMouseEnterHandler = () => {
    }
    const onMouseLeaveHandler = () => {
    }

    useEffect(() => {
    }, [loading]);

    return (
        <div>
            <div className="nav-left-sidebar sidebar-dark">
                <div className="menu-list">
                    <nav className="navbar navbar-expand-lg navbar-light">
                        <div className="collapse navbar-collapse" id="navbarNav">
                            <ul className="navbar-nav flex-column">
                                <li className="nav-divider">
                                </li>
                                <li className="nav-item">
                                    <button style={{ width: "100%" }} onMouseEnter={onMouseEnterHandler} onMouseLeave={onMouseLeaveHandler} className={"nav-link " + (dash && !attributes.hover ? 'active' : '')} aria-controls="submenu-1" onClick={() => history.push('/')}>
                                        <div style={{ float: 'left' }}>
                                            <i className="fa fa-fw fa-chart-bar"></i> Analytics                                        </div>
                                    </button>
                                </li>
                                <li className="nav-item">
                                    <button style={{ width: "100%" }} className={"nav-link " + (store ? 'active' : '')} onClick={() => history.push('/stores')}>
                                        <div style={{ float: 'left' }}>
                                            <i className="fa fa-store"></i> Stores
                                            </div>
                                    </button>
                                </li>
                                <li className="nav-item">
                                    <button style={{ width: "100%" }} className={"nav-link " + (transaction ? 'active' : '')} onClick={() => history.push('/transactions')}>
                                        <div style={{ float: 'left' }}>
                                            <i className="fas fa-piggy-bank"></i>Transactions
                                        </div>
                                    </button>
                                </li>
                                <li className="nav-divider">
                                    Features
                                </li>
                                <li className="nav-item">
                                    <button style={{ width: "100%" }} className={"nav-link " + (paymentHistory ? 'active' : '')} onClick={() => history.push('/history/view/payment')}>
                                        <div style={{ float: 'left' }}>
                                            <i className="far fa-credit-card"></i> Payments
                                        </div>
                                    </button>
                                </li>
                                <li className="nav-item">
                                    <button style={{ width: "100%" }} className={"nav-link " + (profile ? 'active' : '')} onClick={() => history.push('/account')}>
                                        <div style={{ float: 'left' }}>
                                            <i className="fas fa-user-circle"></i> Profile
                                        </div>
                                    </button>
                                </li>
                                <div className="section-block">
                                    <a href="/signin" onClick={destoryMerchantToken} style={{ backgroundColor: "#9A0000", borderColor: "#9A0000" }} className="btn btn-primary btn-block"><i className="fas fa-sign-out-alt"></i> Logout</a>
                                </div>
                            </ul>
                        </div>
                    </nav>
                </div>
            </div>
        </div >
    )
};


export default SideNav;
