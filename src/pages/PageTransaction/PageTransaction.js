import React, { useEffect, useState } from 'react';
import SideNav from '../../components/SideNav/SideNav';
import Footer from '../../components/Footer/Footer';
import Header from '../../components/Header/Header';
import TopBarProgress from "react-topbar-progress-indicator";

import ReactPaginate from 'react-paginate';
import Avatar from 'react-avatar';
import { components } from 'react-select';
import Select from 'react-select';
import { useHistory } from 'react-router-dom'
import 'zent/css/index.css';
import { BlockLoading, Dialog, Button } from 'zent';
const { openDialog, closeDialog } = Dialog;

const customStyles = {
    option: (provided, state) => ({
        ...provided,
        color: state.isSelected ? 'red' : 'blue',
    }),
    control: () => ({
        // none of react-select's styles are passed to <Control />
        width: 200,
    }),
    singleValue: (provided, state) => {
        const opacity = state.isDisabled ? 0.5 : 1;
        const transition = 'opacity 300ms';

        return { ...provided, opacity, transition };
    }
}


const options = [
    { value: 'Anwar Maju - Kelana Jaya', label: 'Anwar Maju - Kelana Jaya' },
    { value: 'Anwar Maju - Suwnay Payramid', label: 'Anwar Maju - Suwnay Payramid' },
    { value: 'Anwar Maju - Chearas', label: 'Anwar Maju - Chearas' },
];


const data = [
    {
        transaction_id: "1",
        transaction_name: "Hot Dog",
        transaction_cost: "RM 10.40",
        transaction_method: "Cash",
        created_date: "2020-03-13 19:54:35",
        last_update_date: "2020-03-13 19:54:35"
    },

]
TopBarProgress.config({
    barColors: {
        "0": "#be1c1c",
        "0.5": "#be1c1c",
        "1.0": "#be1c1c"
    },
    shadowBlur: 1
});

const PageTransaction = props => {
    const exportID = 'my_dialog';
    let history = useHistory();
    const [values, setValues] = useState({
        loading: true,
        offset: null,
        branch: null,
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


    const BranchOption = props => {
        const { data } = props;
        return (
            <components.Option {...props}>
                <Avatar round size={30} name={data.label} src={data.avatar} />
                <label style={{ padding: "5px" }}>
                    {data.label}
                </label>
            </components.Option>
        );
    };

    const handleBranchChange = (selected) => {
        setValues({ branch: selected })
    }
    const handlePageClick = data => {
        let selected = data.selected;
        let offset = Math.ceil(selected * 12);
        setValues({ offset });
    };


    useEffect(() => {
        setTimeout(() => {
            setValues({ loading: false })
        }, 400)
    }, []);

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
                                        <button onClick={hanldeExportTransaction} className="btn btn-info float-right"  style={{ marginLeft: 20}}><i className="fas fa-clipboard-list"></i> Export Report</button>
                                        {/* <button className="btn btn-success float-right" style={{ marginRight: "5px" }}><i className="far fa-edit"></i>Download</button> */}
                                        <div className="form-group">
                                            <Select
                                                isSearchable
                                                // styles={customStyles}
                                                menuColor='e02d2d'
                                                placeholder={"Choose Your Branch"}
                                                value={values.branch}
                                                onChange={handleBranchChange}
                                                options={options}
                                            />
                                        </div>
                                    </div>

                                </div>
                                <div class="card-body">
                                    {/* <BlockLoading loading icon="circle" iconSize={64} iconText="Loading" /> */}
                                    <div class="col-12 d-flex justify-content-center">
                                        <div>
                                            <img className="logo-img" style={{ width: 180, marginTop: 10 }} src="../assets/images/no_transactions.svg" alt="no_data_found" />
                                            <p style={{ marginTop: "20px" }} className="text-center">No Transaction Avaliable</p>
                                        </div>
                                    </div>

                                    {/* <div class="table-responsive">
                                        <table class="table table-striped table-bordered second" style={{ width: "100%", marginBottom: "15px" }}>
                                            <thead>
                                                <tr>
                                                    <th>Transaction No.</th>
                                                    <th>Transaction Name</th>
                                                    <th>Transaction Method</th>
                                                    <th>Transaction Cost</th>
                                                    <th>Create Date</th>
                                                    <th>Update Date</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                {data.map((listValue, index) => {
                                                    return (
                                                        <tr key={index}>
                                                            <td>{listValue.transaction_id}</td>
                                                            <td>{listValue.transaction_name}</td>
                                                            <td>{listValue.transaction_method}</td>
                                                            <td>{listValue.transaction_cost}</td>
                                                            <td>{listValue.created_date}</td>
                                                            <td>{listValue.last_update_date}</td>
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
                                    </div> */}

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


export default PageTransaction;