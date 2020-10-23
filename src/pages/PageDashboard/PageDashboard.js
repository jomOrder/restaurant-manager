import React, { useEffect, useState, useRef } from 'react';
import SideNav from '../../components/SideNav/SideNav';
import Header from "../../components/Header/Header";
import Footer from "../../components/Footer/Footer";
import {
    BarChart, Bar, Cell, XAxis, YAxis, CartesianGrid, Tooltip, Legend,
} from 'recharts';
import { connect } from 'react-redux';
import { viewMerchantData } from '../../actions';

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


const data = [
    {
        name: 'Sales', uv: 4000, pv: 286, amt: 2400,
    },
    {
        name: 'Menus', uv: 3000, pv: 1398, amt: 2210,
    },
    {
        name: 'Total Orders', uv: 2000, pv: 9800, amt: 2290,
    },
];

TopBarProgress.config({
    barColors: {
        "0": "#be1c1c",
        "0.5": "#be1c1c",
        "1.0": "#be1c1c"
    },
    shadowBlur: 1
});

const PageDashboard = ({ analytics, viewMerchantData }) => {
    const alert = useAlert();
    const mounted = useRef();

    const [dataSource, setData] = useState([]);
    const [values, setValues] = useState({
        loading: true,
    });

    const notify = () => {
        toast(<div><Avatar round size={30} name={"33"} src={"43"} style={{ margin: "10px" }} /><span>Hi, Omar. We Would like to help you 😀 as you like.</span></div>, {
            position: toast.POSITION.BOTTOM_RIGHT,
            toastId: 13
        });
    }

    useEffect(() => {

        if (!mounted.current) {
            // do componentDidMount logic
            viewMerchantData();

            setTimeout(() => {
                setValues({ loading: false })
            }, 400)

            mounted.current = true;
        } else {
        }


    }, [analytics]);

    return (
        <div className="dashboard-main-wrapper">
            {values.loading ? <TopBarProgress /> : false}
            <SideNav loading={values.loading} dash={true} />
            <div className="dashboard-wrapper">
                <Header />
                <div className="dashboard-ecommerce">
                    <div className="container-fluid dashboard-content ">
                        <div className="row">
                            <div className="col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12">
                                <div className="page-header">
                                    <h2 className="pageheader-title"> <i className="fa fa-fw fa-chart-bar"></i> Dashboard</h2>
                                    <p className="pageheader-text">Nulla euismod urna eros, sit amet scelerisque torton lectus vel mauris facilisis faucibus at enim quis massa lobortis rutrum.</p>
                                    <div className="page-breadcrumb">
                                        <nav aria-label="breadcrumb">
                                            <ol className="breadcrumb">
                                                <li className="breadcrumb-item"><a href="#" className="breadcrumb-link">Retail Dashboard</a></li>
                                                <li className="breadcrumb-item active" aria-current="page">Main</li>
                                            </ol>
                                        </nav>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="ecommerce-widget">
                            <div className="row">
                                <div className="col-xl-3 col-lg-3 col-md-6 col-sm-12 col-12">
                                    <div className="card border-3 border-top border-top-primary">
                                        <div className="card-body">
                                            <h5 className="text-muted">{values.loading ? <Skeleton count={1} /> : 'Sales'}</h5>
                                            <SkeletonTheme color="#efeff6" highlightColor="#fff">
                                                {
                                                    values.loading ? <Skeleton count={2} /> : <div>
                                                        <div className="metric-value d-inline-block">
                                                            <h1 className="mb-1">RM {analytics.amount}</h1>
                                                        </div>
                                                        <div className="metric-label d-inline-block float-right text-success font-weight-bold">
                                                            <span className="icon-circle-small icon-box-xs text-success bg-success-light"><i className="fa fa-fw fa-arrow-up"></i></span>
                                                        </div>
                                                    </div>
                                                }

                                            </SkeletonTheme>
                                        </div>
                                    </div>
                                </div>
                                <div className="col-xl-3 col-lg-3 col-md-6 col-sm-12 col-12">
                                    <div className="card border-3 border-top border-top-primary">
                                        <div className="card-body">
                                            <h5 className="text-muted">{values.loading ? <Skeleton count={1} /> : 'New Customers'}</h5>
                                            <SkeletonTheme color="#efeff6" highlightColor="#fff">
                                                {
                                                    values.loading ? <Skeleton count={2} /> : <div>
                                                        <div className="metric-value d-inline-block">
                                                            <h1 className="mb-1">{analytics.orders_received}</h1>
                                                        </div>
                                                        <div className="metric-label d-inline-block float-right text-success font-weight-bold">
                                                            <span className="icon-circle-small icon-box-xs text-success bg-success-light"><i className="fa fa-fw fa-arrow-up"></i></span>
                                                        </div>
                                                    </div>
                                                }
                                            </SkeletonTheme>
                                        </div>
                                    </div>
                                </div>
                                <div className="col-xl-3 col-lg-3 col-md-6 col-sm-12 col-12">
                                    <div className="card border-3 border-top border-top-primary">
                                        <div className="card-body">
                                            <h5 className="text-muted">{values.loading ? <Skeleton count={1} /> : 'Menus'}</h5>
                                            <SkeletonTheme color="#efeff6" highlightColor="#fff">
                                                {
                                                    values.loading ? <Skeleton count={2} /> : <div>
                                                        <div className="metric-value d-inline-block">
                                                            <h1 className="mb-1">{analytics.categories}</h1>
                                                        </div>
                                                        <div className="metric-label d-inline-block float-right text-success font-weight-bold">
                                                            <span className="icon-circle-small icon-box-xs text-success bg-success-light"><i className="fa fa-fw fa-arrow-up"></i></span>
                                                        </div>
                                                    </div>
                                                }
                                            </SkeletonTheme>
                                        </div>
                                    </div>
                                </div>
                                <div className="col-xl-3 col-lg-3 col-md-6 col-sm-12 col-12">
                                    <div className="card border-3 border-top border-top-primary">
                                        <div className="card-body">
                                            <h5 className="text-muted">{values.loading ? <Skeleton count={1} /> : 'Total Orders'}</h5>
                                            <SkeletonTheme color="#efeff6" highlightColor="#fff">
                                                {
                                                    values.loading ? <Skeleton count={2} /> : <div>
                                                        <div className="metric-value d-inline-block">
                                                            <h1 className="mb-1">{analytics.orders_received}</h1>
                                                        </div>
                                                        <div className="metric-label d-inline-block float-right text-success font-weight-bold">
                                                            <span className="icon-circle-small icon-box-xs text-danger bg-danger-light bg-danger-light "><i className="fa fa-fw fa-arrow-down"></i></span>
                                                        </div>
                                                    </div>
                                                }
                                            </SkeletonTheme>
                                        </div>
                                    </div>
                                </div>
                            </div>


                            <div className="row">
                                <div className="col-xl-8 col-lg-8 col-md-8 col-sm-8 col-8">
                                    <div className="card">
                                        <h5 className="card-header"> Total Revenue</h5>
                                        <BarChart
                                            width={800}
                                            height={500}
                                            data={data}
                                            margin={{
                                                top: 20, right: 30, left: 20, bottom: 5,
                                            }}
                                        >
                                            <CartesianGrid strokeDasharray="3 3" />
                                            <XAxis dataKey="name" />
                                            <YAxis />
                                            <Tooltip />
                                            <Legend />
                                            <Bar dataKey="pv" stackId="a" fill="#a81919" />
                                            <Bar dataKey="uv" stackId="a" fill="#82ca9d" />
                                        </BarChart>
                                        <div className="card-footer">
                                            <p className="display-7 font-weight-bold"><span className="text-primary d-inline-block">RM 0,000</span><span className="text-success float-right">+0.0%</span></p>
                                        </div>
                                    </div>
                                </div>
                                <div className="col-xl-3 col-lg-6 col-md-6 col-sm-12 col-12">
                                    <div className="card">
                                        <div className="card-body">
                                            <div className="d-inline-block">
                                                <h5 className="text-muted">Total Tax</h5>
                                                <h2 className="mb-0">RM {analytics.taxes}</h2>
                                            </div>
                                            <div className="float-right icon-circle-medium  icon-box-lg  bg-brand-light mt-1">
                                                <i className="fa fa-money-bill-alt fa-fw fa-sm text-brand"></i>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="card">
                                        <div className="card-body">
                                            <div className="d-inline-block">
                                                <h5 className="text-muted">Total Earned</h5>
                                                <h2 className="mb-0"> RM {analytics.net_balance}</h2>
                                            </div>
                                            <div className="float-right icon-circle-medium  icon-box-lg  bg-brand-light mt-1">
                                                <i className="fa fa-money-bill-alt fa-fw fa-sm text-brand"></i>
                                            </div>
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

const mapStateToProps = ({ analytics }) => {
    return { analytics };
};

export default connect(mapStateToProps, { viewMerchantData })(PageDashboard);
