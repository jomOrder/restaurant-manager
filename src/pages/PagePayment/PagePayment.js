import React, { useEffect, useState } from "react";
import API from "../../services/API";
import TopBarProgress from "react-topbar-progress-indicator";
import Footer from '../../components/Footer/Footer';
import SideNav from '../../components/SideNav/SideNav';
import Header from '../../components/Header/Header';
import Swal from 'sweetalert2/dist/sweetalert2.js'
import 'sweetalert2/dist/sweetalert2.css'
import PropTypes from 'prop-types';
import Draggable from 'react-draggable'; // The default
import Avatar from 'react-avatar';

TopBarProgress.config({
    barColors: {
        "0": "#be1c1c",
        "1.0": "#be1c1c"
    },
    shadowBlur: 1
});


const PagePayment = props => {
    const {
        match: {
            params: { id }
        },
        history
    } = props;
    const [values, setValues] = useState({
        loading: true,
        password: null,
    })

    useEffect(() => {
        setTimeout(() => {
            setValues({ loading: false })
        }, 2000)
    }, []);

    return (
        <div className="dashboard-main-wrapper">
            <Header />
            {values.loading ? <TopBarProgress /> : false}
            <SideNav payment={true} />
            <div className="dashboard-wrapper">
                <div class="influence-profile">
                    <div class="container-fluid dashboard-content ">
                        <div class="row">
                            <div class="col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12">
                                <div class="page-header">
                                    <h3 class="mb-2">Payment </h3>
                                    <div class="page-breadcrumb">
                                        <nav aria-label="breadcrumb">
                                            <ol class="breadcrumb">
                                                <li class="breadcrumb-item"><a href="#" class="breadcrumb-link">Dashboard</a></li>
                                                <li class="breadcrumb-item active" aria-current="page">Payment</li>
                                            </ol>
                                        </nav>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="row">
                            <div class="col-xl-4 col-lg-4 col-md-4 col-sm-12 col-12">
                                <Draggable>
                                    <div>
                                        <div class="card">
                                            <div class="card-header d-flex">
                                                <h4 class="card-header-title">PJS 11/21 Sunway</h4>
                                                <div class="dropdown ml-auto">
                                                    <a class="toolbar" href="#" role="button" id="dropdownMenuLink" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false"> <i class="mdi mdi-dots-vertical"></i>  </a>
                                                    <div class="dropdown-menu dropdown-menu-right" aria-labelledby="dropdownMenuLink">
                                                        <a class="dropdown-item" href="#">Export</a>
                                                        <a class="dropdown-item" href="#">Another action</a>
                                                        <a class="dropdown-item" href="#">Something else here</a>
                                                    </div>
                                                </div>
                                            </div>
                                            <div class="card-body">
                                                <p class="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</p>
                                                <Avatar size={40} name={"33"} src={"43"} />
                                            </div>
                                        </div>
                                    </div>
                                </Draggable>
                            </div>
                        </div>
                    </div>
                </div>
                <Footer />
            </div>
        </div>
    )
}

PagePayment.propTypes = {
    match: PropTypes.object,
    history: PropTypes.object
};

export default PagePayment;
