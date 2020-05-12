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
        }, 3000);
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
        console.log(selected)
        setSelected(selected)


        // let offset = Math.ceil(selected * 12);
        // setValues({ offset });
    };

    useEffect(() => {
        getAllBranches(selected);
        if (branches.err === 0) showMessage(branches.message)

        setTimeout(() => {
            setValues({ loading: false })
        }, 2000)
    }, [allBranches.length, branches.length]);

    return (
        <div className="dashboard-main-wrapper">
            <Header />
            {values.loading ? <TopBarProgress /> : false}
            <SideNav store={true} />
            <div className="dashboard-wrapper">
                <Modal visible={modalVisible} width="400" height="270" effect="fadeInUp" onClickAway={() => closeCreateModal()}>
                    <CreateBranch ref={childRef} onSubmit={onSubmit} closeCreateModal={closeCreateModal} />
                </Modal>
                <div className="container-fluid dashboard-content">
                    <div className="row">
                        <div className="col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12">
                            <div className="page-header">
                                <h2 className="pageheader-title">Stores </h2>
                                <div className="page-breadcrumb">
                                    <nav aria-label="breadcrumb">
                                        <ol className="breadcrumb">
                                            <li className="breadcrumb-item"><a href="/" className="breadcrumb-link">Dashboard</a></li>
                                            <li className="breadcrumb-item active" aria-current="page">Sotres</li>
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
                                                <h3 className="section-title">My Active Branches</h3>
                                            </div>
                                        </div>
                                        <div className="col-md-6" style={{ textAlign: "right" }}>
                                            <div className="section-block">
                                                <button className="btn btn-primary" onClick={() => openModal()}><i className="fab fa-fw fas fa-plus"></i> Create</button>
                                            </div>
                                        </div>
                                    </div>
                                    {/* <p>Anwar Maju</p> */}
                                </div>
                                <div className="card-body">
                                    <div className="card">
                                        <div className="campaign-table table-responsive">
                                            <table className="table">
                                                <thead>
                                                    <tr>
                                                        <th className="">BranchID</th>
                                                        <th className="">Branch Name</th>
                                                        <th className="">Location</th>
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
                                                                    {index + 1}
                                                                </td>
                                                                <td><a href={`/stores/view/${listValue.branch_key}`}>{listValue.name}</a></td>
                                                                <td>{listValue.location}</td>
                                                                <td>
                                                                    <Moment format="YYYY-MM-DD HH:mm">
                                                                        {listValue.createDate}
                                                                    </Moment>
                                                                </td>
                                                                <td>{listValue.updateDate || 'NAN'}</td>
                                                                <td>
                                                                    <div className="dropdown float-right">
                                                                        <a href="#" className="dropdown-toggle card-drop" data-toggle="dropdown" aria-expanded="true">
                                                                            <i className="mdi mdi-dots-vertical"></i>
                                                                        </a>
                                                                        <div className="dropdown-menu dropdown-menu-right">
                                                                            <span onClick={() => console.log("Hi")} className="dropdown-item">Sales Report</span>
                                                                            <span href="" className="dropdown-item">Export Report</span>
                                                                        </div>
                                                                    </div>
                                                                </td>
                                                            </tr>
                                                        );
                                                    })}
                                                </tbody>
                                            </table>
                                        </div>
                                    </div>
                                    <ReactPaginate
                                        previousLabel={<i className="fas fa-arrow-left"></i>}
                                        nextLabel={<i className="fas fa-arrow-right"></i>}
                                        breakLabel={'...'}
                                        breakClassName={'break-me'}
                                        pageCount={33 / 12}
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
                                    />
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