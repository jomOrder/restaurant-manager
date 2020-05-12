import React, { useEffect, useState, useCallback } from 'react';
import SideNav from '../../components/SideNav/SideNav';
import Header from '../../components/Header/Header';
import TopBarProgress from "react-topbar-progress-indicator";
import ReactPaginate from 'react-paginate';
import Modal from 'react-awesome-modal';
import { useHistory } from 'react-router-dom'
import CreateCategoryItem from '../../components/CreateCategoryItem/CreateCategoryItem';
import { connect } from 'react-redux';


const data = [
    {
        category_name: "Western Food",
        image: {
            url: "hello"
        },
        item_name: "Hot Dog",
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


const PageViewCategoryItem = () => {
    let history = useHistory();
    const [values, setValues] = useState({
        loading: true,
        visible: false,
    });

    const historyGoBack = () => {
        history.goBack();
    };

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

    const handlePageClick = data => {
        let selected = data.selected;
        let offset = Math.ceil(selected * 12);

        // this.setState({ offset: offset }, () => {
        //   this.loadCommentsFromServer();
        // });
    };

    useEffect(() => {
        setTimeout(() => {
            setValues({ loading: false });
        }, 2000);
    }, []);

    return (
        <div className="dashboard-main-wrapper">
            <Header />
            {values.loading ? <TopBarProgress /> : false}
            <SideNav store={true} />
            <div className="dashboard-wrapper">
                <Modal visible={values.visible} width="400" height="300" effect="fadeInUp" onClickAway={() => closeModal()}>
                    <CreateCategoryItem onSubmit={onSubmit} closeModal={closeModal} />
                </Modal>
                <div className="container-fluid dashboard-content">
                    <div class="row">
                        <div class="col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12">
                            <div class="page-header">
                                <h2 class="pageheader-title">Anwar Maju - Western
                                </h2>
                                <div class="page-breadcrumb">
                                    <nav aria-label="breadcrumb">
                                        <ol class="breadcrumb">
                                            <li class="breadcrumb-item"><a href="/" class="breadcrumb-link">Dashboard</a></li>
                                            <li class="breadcrumb-item"><a href="/stores" class="breadcrumb-link">Stores</a></li>
                                            <li class="breadcrumb-item"><a href="/" class="breadcrumb-link">Category</a></li>
                                            <li class="breadcrumb-item active" aria-current="page">Item</li>
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
                                    <h5 class="mb-0">
                                        <div class="section-block">
                                            <button className="btn btn-primary"><i className="fab fa-fw fas fa-plus"></i> Add New</button>
                                            <button className="btn btn-info float-right" onClick={openModal}><i className="fas fa-clipboard-list"> </i> Create Item</button>
                                            <button className="btn btn-success float-right" style={{ marginRight: "5px" }}><i className="far fa-edit"></i> Edit Item</button>
                                        </div>
                                    </h5>
                                    {/* <p>Generating Report for Anwar Maju Branch - Sunway Pyarmid.</p> */}
                                </div>
                                <div class="card-body">
                                    <div class="table-responsive">
                                        <table class="table table-striped table-bordered second" style={{ width: "100%", marginBottom: "15px" }}>
                                            <thead>
                                                <tr>
                                                    <th>Item ID</th>
                                                    <th>Item Image</th>
                                                    <th>Item Name</th>
                                                    <th>Create Date</th>
                                                    <th>Update Date</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                {data.map((listValue, index) => {
                                                    return (
                                                        <tr key={index}>
                                                            <td>{index + 1}</td>
                                                            <td>
                                                                <div class="m-r-10"><img src={listValue.image.url} alt="user" width="35" /></div>
                                                            </td>                                                            
                                                            <td>{listValue.item_name}</td>
                                                            <td>{listValue.created_date}</td>
                                                            <td>{listValue.last_update_date}</td>
                                                        </tr>
                                                    );
                                                })}
                                            </tbody>
                                        </table>
                                    </div>
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
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}


const mapStateToProps = ({  }) => {
    return {  };
};

export default connect(mapStateToProps, null)(PageViewCategoryItem);

