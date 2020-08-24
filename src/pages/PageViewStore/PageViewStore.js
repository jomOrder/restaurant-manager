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
import { Link } from 'react-router-dom'
import { BlockLoading } from 'zent';
import Avatar from 'react-avatar';
import moment from 'moment-timezone'
moment.tz.setDefault('Asia/Singapore');



import { createMenu, bulkCreateMenu, uploadBranchCategory, viewBranchCategory, viewBranch, updateMenu } from '../../actions'
import ImportCSVCategory from '../../components/ImportCSVCategory/ImportCSVCategory';
import UpdateCategory from '../../components/UpdateCategory/UpdateCategory';
import { setTime } from 'zent/es/datetimepicker/utils';
TopBarProgress.config({
    barColors: {
        "0": "#be1c1c",
        "0.5": "#be1c1c",
        "1.0": "#be1c1c"
    },
    shadowBlur: 1
});


const PageViewStore = ({ match, createCategory, categories, branches, uploadMenuImage, uploadBranchCategory, getBranch, viewBranchCategory, viewBranch, createMenu, bulkCreateMenu, updateMenu }) => {
    let history = useHistory();
    const childRef = useRef();
    const childRef1 = useRef();

    const [Allcategories, setBranchCategories] = useState([]);
    const [isUploaded, setIsUploaded] = useState(true);
    const [categoryName, setCategoryName] = useState(null);

    const [values, setValues] = useState({
        loading: true,
        catgeoryVisible: false,
        updateCatgeoryVisible: false,
        csvVisible: false,
    });



    const openImportCategoryModal = () => {
        setValues({ csvVisible: true });
    }

    const openAddCategoryModal = () => {
        setValues({ catgeoryVisible: true });
    }

    const closeImportCategoryModal = useCallback(() => {
        setValues({ csvVisible: false })
        childRef1.current.removeFile();

    });

    const closeAddCategoryModal = useCallback(() => {
        setValues({ catgeoryVisible: false })
        setIsUploaded(true)
        //childRef.current.hanldeClearForm();

    });

    const exportModal = useCallback(() => {
        let categories = childRef1.current.exportCategories();

        bulkCreateMenu(categories, match.params.id)
        console.log("categories", categories);
        setTimeout(() => {
            setValues({ csvVisible: false });
            viewBranchCategory(match.params.id);
        }, 1600)
    });

    const openUpdateCategoryModal = (item) => {
        childRef.current.viewCategoryByID(item)
        setValues({ updateCatgeoryVisible: true });
        childRef.current.handleShowLoading();

    }
    const closeUpdateCategoryModal = useCallback(() => {
        setValues({ updateCatgeoryVisible: false })
        childRef.current.handleCloseLoading();
    });

    const historyGoBack = () => {
        history.goBack();
    };
    const viewBranchCategories = () => {
        viewBranchCategory(match.params.id)
        viewBranch(match.params.id);
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
    const handleUpdateSingleCategory = useCallback(() => {

    });
    const createBranchMenu = () => {
        setIsUploaded(false)
        console.log("createBranchMenu")
        let data = {
            name: categoryName,
            image: {
                url: uploadMenuImage.image
            }
        }
        //childRef.current.hanldeClearForm();
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
        console.log(categories);
        console.log(createCategory);
        console.log("Allcategories", Allcategories)
        if (categories.length > 0) setBranchCategories(categories);
        if (uploadMenuImage.err === 0 && isUploaded) return createBranchMenu();
        setTimeout(() => {
            setValues({ loading: false });
        }, 400);
    }, [createCategory.length, categories.length, branches.length, getBranch.length, uploadMenuImage.length]);

    return (
        <div className="dashboard-main-wrapper">
            <Header />
            {values.loading ? <TopBarProgress /> : false}
            <SideNav loading={values.loading} store={true} />
            <div className="dashboard-wrapper">
                <Modal visible={values.csvVisible} width="400" height="300" effect="fadeInUp" onClickAway={closeImportCategoryModal}>
                    <ImportCSVCategory ref={childRef1} exportModal={exportModal} closeModal={closeImportCategoryModal} />
                </Modal>
                <Modal visible={values.catgeoryVisible} width="400" height="400" effect="fadeInUp" onClickAway={closeAddCategoryModal}>
                    <CreateCategory ref={childRef} onSubmit={onSubmit} closeModal={closeAddCategoryModal} />
                </Modal>
                <Modal visible={values.updateCatgeoryVisible} width="400" height="400" effect="fadeInUp" onClickAway={closeUpdateCategoryModal}>
                    <UpdateCategory onSubmit={handleUpdateSingleCategory} ref={childRef} closeModal={closeUpdateCategoryModal} />
                </Modal>
                <div className="container-fluid dashboard-content">
                    <div class="row">
                        <div class="col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12">
                            <div class="page-header">
                                <h2 class="pageheader-title">
                                    {getBranch.name} - {getBranch.location}
                                </h2>
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
                                            <button disabled={values.loading} className="btn btn-info float-right" style={{ marginLeft: 10 }} onClick={openAddCategoryModal}><i color="#000" className="fab fa-fw fas fa-plus"></i> New Menu</button>
                                            <button disabled={values.loading} className="btn btn-success float-right" onClick={openImportCategoryModal}><i color="#FFF" className="fas fa-file-medical"></i> Import Csv</button>
                                        </div>
                                    </h5>
                                    <h3 className="section-title">My Active Menus</h3>
                                </div>
                                <div className="card-body">
                                    <div className="card">
                                        {!values.loading && categories.length > 0 ? <div className="campaign-table table-responsive">
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
                                                    {categories.length > 0 ? categories.map((listValue, index) => {
                                                        return (
                                                            <tr key={index}>
                                                                <td>
                                                                    {index + 1}
                                                                </td>
                                                                <td>
                                                                    <div class="m-r-10">{!listValue.image.url ? <Avatar square size={50} name={"NA"} src={"A"} /> : <img src={listValue.image.url} alt="category_image" width="50" />}</div>
                                                                </td>
                                                                <td>
                                                                    <Link to={{ pathname: `/stores/view/category-item/${match.params.id}/${listValue.id}`, state: { name: listValue.name } }} class="redirect-item">{listValue.name}</Link>
                                                                </td>
                                                                <td>
                                                                    <Moment format="YYYY-MM-DD HH:mm">
                                                                        {listValue.createDate}
                                                                    </Moment>
                                                                </td>
                                                                <td>
                                                                    {listValue.updateDate ? moment(listValue.updateDate).format('YYYY-MM-DD HH:MM a') : 'N/A'}
                                                                </td>
                                                                <td>
                                                                    <div className="dropdown float-right">
                                                                        <a href="#" className="dropdown-toggle card-drop" data-toggle="dropdown" aria-expanded="true">
                                                                            <i className="mdi mdi-dots-vertical"></i>
                                                                        </a>
                                                                        <div className="dropdown-menu dropdown-menu-right">
                                                                            <span onClick={() => openUpdateCategoryModal(listValue)} className="dropdown-item"><i color="#000" className="far fa-edit"></i> Modify {listValue.name}</span>
                                                                            <span href="" className="dropdown-item"><i color="#000" class="far fa-trash-alt"></i>  Delete Menu</span>
                                                                        </div>
                                                                    </div>
                                                                </td>
                                                            </tr>
                                                        );
                                                    }) : null}
                                                </tbody>
                                            </table>
                                        </div> : <div class="col-12 d-flex justify-content-center">
                                                <BlockLoading loading={values.loading} icon="circle" iconSize={64} iconText="Loading" />

                                                {!values.loading && categories.length === 0 ? <div>
                                                    <img className="logo-img" style={{ width: 180, marginTop: 10 }} src="../assets/images/no_data_found.svg" alt="no_data_found" />
                                                    <p>No Store Available</p>
                                                </div> : null}

                                            </div>}
                                    </div>
                                    {categories.length > 0 ? <ReactPaginate
                                        previousLabel={<i className="fas fa-arrow-left"></i>}
                                        nextLabel={<i className="fas fa-arrow-right"></i>}
                                        breakLabel={'...'}
                                        breakClassName={'break-me'}
                                        pageCount={categories.length / 50}
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
    )
}

const mapStateToProps = ({ categories, createCategory, branches, getBranch, uploadMenuImage }) => {
    return { branches, getBranch, uploadMenuImage, categories, createCategory };
};

export default connect(mapStateToProps, { createMenu, viewBranchCategory, uploadBranchCategory, viewBranch, bulkCreateMenu, updateMenu })(PageViewStore);
