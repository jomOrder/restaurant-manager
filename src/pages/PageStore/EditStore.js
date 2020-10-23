import React, { useState, useEffect, useCallback, createRef, useRef } from 'react';
import Footer from '../../components/Footer/Footer';
import SideNav from '../../components/SideNav/SideNav';
import Header from '../../components/Header/Header';
import TopBarProgress from "react-topbar-progress-indicator";
import CreateBranch from '../../components/CreateBranch/CreateBranch';
import Modal from 'react-awesome-modal';
import PropTypes from 'prop-types';
import ReactPaginate from 'react-paginate';
import { connect, useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom'

import Moment from 'react-moment';
import Skeleton, { SkeletonTheme } from 'react-loading-skeleton';
import Spinner from 'react-spinner-material';
import ScaleLoader from 'react-spinners/ClipLoader'
import { BlockLoading } from 'zent';
import { Link } from 'react-router-dom'
import { css } from "@emotion/core";
import moment from 'moment-timezone'
moment.tz.setDefault('Asia/Singapore');

const override = css`
  display: block;
  margin: 20px auto;
`;


TopBarProgress.config({
    barColors: {
        "0": "#be1c1c",
        "0.5": "#be1c1c",
        "1.0": "#be1c1c"
    },
    shadowBlur: 1
});



const EditStore = ({ location }) => {
    const { name, branchLocation } = location.state;
    let history = useHistory();

    const mounted = useRef();

    const [values, setValues] = useState({
        loading: true,
    });
    const dispatch = useDispatch()


    const historyGoBack = () => {
        history.goBack();
    };

    useEffect(() => {
        setTimeout(() => {
            setValues({ loading: false })
        }, 400)

        if (!mounted.current) {

            // do componentDidMount logic
            mounted.current = true;
        } else {


        }

    }, [mounted.current]);

    return (
        <div className="dashboard-main-wrapper">
            <Header />
            {values.loading ? <TopBarProgress /> : false}
            <SideNav loading={values.loading} store={true} />
            <div className="dashboard-wrapper">
                <div className="container-fluid dashboard-content">
                    <div className="row">
                        <div className="col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12">
                            <div class="page-header">
                                <h2 class="pageheader-title">{branchLocation} - {name}
                                </h2>
                                <div class="page-breadcrumb">
                                    <nav aria-label="breadcrumb">
                                        <ol class="breadcrumb">
                                            <li class="breadcrumb-item"><a href="/" class="breadcrumb-link">Dashboard</a></li>
                                            <li class="breadcrumb-item"><a href="/stores" class="breadcrumb-link">Stores</a></li>
                                            <li class="breadcrumb-item active"><a onClick={historyGoBack} class="breadcrumb-link">{branchLocation}</a></li>
                                        </ol>
                                    </nav>
                                    <button onClick={historyGoBack} type="button" className="btn btn-outline-dark float-left" style={{ margin: "10px 7px" }}><i className="fas fa-chevron-left"></i> Back</button>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-lg-12">
                            <div className="card">
                                <div className="card-header">
                                    <div className="row">
                                        <div className="col-md-6">
                                            <div className="section-block">
                                                <h4 className="section-title">My Active Branch</h4>
                                            </div>
                                        </div>
                                        <div className="col-md-6" style={{ textAlign: "right" }}>
                                        </div>
                                    </div>
                                </div>
                                <div className="card-body">

                                </div>
                            </div>
                        </div>
                    </div>

                </div>
                <Footer />
            </div>
        </div>
    );
};
EditStore.propTypes = {
    match: PropTypes.object,
    location: PropTypes.object
};

const mapStateToProps = ({ }) => {
    return {};
};

export default connect(mapStateToProps, null)(EditStore);