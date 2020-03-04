import React, { useState, useEffect, useCallback } from 'react';
import Footer from '../../components/Footer/Footer';
import SideNav from '../../components/SideNav/SideNav';
import Header from '../../components/Header/Header';
import TopBarProgress from "react-topbar-progress-indicator";
import CreateBranch from '../../components/CreateBranch/CreateBranch';
import Modal from 'react-awesome-modal';

TopBarProgress.config({
    barColors: {
        "0": "#be1c1c",
        "0.5": "#be1c1c",
        "1.0": "#be1c1c"
    },
    shadowBlur: 1
});

const PageStore = () => {

    const [values, setValues] = useState({
        loading: true,
        isValid: false,
        visible: false,
    });

    const openModal = () => {
        setValues({ visible: true });
    }

    const closeModal = useCallback(() => {
        setValues({ visible: false })
    })

    const onSubmit = useCallback(
        (data) => {
            console.log(data)
            setValues({ isValid: 'is-valid' });
        }
    )
    useEffect(() => {
        setTimeout(() => {
            setValues(values.loading = false)
        }, 2000)
    }, []);

    return (
        <div className="dashboard-main-wrapper">
            <Header />
            {values.loading ? <TopBarProgress /> : false}
            <SideNav store={true} />
            <div class="dashboard-wrapper">
                <Modal visible={values.visible} width="400" height="300" effect="fadeInUp" onClickAway={() => closeModal()}>
                    <CreateBranch onSubmit={onSubmit} closeModal={closeModal} />
                </Modal>
                <div class="container-fluid dashboard-content">
                    <div class="row">
                        <div class="col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12">
                            <div class="page-header">
                                <h2 class="pageheader-title">Store </h2>
                                <div class="page-breadcrumb">
                                    <nav aria-label="breadcrumb">
                                        <ol class="breadcrumb">
                                            <li class="breadcrumb-item"><a href="/" class="breadcrumb-link">Dashboard</a></li>
                                            <li class="breadcrumb-item active" aria-current="page">Sotre</li>
                                        </ol>
                                    </nav>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="row">
                        <div class="col-lg-12">

                            <div className="row">
                                <div className="col-md-6">
                                    <div class="section-block">
                                        <h3 class="section-title">My Active Branches</h3>
                                    </div>
                                </div>
                                <div className="col-md-6" style={{ textAlign: "right" }}>
                                    <div class="section-block">
                                        <button className="btn btn-primary" onClick={() => openModal()}><i className="fab fa-fw fas fa-plus"></i> Create</button>
                                    </div>
                                </div>

                            </div>
                            <div class="card">
                                <div class="campaign-table table-responsive">
                                    <table class="table">
                                        <thead>
                                            <tr class="border-0">
                                                <th class="border-0">Branch</th>
                                                <th class="border-0">Campaign Name</th>
                                                <th class="border-0">Sales</th>
                                                <th class="border-0">Min / Max Views</th>
                                                <th class="border-0">Status</th>
                                                <th class="border-0">Start Date</th>
                                                <th class="border-0">Action</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            <tr>
                                                <td>
                                                    <div class="m-r-10"><img src="assets/images/dribbble.png" alt="user" width="35" /></div>
                                                </td>
                                                <td>Fashion E Commerce </td>
                                                <td>

                                                </td>
                                                <td>1,00,000 / 1,50,000</td>
                                                <td>70%</td>
                                                <td>7 Aug,2018</td>

                                                <td>
                                                    <div class="dropdown float-right">
                                                        <a href="#" class="dropdown-toggle card-drop" data-toggle="dropdown" aria-expanded="true">
                                                            <i class="mdi mdi-dots-vertical"></i>
                                                        </a>
                                                        <div class="dropdown-menu dropdown-menu-right">
                                                            <a href="" class="dropdown-item">Sales Report</a>
                                                            <a href="" class="dropdown-item">Export Report</a>
                                                            <a href="" class="dropdown-item">Profit</a>
                                                            <a href="" class="dropdown-item">Action</a>
                                                        </div>
                                                    </div>
                                                </td>
                                            </tr>
                                            <tr>
                                                <td>
                                                    <div class="m-r-10"><img src="assets/images/dribbble.png" alt="user" width="35" /></div>
                                                </td>
                                                <td>Fashion E Commerce </td>
                                                <td>

                                                </td>
                                                <td>1,00,000 / 1,50,000</td>
                                                <td>70%</td>
                                                <td>7 Aug,2018</td>
                                                <td>
                                                    <div class="dropdown float-right">
                                                        <a href="#" class="dropdown-toggle card-drop" data-toggle="dropdown" aria-expanded="true">
                                                            <i class="mdi mdi-dots-vertical"></i>
                                                        </a>
                                                        <div class="dropdown-menu dropdown-menu-right">
                                                            <a href="" class="dropdown-item">Sales Report</a>
                                                            <a href="" class="dropdown-item">Export Report</a>
                                                            <a href="" class="dropdown-item">Profit</a>
                                                            <a href="" class="dropdown-item">Action</a>
                                                        </div>
                                                    </div>
                                                </td>
                                            </tr>
                                        </tbody>
                                    </table>
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

export default PageStore