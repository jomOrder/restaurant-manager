import React, { useEffect, useState } from 'react';
import SideNav from '../../components/SideNav/SideNav';
import Header from "../../components/Header/Header";
import Footer from "../../components/Footer/Footer";
import Skeleton, { SkeletonTheme } from 'react-loading-skeleton';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Avatar from 'react-avatar';

import TopBarProgress from "react-topbar-progress-indicator";
import { useAlert } from 'react-alert'

toast.configure({
    autoClose: 3000,
    draggable: false,
    pauseOnFocusLoss: true
    //etc you get the idea
});

TopBarProgress.config({
    barColors: {
        "0": "#be1c1c",
        "0.5": "#be1c1c",
        "1.0": "#be1c1c"
    },
    shadowBlur: 1
});

const PageDashboard = props => {
    const alert = useAlert();
    const [values, setValues] = useState({
        loading: true,
        password: null
    });

    const notify = () => {
        toast(<div><Avatar round size={30} name={"33"} src={"43"} style={{ margin: "10px" }} /><span>Hi, Omar. We Would like to help you 😀 as you like.</span></div>, {
            position: toast.POSITION.BOTTOM_RIGHT,
            toastId: 13
        });
    }

    useEffect(() => {
        notify();
        setTimeout(() => {
            setValues(values.loading = false)
        }, 2000)
    }, []);

    return (
        <div className="dashboard-main-wrapper">
            <Header />
            {values.loading ? <TopBarProgress /> : false}

            <SideNav dash={true} />
            <div className="dashboard-wrapper">
                <div class="dashboard-ecommerce">
                    <div class="container-fluid dashboard-content ">
                        <div class="row">
                            <div class="col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12">
                                <div class="page-header">
                                    <h2 class="pageheader-title">Dashboard</h2>
                                    <p class="pageheader-text">Nulla euismod urna eros, sit amet scelerisque torton lectus vel mauris facilisis faucibus at enim quis massa lobortis rutrum.</p>
                                    <div class="page-breadcrumb">
                                        <nav aria-label="breadcrumb">
                                            <ol class="breadcrumb">
                                                <li class="breadcrumb-item"><a href="#" class="breadcrumb-link">Retail Dashboard</a></li>
                                                <li class="breadcrumb-item active" aria-current="page">Main</li>
                                            </ol>
                                        </nav>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class="ecommerce-widget">
                            <div class="row">
                                <div class="col-xl-3 col-lg-3 col-md-6 col-sm-12 col-12">
                                    <div class="card border-3 border-top border-top-primary">
                                        <div class="card-body">
                                            <h5 class="text-muted">{values.loading ? <Skeleton count={1} /> : 'Sales'}</h5>
                                            <SkeletonTheme color="#efeff6" highlightColor="#fff">
                                                {
                                                    values.loading ? <Skeleton count={2} /> : <div>
                                                        <div class="metric-value d-inline-block">
                                                            <h1 class="mb-1">RM1200</h1>
                                                        </div>
                                                        <div class="metric-label d-inline-block float-right text-success font-weight-bold">
                                                            <span class="icon-circle-small icon-box-xs text-success bg-success-light"><i class="fa fa-fw fa-arrow-up"></i></span><span class="ml-1">5.86%</span>
                                                        </div>
                                                    </div>
                                                }
                                            </SkeletonTheme>
                                        </div>
                                    </div>
                                </div>
                                <div class="col-xl-3 col-lg-3 col-md-6 col-sm-12 col-12">
                                    <div class="card border-3 border-top border-top-primary">
                                        <div class="card-body">
                                            <h5 class="text-muted">{values.loading ? <Skeleton count={1} /> : 'New Customers'}</h5>
                                            <SkeletonTheme color="#efeff6" highlightColor="#fff">
                                                {
                                                    values.loading ? <Skeleton count={2} /> : <div>
                                                        <div class="metric-value d-inline-block">
                                                            <h1 class="mb-1">200</h1>
                                                        </div>
                                                        <div class="metric-label d-inline-block float-right text-success font-weight-bold">
                                                            <span class="icon-circle-small icon-box-xs text-success bg-success-light"><i class="fa fa-fw fa-arrow-up"></i></span><span class="ml-1">10.0%</span>
                                                        </div>
                                                    </div>
                                                }
                                            </SkeletonTheme>
                                        </div>
                                    </div>
                                </div>
                                <div class="col-xl-3 col-lg-3 col-md-6 col-sm-12 col-12">
                                    <div class="card border-3 border-top border-top-primary">
                                        <div class="card-body">
                                            <h5 class="text-muted">{values.loading ? <Skeleton count={1} /> : 'Menus'}</h5>
                                            <SkeletonTheme color="#efeff6" highlightColor="#fff">
                                                {
                                                    values.loading ? <Skeleton count={2} /> : <div>
                                                        <div class="metric-value d-inline-block">
                                                            <h1 class="mb-1">200</h1>
                                                        </div>
                                                        <div class="metric-label d-inline-block float-right text-success font-weight-bold">
                                                            <span class="icon-circle-small icon-box-xs text-success bg-success-light"><i class="fa fa-fw fa-arrow-up"></i></span><span class="ml-1">10.0%</span>
                                                        </div>
                                                    </div>
                                                }
                                            </SkeletonTheme>
                                        </div>
                                    </div>
                                </div>
                                <div class="col-xl-3 col-lg-3 col-md-6 col-sm-12 col-12">
                                    <div class="card border-3 border-top border-top-primary">
                                        <div class="card-body">
                                            <h5 class="text-muted">{values.loading ? <Skeleton count={1} /> : 'Total Orders'}</h5>
                                            <SkeletonTheme color="#efeff6" highlightColor="#fff">
                                                {
                                                    values.loading ? <Skeleton count={2} /> : <div>
                                                        <div class="metric-value d-inline-block">
                                                            <h1 class="mb-1">1340</h1>
                                                        </div>
                                                        <div class="metric-label d-inline-block float-right text-success font-weight-bold">
                                                            <span class="icon-circle-small icon-box-xs text-danger bg-danger-light bg-danger-light "><i class="fa fa-fw fa-arrow-down"></i></span><span class="ml-1">4%</span>
                                                        </div>
                                                    </div>
                                                }
                                            </SkeletonTheme>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div class="row">
                                <div class="col-xl-3 col-lg-6 col-md-6 col-sm-12 col-12">
                                    <div class="card">
                                        <div class="card-body">
                                            <div class="d-inline-block">
                                                <h5 class="text-muted">Total Views</h5>
                                                <h2 class="mb-0"> 10,28,056</h2>
                                            </div>
                                            <div class="float-right icon-circle-medium  icon-box-lg  bg-info-light mt-1">
                                                <i class="fa fa-eye fa-fw fa-sm text-info"></i>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div class="col-xl-3 col-lg-6 col-md-6 col-sm-12 col-12">
                                    <div class="card">
                                        <div class="card-body">
                                            <div class="d-inline-block">
                                                <h5 class="text-muted">Total Followers</h5>
                                                <h2 class="mb-0"> 24,763</h2>
                                            </div>
                                            <div class="float-right icon-circle-medium  icon-box-lg  bg-primary-light mt-1">
                                                <i class="fa fa-user fa-fw fa-sm text-primary"></i>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div class="col-xl-3 col-lg-6 col-md-6 col-sm-12 col-12">
                                    <div class="card">
                                        <div class="card-body">
                                            <div class="d-inline-block">
                                                <h5 class="text-muted">Partnerships</h5>
                                                <h2 class="mb-0">14</h2>
                                            </div>
                                            <div class="float-right icon-circle-medium  icon-box-lg  bg-secondary-light mt-1">
                                                <i class="fa fa-handshake fa-fw fa-sm text-secondary"></i>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                <div class="col-xl-3 col-lg-6 col-md-6 col-sm-12 col-12">
                                    <div class="card">
                                        <div class="card-body">
                                            <div class="d-inline-block">
                                                <h5 class="text-muted">Total Earned</h5>
                                                <h2 class="mb-0"> $149.00</h2>
                                            </div>
                                            <div class="float-right icon-circle-medium  icon-box-lg  bg-brand-light mt-1">
                                                <i class="fa fa-money-bill-alt fa-fw fa-sm text-brand"></i>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div class="row">
                                <div class="col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12">
                                    <div class="card">
                                        <h5 class="card-header"> Total Revenue</h5>
                                        <div class="card-body">
                                            <div id="morris_totalrevenue"></div>
                                        </div>
                                        <div class="card-footer">
                                            <p class="display-7 font-weight-bold"><span class="text-primary d-inline-block">RM26,000</span><span class="text-success float-right">+9.45%</span></p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <Footer />
            </div>
        </div>
    )
};




export default PageDashboard;
