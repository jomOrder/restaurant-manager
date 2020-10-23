import React, { useState, useEffect, useRef } from 'react';
import Avatar from 'react-avatar';
import { Radar } from 'react-chartjs-2';
import { connect } from 'react-redux';
import { viewSingleMerchant } from '../../actions';
import store from 'storejs';

const Header = ({ }) => {
    const mounted = useRef();

    const [fullName, setFullName] = useState(null);
    const [image, setImage] = useState(null);
    const [firstName, setFirstName] = useState(null);
    const [lastName, setLastName] = useState(null);

    // const viewMerchantFullName = async () => {
    //     const { first_name, last_name, image } = merchants.merchant;
    //     const name = first_name + " " + last_name;
    //     setFullName(name);
    //     setImage(image.url);
    // }

    const destoryMerchantToken = () => {
        localStorage.removeItem('token');
        store.remove('profile')
    }

    useEffect(() => {
        if (!mounted.current) {
            const result = store.get('profile')
            setFirstName(result.first_name);
            setLastName(result.last_name);
            setImage(result.image.url)

            // do componentDidMount logic
            // viewSingleMerchant();
            // mounted.current = true;
        } else {
            // if (merchants.length === 0) viewSingleMerchant()
            // viewMerchantFullName()
            // do componentDidUpdate logic
        }
    }, [mounted.current]);
    return (
        <div>
            <div className="dashboard-header">
                <nav className="navbar navbar-expand-lg bg-white fixed-top">
                    <a className="navbar-brand" href="https://www.jomorder.com.my" target="_blank"><img className="logo-img" style={{ width: 180, marginTop: 10 }} src="../assets/images/JomOrder-logo.png" alt="logo" /></a>
                    <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="collapse navbar-collapse " id="navbarSupportedContent">
                        <ul className="navbar-nav ml-auto navbar-right-top">
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
                                    <img style={{ borderRadius: 50 }} width="40" name={image} src={image} /></a>
                                <div className="dropdown-menu dropdown-menu-right nav-user-dropdown" aria-labelledby="navbarDropdownMenuLink2">
                                    <div className="nav-user-info">
                                        <h5 className="mb-0 text-white nav-user-name">{firstName} {lastName}</h5>
                                        <span className="status"></span><span className="ml-2">Available</span>
                                    </div>
                                    <a className="dropdown-item" href="/account"><i className="fas fa-user mr-2"></i>Account</a>
                                    <a className="dropdown-item" href=""><i className="fas fa-cog mr-2"></i>Setting</a>
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


export default Header;