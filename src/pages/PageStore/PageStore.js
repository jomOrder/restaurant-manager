import React, { useState, useEffect, useCallback } from 'react';
import Footer from '../../components/Footer/Footer';
import SideNav from '../../components/SideNav/SideNav';
import Header from '../../components/Header/Header';
import TopBarProgress from "react-topbar-progress-indicator";
import CreateBranch from '../../components/CreateBranch/CreateBranch';
import Modal from 'react-awesome-modal';
import PropTypes from 'prop-types';
import ReactPaginate from 'react-paginate';
import { connect } from 'react-redux';
import { getMerchantBranches, createBranch } from '../../actions/branchAction';
const data = [
    {
        branch_name: "Anwar Maju",
        location: "Sunway Payramid",
        register_no: "EDV-221-S",
        created_date: "2020-03-13 19:54:35",
        last_update_date: "2020-03-13 19:54:35"
    },
    {
        branch_name: "Anwar Maju",
        location: "Sunway Payramid",
        created_date: "2020-03-13 19:54:35",
        last_update_date: "2020-03-13 19:54:35"
    },
    {
        branch_name: "Anwar Maju",
        location: "Sunway Payramid",
        created_date: "2020-03-13 19:54:35",
        last_update_date: "2020-03-13 19:54:35"
    }
]


TopBarProgress.config({
    barColors: {
        "0": "#be1c1c",
        "0.5": "#be1c1c",
        "1.0": "#be1c1c"
    },
    shadowBlur: 1
});

const PageStore = ({ branches, getMerchantBranches }) => {
    // const {
    //     match: {
    //         params: { id }
    //     },
    //     location
    // } = props;
    const [allBranches, setBranches] = useState([]);
    const [values, setValues] = useState({
        loading: true,
        offset: null,
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
            createBranch(data)
            setValues({ isValid: 'is-valid' });
        }
    )
    const getAllBranches = () => {
        getMerchantBranches()
        console.log(branches)
        if(branches.length > 0) setBranches(branches);
    }
    const handlePageClick = data => {
        let selected = data.selected;
        console.log("selected: ",selected);
        let offset = Math.ceil(selected * 12);
        setValues({ offset });
    };
    
    useEffect(() => {
        getAllBranches();
        console.log("All Branches", allBranches)
        console.log("branches", branches)

        // console.log(props.match.params.id);
        setTimeout(() => {
            setValues({ loading: false })
        }, 2000)
    }, [allBranches, branches.length]);

    return (
        <div className="dashboard-main-wrapper">
            <Header />
            {values.loading ? <TopBarProgress /> : false}
            <SideNav store={true} />
            <div className="dashboard-wrapper">
                <Modal visible={values.visible} width="400" height="300" effect="fadeInUp" onClickAway={() => closeModal()}>
                    <CreateBranch onSubmit={onSubmit} closeModal={closeModal} />
                </Modal>
                <div className="container-fluid dashboard-content">
                    <div className="row">
                        <div className="col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12">
                            <div className="page-header">
                                <h2 className="pageheader-title">Store </h2>
                                <div className="page-breadcrumb">
                                    <nav aria-label="breadcrumb">
                                        <ol className="breadcrumb">
                                            <li className="breadcrumb-item"><a href="/" className="breadcrumb-link">Dashboard</a></li>
                                            <li className="breadcrumb-item active" aria-current="page">Sotre</li>
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
                                    <p>Anwar Maju</p>
                                </div>
                                <div className="card-body">
                                    <div className="card">
                                        <div className="campaign-table table-responsive">
                                            <table className="table">
                                                <thead>
                                                    <tr>
                                                        <th className="0">BranchID</th>
                                                        <th className="">Branch Name</th>
                                                        <th className="">Location</th>
                                                        <th className="">Date Create</th>
                                                        <th className="">Last Update</th>
                                                        <th className="">Action</th>
                                                    </tr>
                                                </thead>
                                                <tbody>
                                                    {data.map((listValue, index) => {
                                                        return (
                                                            <tr key={index}>
                                                                <td>
                                                                    {index+1}
                                                                </td>
                                                                <td><a href={`/stores/view/${index}`}>{listValue.branch_name}</a></td>
                                                                <td>{listValue.location}</td>
                                                                <td>{listValue.created_date}</td>
                                                                <td>{listValue.last_update_date}</td>
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
                                        pageCount={2}
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

export default connect(mapStateToProps, { getMerchantBranches, createBranch })(PageStore);