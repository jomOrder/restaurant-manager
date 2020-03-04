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
                                Main
                            </li>
                            <li className="nav-item">
                                <a onMouseEnter={onMouseEnterHandler} onMouseLeave={onMouseLeaveHandler} className={"nav-link " + (values.dash && !attributes.hover ? 'active' : '')} href="/" aria-controls="submenu-1"><i className="fa fa-fw fa-chart-bar"></i>Dashboard <span className="badge badge-success">6</span></a>
                            </li>
                            <li className="nav-item">
                                <a className={"nav-link " + (values.store  ? 'active' : '')} href="/store" ><i className="fa fa-fw fa-warehouse"></i>Stores</a>
                            </li>
                            <li className="nav-item">
                                <a className="nav-link" href="/customers"><i className="fas fa-fw fa-chart-pie"></i>Customer</a>
                            </li>
                            <li className="nav-item ">
                                <a className={"nav-link " + (values.qr ? 'active' : '')} href="/qr-code" ><i className="fab fa-fw fas fa-archive"></i>QRCode</a>
                            </li>
                            <li className="nav-divider">
                                Features
                            </li>
                            <li className="nav-item">
                                <a className="nav-link" href="#" data-toggle="collapse" aria-expanded="false" data-target="#submenu-6" aria-controls="submenu-6"><i className="fas fa-fw fa-file"></i> Merchant </a>
                                <div id="submenu-6" className="collapse submenu" >
                                    <ul className="nav flex-column">
                                        <li className="nav-item">
                                            <a className="nav-link" href="#">Branch</a>
                                        </li>
                                        <li className="nav-item">
                                            <a className="nav-link" href="#">Category</a>
                                        </li>
                                        <li className="nav-item">
                                            <a className="nav-link" href="pages/color-picker.html">Menu</a>
                                        </li>
                                    </ul>
                                </div>
                            </li>
                            <li className="nav-item">
                                <a className="nav-link" href="#" data-toggle="collapse" aria-expanded="false" data-target="#submenu-7" aria-controls="submenu-7"><i className="fas fa-fw fa-inbox"></i>Apps <span className="badge badge-secondary">New</span></a>
                                <div id="submenu-7" className="collapse submenu">
                                    <ul className="nav flex-column">
                                        <li className="nav-item">
                                            <a className="nav-link" href="pages/inbox.html">Inbox</a>
                                        </li>
                                        <li className="nav-item">
                                            <a className="nav-link" href="pages/email-details.html">Email Detail</a>
                                        </li>
                                        <li className="nav-item">
                                            <a className="nav-link" href="pages/email-compose.html">Email Compose</a>
                                        </li>
                                        <li className="nav-item">
                                            <a className="nav-link" href="pages/message-chat.html">Message Chat</a>
                                        </li>
                                    </ul>
                                </div>
                            </li>
                        </ul>
                    </div>
                </nav>
            </div>
        </div>
    </div>
)
};


export default SideNav;
