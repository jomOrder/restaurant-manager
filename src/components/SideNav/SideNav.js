import React, { useState, useEffect } from 'react';


const SideNav = props => {

    const [values, setValues] = useState(props);
    const [attributes, setattributes] = useState({
        hover: false
    });

    useEffect(() => {

    });

    const onMouseEnterHandler = () => {

    }

    const onMouseLeaveHandler = () => {

    }

    return (
        <div>
            <div className="nav-left-sidebar sidebar-dark">
                <div className="menu-list">
                    <nav className="navbar navbar-expand-lg navbar-light">
                        <a className="d-xl-none d-lg-none" href="#">Dashboard</a>
                        <div className="collapse navbar-collapse" id="navbarNav">
                            <ul className="navbar-nav flex-column">
                                <li className="nav-divider">

                                </li>
                                <li className="nav-item">
                                    <a onMouseEnter={onMouseEnterHandler} onMouseLeave={onMouseLeaveHandler} className={"nav-link " + (values.dash && !attributes.hover ? 'active' : '')} href="/" aria-controls="submenu-1"><i className="fa fa-fw fa-chart-bar"></i>Dashboard <span className="badge badge-success">6</span></a>
                                </li>
                                <li className="nav-item">
                                    <a className={"nav-link " + (values.store ? 'active' : '')} href="/stores" ><i className="fa fa-fw fa-warehouse"></i>Stores</a>
                                </li>
                                <li className="nav-item">
                                    <a className={"nav-link " + (values.transaction ? 'active' : '')} href="/transactions"><i className="fas fa-piggy-bank"></i>Transaction</a>
                                </li>
                                <li className="nav-item ">
                                    <a className={"nav-link " + (values.qr ? 'active' : '')} href="/branch/qr_code_generator" ><i className="fas fa-qrcode"></i>QRCode</a>
                                </li>
                                <li className="nav-divider">
                                    Features
                                </li>
                                <li className="nav-item ">
                                    <a className={"nav-link " + (values.profile ? 'active' : '')} href="/account" ><i className="fas fa-user-circle"></i>Profile</a>
                                </li>
                               
                                <div class="section-block">
                                    <button style={{ backgroundColor: "#84142d", borderColor: "#84142d", position: "relative", top: "320px" }} className="btn btn-primary btn-block"><i className="fas fa-sign-out-alt"></i> Logout</button>
                                </div>
                            </ul>
                        </div>
                    </nav>
                </div>
            </div>
        </div>
    )
};


export default SideNav;
