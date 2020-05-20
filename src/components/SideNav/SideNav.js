import React, { useState, useEffect } from 'react';
import Skeleton, { SkeletonTheme } from 'react-loading-skeleton';

const SideNav = ({ dash, store, transaction, qr, profile, payment, loading }) => {

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
                                <SkeletonTheme color="#b40000" highlightColor="#cd0000">
                                    <li className="nav-item">
                                        <a onMouseEnter={onMouseEnterHandler} onMouseLeave={onMouseLeaveHandler} className={"nav-link " + (dash && !attributes.hover ? 'active' : '')} href="/" aria-controls="submenu-1">
                                            {loading ?
                                                <div>
                                                    <span style={{ marginRight: 10 }}>
                                                        <Skeleton width={20} height={15} count={1} />
                                                    </span>
                                                    <Skeleton width={170} height={15} count={1} />
                                                </div>

                                                : <div> <i className="fa fa-fw fa-chart-bar"></i> Analytics</div>
                                            }

                                        </a>

                                    </li>
                                </SkeletonTheme>

                                <SkeletonTheme color="#9A0000" highlightColor="#cd0000">
                                    <li className="nav-item">
                                        <a className={"nav-link " + (store ? 'active' : '')} href="/stores" >
                                            {loading ?
                                                <div>
                                                    <span style={{ marginRight: 10 }}>
                                                        <Skeleton width={20} height={15} count={1} />

                                                    </span>
                                                    <Skeleton width={170} height={15} count={1} />
                                                </div>
                                                : <div> <i className="fa fa-fw fa-warehouse"></i>Stores</div>
                                            }
                                        </a>
                                    </li>
                                </SkeletonTheme>

                                <SkeletonTheme color="#9A0000" highlightColor="#cd0000">

                                    <li className="nav-item">
                                        <a className={"nav-link " + (transaction ? 'active' : '')} href="#">
                                            {loading ?
                                                <div>
                                                    <span style={{ marginRight: 10 }}>
                                                        <Skeleton width={20} height={15} count={1} />

                                                    </span>
                                                    <Skeleton width={170} height={15} count={1} />
                                                </div>
                                                : <div>  <i className="fas fa-piggy-bank"></i>Transactions</div>
                                            }
                                        </a>
                                    </li>
                                </SkeletonTheme>

                                <SkeletonTheme color="#9A0000" highlightColor="#cd0000">

                                    <li className="nav-item">
                                        <a className={"nav-link " + (qr ? 'active' : '')} href="/branch/qr_code_generator" >
                                            {loading ?
                                                <div>
                                                    <span style={{ marginRight: 10 }}>
                                                        <Skeleton width={20} height={15} count={1} />

                                                    </span>
                                                    <Skeleton width={170} height={15} count={1} />
                                                </div>
                                                : <div>  <i className="fas fa-qrcode"></i>QRCode</div>
                                            }
                                        </a>
                                    </li>
                                </SkeletonTheme>

                                <li className="nav-divider">
                                    Features
                                </li>

                                <SkeletonTheme color="#9A0000" highlightColor="#cd0000">
                                    <li className="nav-item">
                                        <a className={"nav-link " + (profile ? 'active' : '')} href="#" >
                                            {loading ?
                                                <div>
                                                    <span style={{ marginRight: 10 }}>
                                                        <Skeleton width={20} height={15} count={1} />

                                                    </span>
                                                    <Skeleton width={170} height={15} count={1} />
                                                </div>
                                                : <div>   <i class="fas fa-hourglass-half"></i>Holiday Hours</div>
                                            }
                                        </a>
                                    </li>
                                </SkeletonTheme>

                                <SkeletonTheme color="#9A0000" highlightColor="#cd0000">
                                    <li className="nav-item">
                                        <a className={"nav-link " + (payment ? 'active' : '')} href="#" >
                                            {loading ?
                                                <div>
                                                    <span style={{ marginRight: 10 }}>
                                                        <Skeleton width={20} height={15} count={1} />

                                                    </span>
                                                    <Skeleton width={170} height={15} count={1} />
                                                </div>
                                                : <div> <i className="far fa-credit-card"></i>Payments</div>
                                            }
                                        </a>
                                    </li>
                                </SkeletonTheme>


                                <SkeletonTheme color="#9A0000" highlightColor="#cd0000">
                                    <li className="nav-item">
                                        <a className={"nav-link " + (profile ? 'active' : '')} href="#" >
                                            {loading ?
                                                <div>
                                                    <span style={{ marginRight: 10 }}>
                                                        <Skeleton width={20} height={15} count={1} />

                                                    </span>
                                                    <Skeleton width={170} height={15} count={1} />
                                                </div>
                                                : <div>    <i className="fas fa-user-circle"></i>Profile</div>
                                            }
                                        </a>
                                    </li>
                                </SkeletonTheme>


                                <SkeletonTheme color="#9A0000" highlightColor="#cd0000">
                                    <li className="nav-item">
                                        <a className={"nav-link " + (profile ? 'active' : '')} href="#" >
                                            {loading ?
                                                <div>
                                                    <span style={{ marginRight: 10 }}>
                                                        <Skeleton width={20} height={15} count={1} />

                                                    </span>
                                                    <Skeleton width={170} height={15} count={1} />
                                                </div>
                                                : <div> <i class="fas fa-info-circle"></i>Help</div>
                                            }
                                        </a>
                                    </li>
                                </SkeletonTheme>
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
