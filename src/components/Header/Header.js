import React, { useState, useEffect } from 'react';
import Avatar from 'react-avatar';
import { Radar } from 'react-chartjs-2';
import { connect } from 'react-redux';
import { viewSingleMerchant } from '../../actions/MerchantAction';

const Header = ({ merchants, viewSingleMerchant }) => {

    const [fullName, setFullName] = useState(null);
    const viewMerchantFullName = async () => {
        const { first_name, last_name } = merchants;
        const name = first_name + " " + last_name;
        setFullName(name);
    }

    const destoryMerchantToken = () => {
        localStorage.removeItem('token');
    }

    useEffect(() => {
        viewSingleMerchant()
        viewMerchantFullName()
    }, [merchants.length]);
    return (
        <div>
            <div className="dashboard-header">
                <nav className="navbar navbar-expand-lg bg-white fixed-top">
                    <a className="navbar-brand" href="/"><img className="logo-img" style={{ width: "150px" }} src="../assets/images/jom_logo.png" alt="logo" /></a>
                    <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="collapse navbar-collapse " id="navbarSupportedContent">
                        <ul className="navbar-nav ml-auto navbar-right-top">
                            <li className="nav-item dropdown notification">
                                <a className="nav-link nav-icons" href="#" id="navbarDropdownMenuLink1" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false"><i className="fas fa-fw fa-bell"></i> <span className="indicator"></span></a>
                                <ul className="dropdown-menu dropdown-menu-right notification-dropdown">
                                    <li>
                                        <div className="notification-title">Notification</div>
                                        <div className="notification-list">
                                            <div className="list-group">
                                                <a href="#" className="list-group-item list-group-item-action active">
                                                    <div className="notification-info">
                                                        <div className="notification-list-user-img"><img src="assets/images/avatar-2.jpg" alt="" className="user-avatar-md rounded-circle" /></div>
                                                        <div className="notification-list-user-block"><span className="notification-list-user-name">Jeremy Rakestraw</span>accepted your invitation to join the team.
                                                        <div className="notification-date">2 min ago</div>
                                                        </div>
                                                    </div>
                                                </a>
                                            </div>
                                        </div>
                                    </li>
                                    <li>
                                        <div className="list-footer"> <a href="#">View all notifications</a></div>
                                    </li>
                                </ul>
                            </li>
                            <li className="nav-item dropdown connection">
                                <a className="nav-link" href="#" id="navbarDropdown" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false"> <i className="fas fa-fw fa-th"></i> </a>
                                <ul className="dropdown-menu dropdown-menu-right connection-dropdown">
                                    <li className="connection-list">
                                        <div className="row">
                                            <div className="col-xl-4 col-lg-4 col-md-6 col-sm-12 col-12 ">
                                                <a href="#" className="connection-item"><img src="https://img.icons8.com/color/48/000000/check.png" /> <span>Files</span></a>
                                            </div>
                                            <div className="col-xl-4 col-lg-4 col-md-6 col-sm-12 col-12 ">
                                                <a href="#" className="connection-item"><img src="https://img.icons8.com/cute-clipart/64/000000/chat.png" /><span>Chat</span></a>
                                            </div>
                                            <div className="col-xl-4 col-lg-4 col-md-6 col-sm-12 col-12 ">
                                                <a href="#" className="connection-item"><img src="https://img.icons8.com/cute-clipart/64/000000/shop.png" /><span>Stores</span></a>
                                            </div>
                                        </div>
                                    </li>
                                </ul>
                            </li>
                            <li className="nav-item dropdown nav-user">
                                <a className="nav-link nav-user-img" href="#" id="navbarDropdownMenuLink2" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                    <Avatar round size={30} name={"33"} src={"43"} /></a>
                                <div className="dropdown-menu dropdown-menu-right nav-user-dropdown" aria-labelledby="navbarDropdownMenuLink2">
                                    <div className="nav-user-info">
                                        <h5 className="mb-0 text-white nav-user-name">{fullName}</h5>
                                        <span className="status"></span><span className="ml-2">Available</span>
                                    </div>
                                    <a className="dropdown-item" href="/account"><i className="fas fa-user mr-2"></i>Account</a>
                                    <a className="dropdown-item" href="/account"><i className="fas fa-cog mr-2"></i>Setting</a>
                                    <a onClick={destoryMerchantToken} className="dropdown-item" href="/signin"><i className="fas fa-power-off mr-2"></i>Logout</a>
                                </div>
                            </li>
                        </ul>
                    </div>
                </nav>
            </div>
        </div>
    )
};

const mapStateToProps = ({ merchants }) => {
    return { merchants }
}

export default connect(mapStateToProps, { viewSingleMerchant })(Header);