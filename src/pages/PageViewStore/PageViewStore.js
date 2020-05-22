import React, { useEffect, useState, useCallback, useRef } from 'react';
import { useHistory } from 'react-router-dom'
import SideNav from '../../components/SideNav/SideNav';
import Header from '../../components/Header/Header';
import TopBarProgress from "react-topbar-progress-indicator";
import ReactPaginate from 'react-paginate';
import Modal from 'react-awesome-modal';
import CreateCategory from '../../components/CreateCategory/CreateCategory';
import Footer from '../../components/Footer/Footer';
import { connect } from 'react-redux';
import Moment from 'react-moment';
import _ from 'lodash';
import Skeleton, { SkeletonTheme } from 'react-loading-skeleton';

import { createMenu, uploadBranchCategory, viewBranchCategory, viewBranch } from '../../actions'
TopBarProgress.config({
    barColors: {
        "0": "#be1c1c",
        "0.5": "#be1c1c",
        "1.0": "#be1c1c"
    },
    shadowBlur: 1
});


const PageViewStore = ({ match, categories, branches, uploadMenuImage, uploadBranchCategory, getBranch, viewBranchCategory, viewBranch, createMenu }) => {
    let history = useHistory();
    const childRef = useRef();
    const [Allcategories, setBranchCategories] = useState([]);
    const [isUploaded, setIsUploaded] = useState(true);
    const [categoryName, setCategoryName] = useState(null);
    const [values, setValues] = useState({
        loading: true,
        visible: false,
    });
    const openModal = () => {
        setValues({ visible: true });
    }
    const closeModal = useCallback(() => {
        setValues({ visible: false })
        setIsUploaded(true)
        childRef.current.hanldeClearForm();

    });
    const historyGoBack = () => {
        history.goBack();
    };
    const getAllBranchCategories = () => {
        // setBranchCategories(branches);
        viewBranch(match.params.id);
    }
    const viewBranchCategories = () => {
        viewBranchCategory(match.params.id)
        getAllBranchCategories();
    }
    const onSubmit = useCallback(
        (data) => {
            const imageFile = childRef.current.hanldeUploadImage();
            uploadBranchCategory(imageFile[0]);
            let { name } = data;
            setCategoryName(name)
            setValues({ isValid: 'is-valid' });
        }
    );
    const createBranchMenu = () => {
        setIsUploaded(false)
        console.log("createBranchMenu")
        let data = {
            name: categoryName,
            image: {
                url: uploadMenuImage.image
            }
        }
        childRef.current.hanldeClearForm();
        createMenu(data, match.params.id)
    }


    const handlePageClick = data => {
        let selected = data.selected;
        let offset = Math.ceil(selected * 12);
        // this.setState({ offset: offset }, () => {
        //   this.loadCommentsFromServer();
        // });
    };
    useEffect(() => {
        viewBranchCategories();
        if (categories.length > 0) setBranchCategories(categories);
        if (uploadMenuImage.err === 0 && isUploaded) return createBranchMenu();
        setTimeout(() => {
            setValues({ loading: false });
        }, 900);
    }, [categories.length, branches.length, getBranch.length, uploadMenuImage.length]);

    return (
        <div className="dashboard-main-wrapper">
            <Header />
            {values.loading ? <TopBarProgress /> : false}
            <SideNav loading={values.loading} store={true} />
            <div className="dashboard-wrapper">
                <Modal visible={values.visible} width="400" height="400" effect="fadeInUp" onClickAway={() => closeModal()}>
                    <CreateCategory ref={childRef} onSubmit={onSubmit} closeModal={closeModal} />
                </Modal>
                <div className="container-fluid dashboard-content">
                    <div class="row">
                        <div class="col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12">
                            <div class="page-header">
                                <SkeletonTheme color="#b40000" highlightColor="#cd0000">
                                    {
                                        values.loading ? <Skeleton width={150} height={10} count={1} /> :
                                         <h2 class="pageheader-title">
                                            {getBranch.name} - {getBranch.location}
                                        </h2>
                                    }
                                </SkeletonTheme>

                                <div class="page-breadcrumb">
                                    <nav aria-label="breadcrumb">
                                        <ol class="breadcrumb">
                                            <li class="breadcrumb-item"><a href="/" class="breadcrumb-link">Dashboard</a></li>
                                            <li class="breadcrumb-item"><a href="/stores" class="breadcrumb-link">Stores</a></li>
                                            <li class="breadcrumb-item active" aria-current="page">Categories</li>
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
                    <div className="row">
                        <div className="col-lg-12">
                            <div className="card">
                                <div class="card-header">
                                    <h5 class="mb-0">
                                        <div class="section-block">
                                            {/* <button className="btn btn-primary"><i className="fab fa-fw fas fa-plus"></i> Add New</button> */}
                                            <button disabled={values.loading} className="btn btn-info float-right" onClick={openModal}><i color="#000" className="fab fa-fw fas fa-plus"></i> New Menu</button>
                                        </div>
                                    </h5>
                                    <h3 className="section-title">My Active Menus</h3>
                                </div>
                                <div className="card-body">
                                    <div className="card">
                                        <div className="campaign-table table-responsive">
                                            <table className="table">
                                                <thead>
                                                    <tr>
                                                        <th className="">No.</th>
                                                        <th className="">Photo</th>
                                                        <th className="">Menu Name</th>
                                                        <th className="">Date Create</th>
                                                        <th className="">Last Update</th>
                                                        <th className="">Action</th>
                                                    </tr>
                                                </thead>
                                                <tbody>
                                                    {Allcategories.map((listValue, index) => {
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
                                                                            values.loading ? <Skeleton width={35} height={35} count={1} /> : <div class="m-r-10"><img src={listValue.image.url} alt="user" width="35" /></div>
                                                                        }
                                                                    </SkeletonTheme>

                                                                </td>
                                                                <td>
                                                                    <SkeletonTheme color="#efeff6" highlightColor="#fff">
                                                                        {
                                                                            values.loading ? <Skeleton width={150} height={10} count={1} /> : <a class="redirect-item" href={`/stores/view/category-item/${match.params.id}/${listValue.id}`}>{listValue.name}</a>
                                                                        }
                                                                    </SkeletonTheme>

                                                                </td>
                                                                <td>
                                                                    <SkeletonTheme color="#efeff6" highlightColor="#fff">
                                                                        {
                                                                            values.loading ? <Skeleton width={150} height={10} count={1} /> : <Moment format="YYYY-MM-DD HH:mm">
                                                                                {listValue.createDate}
                                                                            </Moment>
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
                                                                            <span onClick={() => console.log("Hi")} className="dropdown-item"><i color="#000" className="far fa-edit"></i> Modify {listValue.name}</span>
                                                                            <span href="" className="dropdown-item"><i color="#000" class="far fa-trash-alt"></i>  Delete Menu</span>
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
                                    {/* <ReactPaginate
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
                                    /> */}
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

const mapStateToProps = ({ categories, branches, getBranch, uploadMenuImage }) => {
    return { branches, getBranch, uploadMenuImage, categories };
};

export default connect(mapStateToProps, { createMenu, viewBranchCategory, uploadBranchCategory, viewBranch })(PageViewStore);
