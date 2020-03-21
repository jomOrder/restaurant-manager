import React, { useState, useEffect, useCallback } from 'react';
import Footer from '../../components/Footer/Footer';
import SideNav from '../../components/SideNav/SideNav';
import Header from '../../components/Header/Header';
import TopBarProgress from "react-topbar-progress-indicator";
import CreateBranch from '../../components/CreateBranch/CreateBranch';
import Modal from 'react-awesome-modal';
import PropTypes from 'prop-types';
import ReactPaginate from 'react-paginate';


const data = [
    {
        branch: "assets/images/dribbble.png",
        branch_name: "Anwar Maju",
        location: "Sunway Payramid",
        register_no: "EDV-221-S",
        created_date: "2020-03-13 19:54:35",
        last_update_date: "2020-03-13 19:54:35"
    },
    {
        branch: "assets/images/dribbble.png",
        branch_name: "Anwar Maju",
        location: "Sunway Payramid",
        register_no: "EDV-221-S",
        created_date: "2020-03-13 19:54:35",
        last_update_date: "2020-03-13 19:54:35"
    },
    {
        branch: "assets/images/dribbble.png",
        branch_name: "Anwar Maju",
        location: "Sunway Payramid",
        register_no: "EDV-221-S",
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

const PageStore = props => {
    const {
        match: {
            params: { id }
        },
        location
    } = props;
    // const [queryVariety, setQueryVariety] = useState(qs.parse(location.search, { ignoreQueryPrefix: true }).variety);
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
            setValues({ isValid: 'is-valid' });
        }
    )
    const handlePageClick = data => {
        let selected = data.selected;
        console.log("selected: ",selected);
        let offset = Math.ceil(selected * 12);
        setValues({ offset });
    };
    
    useEffect(() => {
        console.log(props.match.params.id);
        setTimeout(() => {
            setValues({ loading: false })
        }, 2000)
    }, []);

    return (
        <div className="dashboard-main-wrapper">
            <Header />
            {values.loading ? <TopBarProgress /> : false}
            <SideNav store={true} />
            <div class="dashboard-wrapper">
                <Modal visible={values.visible} width="400" height="500" effect="fadeInUp" onClickAway={() => closeModal()}>
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
                            <div class="card">
                                <div class="card-header">
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
                                    <p>Anwar Maju</p>
                                </div>
                                <div class="card-body">
                                    <div class="card">
                                        <div class="campaign-table table-responsive">
                                            <table class="table">
                                                <thead>
                                                    <tr class="border-0">
                                                        <th class="border-0">Branch</th>
                                                        <th class="border-0">Branch Name</th>
                                                        <th class="border-0">Location</th>
                                                        <th class="border-0">Register No.</th>
                                                        <th class="border-0">Date Create</th>
                                                        <th class="border-0">Last Update</th>
                                                        <th class="border-0">Action</th>
                                                    </tr>
                                                </thead>
                                                <tbody>
                                                    {data.map((listValue, index) => {
                                                        return (
                                                            <tr key={index}>
                                                                <td>
                                                                    <div class="m-r-10"><img src={listValue.branch} alt="user" width="35" /></div>
                                                                </td>
                                                                <td><a href={`/stores/view/${index}`}>{listValue.branch_name}</a></td>
                                                                <td>{listValue.location}</td>
                                                                <td>{listValue.register_no}</td>
                                                                <td>{listValue.created_date}</td>
                                                                <td>{listValue.last_update_date}</td>
                                                                <td>
                                                                    <div class="dropdown float-right">
                                                                        <a href="#" class="dropdown-toggle card-drop" data-toggle="dropdown" aria-expanded="true">
                                                                            <i class="mdi mdi-dots-vertical"></i>
                                                                        </a>
                                                                        <div class="dropdown-menu dropdown-menu-right">
                                                                            <span onClick={() => console.log("Hi")} class="dropdown-item">Sales Report</span>
                                                                            <span href="" class="dropdown-item">Export Report</span>
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
                                        previousLabel={<i class="fas fa-arrow-left"></i>}
                                        nextLabel={<i class="fas fa-arrow-right"></i>}
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
    )

};
PageStore.propTypes = {
    match: PropTypes.object,
    location: PropTypes.object
};

export default PageStore