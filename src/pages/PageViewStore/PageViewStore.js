import React, { useEffect, useState, useCallback } from 'react';
import SideNav from '../../components/SideNav/SideNav';
import Header from '../../components/Header/Header';
import TopBarProgress from "react-topbar-progress-indicator";
import ReactPaginate from 'react-paginate';
import Modal from 'react-awesome-modal';
import CreateCategory from '../../components/CreateCategory/CreateCategory';
import Footer from '../../components/Footer/Footer';


const data = [
    {
        branch: "assets/images/dribbble.png",
        category_name: "Western Food",
        created_date: "2020-03-13 19:54:35",
        last_update_date: "2020-03-13 19:54:35"
    },
    {
        branch: "assets/images/dribbble.png",
        category_name: "Nasi Kander",
        created_date: "2020-03-24 12:53:35",
        last_update_date: "2020-03-24 12:54:35"
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


const PageViewStore = (props) => {
    const [values, setValues] = useState({
        loading: true,
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

    const handlePageClick = data => {
        let selected = data.selected;
        let offset = Math.ceil(selected * 12);

        // this.setState({ offset: offset }, () => {
        //   this.loadCommentsFromServer();
        // });
    };

    useEffect(() => {
        console.log(props.match.params.id);

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
                <Modal visible={values.visible} width="400" height="400" effect="fadeInUp" onClickAway={() => closeModal()}>
                    <CreateCategory onSubmit={onSubmit} closeModal={closeModal} />
                </Modal>
                <div className="container-fluid dashboard-content">
                    <div class="row">
                        <div class="col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12">
                            <div class="page-header">
                                <h2 class="pageheader-title">Anwar Maju - Sunway Payramid
                                </h2>
                                <div class="page-breadcrumb">
                                    <nav aria-label="breadcrumb">
                                        <ol class="breadcrumb">
                                            <li class="breadcrumb-item"><a href="/" class="breadcrumb-link">Dashboard</a></li>
                                            <li class="breadcrumb-item"><a href="/stores" class="breadcrumb-link">Stores</a></li>
                                            <li class="breadcrumb-item active" aria-current="page">View Branch - EJFHHFE3-DF</li>
                                        </ol>
                                    </nav>
                                    <a href="/stores" type="button" className="btn btn-outline-dark float-left" style={{ margin: "10px 7px" }}><i className="fas fa-chevron-left"></i> Back</a>
                                    <button className="btn btn-outline-dark float-right" style={{ margin: "7px" }}><i className="fas fa-redo-alt"></i> Update</button>
                                    <button className="btn btn-outline-dark float-right" style={{ margin: "7px" }}><i className="fas fa-sliders-h"></i> Filters</button>
                                    <button className="btn btn-outline-dark float-right" style={{ margin: "7px" }}><i className="fas fa-sort-amount-up"></i> Sort By</button>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-lg-12">
                            <div className="card">
                                <div class="card-header">
                                    <h5 class="mb-0">
                                        <div class="section-block">
                                            {/* <button className="btn btn-primary"><i className="fab fa-fw fas fa-plus"></i> Add New</button> */}
                                            <button className="btn btn-info float-right" onClick={openModal}><i className="fas fa-clipboard-list"> </i> Create Menu</button>
                                            <button className="btn btn-success float-right" style={{ marginRight: "5px" }}><i className="far fa-edit"></i> Edit Menu</button>
                                        </div>
                                    </h5>
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
                                                    </tr>
                                                </thead>
                                                <tbody>
                                                    {data.map((listValue, index) => {
                                                        return (
                                                            <tr key={index}>
                                                                <td>
                                                                    {index + 1}
                                                                </td>
                                                                <td>
                                                                    <div class="m-r-10"><img src={listValue.branch} alt="user" width="35" /></div>
                                                                </td>
                                                                <td><a href={`/stores/view/${listValue.category_name}`}>{listValue.category_name}</a></td>
                                                                <td>{listValue.created_date}</td>
                                                                <td>{listValue.last_update_date || 'NAN'}</td>
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
    )
}

export default PageViewStore;
