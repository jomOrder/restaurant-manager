import React, { useEffect, useState, useRef } from 'react';
import SideNav from '../../components/SideNav/SideNav';
import Footer from '../../components/Footer/Footer';
import Header from '../../components/Header/Header';
import TopBarProgress from "react-topbar-progress-indicator";

import ReactPaginate from 'react-paginate';
import Avatar from 'react-avatar';
import { components } from 'react-select';
import Select from 'react-select';
import { connect, useDispatch } from 'react-redux';
import { getMerchantBranches, viewBranchTransaction } from '../../actions';
import { useHistory } from 'react-router-dom'
import 'zent/css/index.css';
import { BlockLoading, Dialog, Button } from 'zent';
import moment from 'moment-timezone'
moment.tz.setDefault('Asia/Singapore');

const { openDialog, closeDialog } = Dialog;

TopBarProgress.config({
    barColors: {
        "0": "#be1c1c",
        "0.5": "#be1c1c",
        "1.0": "#be1c1c"
    },
    shadowBlur: 1
});

const PageTransaction = ({ getMerchantBranches, viewBranchTransaction, branches, transaction }) => {
    const exportID = 'my_dialog';
    const mounted = useRef();
    let history = useHistory();
    const [options, setOptions] = useState([]);
    const [branch, setBranch] = useState(null);

    const [values, setValues] = useState({
        loading: true,
        offset: null,
    });

    const hanldeExportTransaction = () => {
        openDialog({
            dialogId: exportID, // id is used to close the dialog
            title: 'Export Transaction for Sunway Branch',
            children: <div>Hello World</div>,
            maskClosable: false,
            footer: <Button onClick={() => closeDialog(exportID)}>Close</Button>,
            onClose() {
                console.log('outer dialog closed');
            },
        });
    };

    const historyGoBack = () => {
        history.goBack();
    };

    const getAllBranches = () => {
        let OPTIONS = [];
        branches.map((el, index) => {
            OPTIONS.push({ value: el.branchKey, label: `${el.name} - ${el.location}` })
        })
        setOptions(OPTIONS);
    }

    const handleBranchChange = (selected) => {
        setBranch(selected);
        /**
         * Call Transaction History action
         */

        viewBranchTransaction(selected.value);
    }
    const handlePageClick = data => {
        let selected = data.selected;
        let offset = Math.ceil(selected * 12);
        setValues({ offset });
    };


    useEffect(() => {
        if (!mounted.current) {
            // do componentDidMount logic
            setTimeout(() => {
                setValues({ loading: false })
            }, 400)
            getMerchantBranches(0);

            mounted.current = true;
        } else {
            if (branches.length > 0) getAllBranches();
            console.log(branches)
        }

    }, [values.loading, branches.length, transaction.length, mounted.current]);

    return (
        <div className="dashboard-main-wrapper">
            <Header />
            {values.loading ? <TopBarProgress /> : false}
            <SideNav transaction={true} />
            <div className="dashboard-wrapper">
                <div class="container-fluid dashboard-content">
                    <div class="row">
                        <div class="col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12">
                            <div class="page-header">
                                <h2 class="pageheader-title"> <i className="fas fa-piggy-bank"> </i> Transactions
                                </h2>
                                <div class="page-breadcrumb">
                                    <nav aria-label="breadcrumb">
                                        <ol class="breadcrumb">
                                            <li class="breadcrumb-item"><a href="/" class="breadcrumb-link">Dashboard</a></li>
                                            <li class="breadcrumb-item"><a href="/stores" class="breadcrumb-link">Stores</a></li>
                                            <li class="breadcrumb-item active" aria-current="page">Transaction</li>
                                        </ol>
                                    </nav>
                                    <button onClick={historyGoBack} type="button" className="btn btn-outline-dark float-left" style={{ margin: "10px 7px" }}><i className="fas fa-chevron-left"></i> Back</button>
                                    <button className="btn btn-outline-dark float-right" style={{ margin: "7px" }}><i className="fas fa-redo-alt"></i> Update</button>
                                    <button className="btn btn-outline-dark float-right" style={{ margin: "7px" }}><i className="fas fa-sliders-h"></i> Filters</button>
                                    <button className="btn btn-outline-dark float-right" style={{ margin: "7px" }}><i className="fas fa-sort-amount-up"></i> Sort By</button>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="row">
                        <div class="col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12">
                            <div class="card">
                                <div class="card-header">
                                    <div class="section-block">
                                        <button onClick={hanldeExportTransaction} className="btn btn-info float-right" style={{ marginLeft: 20 }}><i className="fas fa-clipboard-list"></i> Export Report</button>
                                        {/* <button className="btn btn-success float-right" style={{ marginRight: "5px" }}><i className="far fa-edit"></i>Download</button> */}
                                        <div className="form-group">
                                            <Select
                                                isSearchable
                                                // styles={customStyles}
                                                menuColor='e02d2d'
                                                placeholder={"Choose Your Branch"}
                                                value={branch}
                                                onChange={handleBranchChange}
                                                options={options}
                                            />
                                        </div>
                                    </div>

                                </div>
                                <div class="card-body">
                                    {!values.loading && transaction.length > 0 ? <div class="table-responsive">
                                        <table class="table table-striped table-bordered second" style={{ width: "100%", marginBottom: "15px" }}>
                                            <thead>
                                                <tr>
                                                    <th>Transaction No.</th>
                                                    <th>Transaction Method</th>
                                                    <th>Transaction Cost</th>
                                                    <th>Transaction Tax</th>
                                                    <th>Date Create</th>
                                                    <th>Last Update</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                {transaction.map((listValue, index) => {
                                                    return (
                                                        <tr key={index}>
                                                            <td>{index + 1}</td>
                                                            <td>{listValue.transactionMethod === 0 ? 'Cash' : 'Credit Card'}</td>
                                                            <td>RM{listValue.grossCost}</td>
                                                            <td>RM{listValue.totalTax}</td>
                                                            <td>{moment(listValue.createDate).format('YYYY-MM-DD HH:MM a')}</td>
                                                            <td>{listValue.updateDate || 'N/A' }</td>
                                                        </tr>
                                                    );
                                                })}
                                            </tbody>
                                        </table>
                                        <ReactPaginate
                                            previousLabel={<i class="fas fa-arrow-left"></i>}
                                            nextLabel={<i class="fas fa-arrow-right"></i>}
                                            breakLabel={'...'}
                                            breakClassName={'break-me'}
                                            pageCount={5}
                                            marginPagesDisplayed={2}
                                            pageRangeDisplayed={5}
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
                                    </div> : <div class="col-12 d-flex justify-content-center">
                                            <BlockLoading loading={values.loading} icon="circle" iconSize={64} iconText="Loading" />

                                            {!values.loading && transaction.length === 0 ? <div>
                                                <img className="logo-img" style={{ width: 180, marginTop: 10 }} src="../assets/images/no_transactions.svg" alt="no_data_found" />
                                                <p>No Transaction Avaliable</p>
                                            </div> : null}

                                        </div>}
                                </div>
                            </div>
                        </div>
                    </div>

                </div>
                <Footer />
            </div>
        </div >
    )
};


const mapStateToProps = ({ branches, transaction }) => {
    return { branches, transaction };
};

export default connect(mapStateToProps, { getMerchantBranches, viewBranchTransaction })(PageTransaction);
