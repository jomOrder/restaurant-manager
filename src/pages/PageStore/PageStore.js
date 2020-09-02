import React, { useState, useEffect, useCallback, useRef } from 'react';
import Footer from '../../components/Footer/Footer';
import SideNav from '../../components/SideNav/SideNav';
import Header from '../../components/Header/Header';
import TopBarProgress from "react-topbar-progress-indicator";
import CreateBranch from '../../components/CreateBranch/CreateBranch';
import Modal from 'react-awesome-modal';
import PropTypes from 'prop-types';
import ReactPaginate from 'react-paginate';
import { connect, useDispatch } from 'react-redux';
import { getMerchantBranches, createNewBranch } from '../../actions';
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

const PageStore = ({ branches, getMerchantBranches, createNewBranch }) => {

    const [allBranches, setBranches] = useState([]);
    const [modalVisible, setVisible] = useState(false);
    const [selected, setSelected] = useState(0);
    const [values, setValues] = useState({
        loading: true,
        offset: null,
        message: null,
    });
    const childRef = useRef();
    const dispatch = useDispatch()

    const openModal = () => {
        setVisible(true)

    }

    const closeCreateModal = useCallback(() => {
        setVisible(false)
        childRef.current.closeSuccessMessage()
    })

    const showMessage = (message) => {
        setTimeout(() => {
            childRef.current.handleSuccessMessage(message);
        }, 600);
    }

    const onSubmit = useCallback(
        (data) => {
            createNewBranch(data)
            childRef.current.hanldeValidInput()
        }
    )

    const getAllBranches = (selected) => {
        getMerchantBranches(selected)
        if (branches.length > 0) setBranches(branches);
    }
    const handlePageClick = data => {
        let selected = data.selected;
        getMerchantBranches(selected)
        setSelected(selected)


        // let offset = Math.ceil(selected * 12);
        // setValues({ offset });
    };

    useEffect(() => {
        getAllBranches(selected);
        if (branches.err === 0) showMessage(branches.message)
        setTimeout(() => {
            setValues({ loading: false })
        }, 400)
    }, [allBranches.length, branches.length]);

    return (
        <div className="dashboard-main-wrapper">
            <Header />
            {values.loading ? <TopBarProgress /> : false}
            <SideNav loading={values.loading} store={true} />
            <div className="dashboard-wrapper">
                <Modal visible={modalVisible} width="400" height="270" effect="fadeInUp" onClickAway={() => closeCreateModal()}>
                    <CreateBranch ref={childRef} onSubmit={onSubmit} closeCreateModal={closeCreateModal} />
                </Modal>
                <div className="container-fluid dashboard-content">
                    <div className="row">
                        <div className="col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12">
                            <div className="page-header">
                                <h2 className="pageheader-title"><i class="fa fa-store"></i> Stores</h2>
                                <div className="page-breadcrumb">
                                    <nav aria-label="breadcrumb">
                                        <ol className="breadcrumb">
                                            <li className="breadcrumb-item"><Link to={"/"} className="breadcrumb-link">Dashboard</Link></li>
                                            <li className="breadcrumb-item active" aria-current="page"> Sotres</li>
                                        </ol>
                                    </nav>
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
                                                <h4 className="section-title">My Active Branches</h4>
                                            </div>
                                        </div>
                                        <div className="col-md-6" style={{ textAlign: "right" }}>
                                            <div className="section-block">
                                                <button disabled={values.loading || branches.length === 1} className="btn btn-primary" onClick={() => openModal()}><i className="fab fa-fw fas fa-plus"></i> New Branch</button>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="card-body">
                                    {!values.loading && branches.length > 0 ?
                                        <div className="campaign-table table-responsive">
                                            <table className="table">
                                                <thead>
                                                    <tr>
                                                        <th className="">No.</th>
                                                        <th className="">Branch Name</th>
                                                        <th className="">Current Balance</th>
                                                        <th className="">Location</th>
                                                        <th className="">Branch Status</th>
                                                        <th className="">Date Create</th>
                                                        <th className="">Last Update</th>
                                                        <th className="">Action</th>
                                                    </tr>
                                                </thead>
                                                <tbody>
                                                    {allBranches.map((listValue, index) => {
                                                        return (
                                                            <tr key={index}>
                                                                <td>
                                                                    <SkeletonTheme color="#efeff6" highlightColor="#fff">
                                                                        {
                                                                            values.loading ? <Skeleton width={10} height={10} count={1} /> : index + 1
                                                                        }
                                                                    </SkeletonTheme>
                                                                </td>
                                                                <td>
                                                                    <SkeletonTheme color="#efeff6" highlightColor="#fff">
                                                                        {
                                                                            values.loading ? <Skeleton width={150} height={10} count={1} /> : <Link class="redirect-item" to={`/stores/view/${listValue.branch_key}`}>{listValue.name}</Link>
                                                                        }
                                                                    </SkeletonTheme>
                                                                </td>
                                                                <td>
                                                                    <SkeletonTheme color="#efeff6" highlightColor="#fff">
                                                                        RM {
                                                                            values.loading ? <Skeleton width={100} height={10} count={1} /> : listValue.amount
                                                                        }
                                                                    </SkeletonTheme>
                                                                </td>

                                                                <td>
                                                                    <SkeletonTheme color="#efeff6" highlightColor="#fff">
                                                                        {
                                                                            values.loading ? <Skeleton width={150} height={10} count={1} /> : listValue.location

                                                                        }
                                                                    </SkeletonTheme>
                                                                </td>
                                                                <td>
                                                                    <SkeletonTheme color="#efeff6" highlightColor="#fff">
                                                                        {
                                                                            values.loading ? <Skeleton width={100} height={10} count={1} /> : listValue.status === 1 ? <span class="badge badge-success">Open</span>
                                                                                : <span class="badge badge-danger">Closed</span>


                                                                        }
                                                                    </SkeletonTheme>
                                                                </td>
                                                                <td>
                                                                    <SkeletonTheme color="#efeff6" highlightColor="#fff">
                                                                        {
                                                                            values.loading ? <Skeleton width={150} height={10} count={1} /> : moment(new Date(listValue.createDate)).tz('Asia/Singapore').format('YYYY-MM-DD HH:mm a') //<Moment format="YYYY-MM-DD HH:mm a">

                                                                            //</Moment>
                                                                        }
                                                                    </SkeletonTheme>
                                                                </td>
                                                                <td>
                                                                    <SkeletonTheme color="#efeff6" highlightColor="#fff">
                                                                        {
                                                                            values.loading ? <Skeleton width={150} height={10} count={1} /> : listValue.updateDate || 'NAN'
                                                                        }
                                                                    </SkeletonTheme>
                                                                </td>
                                                                <td>
                                                                    <div className="dropdown float-right">
                                                                        <a href="#" className="dropdown-toggle card-drop" data-toggle="dropdown" aria-expanded="true">
                                                                            <i className="mdi mdi-dots-vertical"></i>
                                                                        </a>
                                                                        <div className="dropdown-menu dropdown-menu-right">
                                                                            <span onClick={() => {}} className="dropdown-item"><i color="#000" className="far fa-edit"></i> Modify Branch</span>
                                                                            <span href="" className="dropdown-item"><i color="#000" class="far fa-file-alt"></i> Sales Report</span>
                                                                        </div>
                                                                    </div>
                                                                </td>
                                                            </tr>
                                                        );
                                                    })}
                                                </tbody>
                                            </table>

                                        </div> : <div class="col-12 d-flex justify-content-center">
                                            {/* <Spinner radius={30} color={"#000"} stroke={3} visible={true} /> */}
                                            {/* <ScaleLoader
                                                css={override}
                                                size={35}
                                                color={"#e02d2d"}
                                                loading={values.loading}
                                            /> */}
                                            <BlockLoading loading={values.loading} icon="circle" iconSize={64} iconText="Loading" />

                                            {!values.loading && allBranches.length === 0 ? <div>
                                                <img className="logo-img" style={{ width: 180, marginTop: 10 }} src="../assets/images/no_data_found.svg" alt="no_data_found" />
                                                <p>No store avaliable</p>
                                            </div> : null}

                                        </div>
                                    }
                                    {branches.length > 0 ? <ReactPaginate
                                        previousLabel={<i className="fas fa-arrow-left"></i>}
                                        nextLabel={<i className="fas fa-arrow-right"></i>}
                                        breakLabel={'...'}
                                        breakClassName={'break-me'}
                                        pageCount={branches.length / 12}
                                        marginPagesDisplayed={2}
                                        pageRangeDisplayed={2}
                                        onPageChange={handlePageClick}
                                        containerClassName={'pagination'}
                                        subContainerClassName={'pages pagination'}
                                        activeClassName={'active'}
                                        breakClassName={'page-item'}
                                        breakLinkClassName={'page-link'}
                                        containerClassName={'pagination'}
                                        pageClassName={'page-item'}
                                        pageLinkClassName={'page-link'}
                                        previousClassName={'page-item'}
                                        previousLinkClassName={'page-link'}
                                        nextClassName={'page-item'}
                                        nextLinkClassName={'page-link'}
                                        activeClassName={'active'}
                                    /> : null}
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
PageStore.propTypes = {
    match: PropTypes.object,
    location: PropTypes.object
};

const mapStateToProps = ({ branches }) => {
    return { branches };
};

export default connect(mapStateToProps, { getMerchantBranches, createNewBranch })(PageStore);