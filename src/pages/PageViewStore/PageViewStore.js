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
import { useDispatch } from 'react-redux'
import { Alert } from 'rsuite';
import { BlockLoading, Dialog, Button } from 'zent';
import Avatar from 'react-avatar';
import { Switch } from 'zent';
import { timeFromInt } from 'time-number';
import moment from 'moment-timezone'

moment.tz.setDefault('Asia/Singapore');



import { createMenu, bulkCreateMenu, uploadBranchCategory, viewBranchCategory, viewBranch, updateMenu, updateCategoryImage, removeMenu, updateMenuInStore } from '../../actions'
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


const PageViewStore = ({ match, createCategory, location, categories, branches, updateImage, uploadMenuImage, uploadBranchCategory, getBranch, viewBranchCategory, viewBranch, createMenu, bulkCreateMenu, updateMenu, updateCategoryImage, removeMenu, updateMenuInStore }) => {
    let history = useHistory();
    const mounted = useRef();
    const create = useRef();
    const childRef = useRef();
    const childRef1 = useRef();
    const dispatch = useDispatch()
    const { name, branchLocation } = location.state;

    const [updateCategoryData, setUpdateCategory] = useState(null);
    const [isUploaded, setIsUploaded] = useState(false);
    const [categoryName, setCategoryName] = useState(null);
    const [categoryID, setCategoryID] = useState(null);
    const [toggleChcked, setToggleChecked] = useState(true)
    const [selected, setSelected] = useState(0);
    const [objectVal, setData] = useState(null);
    const [updateCatgeoryVisible, setUpdateCatgeoryVisible] = useState(false);
    const [deleteMenu, setDeleteMenu] = useState(false);
    const [availableMenu, setAvailableMenu] = useState(false);
    const [item, setItem] = useState(null);

    const [isUpdated, setIsUpdated] = useState(false);
    const [CATEGORIES, setCATEGORIES] = useState([]);

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

    const openDeleteMenuModal = (item) => {
        setDeleteMenu(true);
        setCategoryName(item.name);
        setCategoryID(item.id);
    }

    const removeSingleCategory = () => {
        removeMenu(categoryID);
        setDeleteMenu(false);
        setTimeout(() => {
            viewBranchCategory(match.params.id);
        }, 300)
    }

    const closeImportCategoryModal = useCallback(() => {
        setValues({ csvVisible: false })
        childRef1.current.removeFile();

    });

    const closeAddCategoryModal = useCallback(() => {
        setValues({ catgeoryVisible: false })
        setIsUploaded(false)
        create.current.hanldeClearForm();

    });

    const closeDeleteMenu = () => {
        setDeleteMenu(false);

    }

    const closeAvailableMenu = () => {
        setAvailableMenu(false);
    }

    const exportModal = useCallback(() => {
        let categories = childRef1.current.exportCategories();
        bulkCreateMenu(categories, match.params.id)
        setTimeout(() => {
            setValues({ csvVisible: false });
            viewBranchCategory(match.params.id);
            childRef1.current.removeFile();
        }, 1600)
    });

    const openUpdateCategoryModal = (item) => {
        dispatch({ type: 'CLEAR_CATEGORY' });
        setToggleChecked(true);
        setUpdateCatgeoryVisible(true);
        childRef.current.viewCategoryByID(item)
        childRef.current.handleShowLoading();
    }
    const closeUpdateCategoryModal = useCallback(() => {
        setUpdateCatgeoryVisible(false);
        childRef.current.handleCloseLoading();
    });

    const historyGoBack = () => {
        dispatch({ type: 'CLEAR_BRANCHE_CATEGORY' });
        history.goBack();
    };
    const viewBranchCategories = () => {
        let page = selected ? selected : 0;

        viewBranch(match.params.id, page);
    }
    const onSubmit = useCallback(
        (data) => {
            setIsUploaded(true)
            const imageFile = create.current.hanldeUploadImage();
            uploadBranchCategory(imageFile[0]);
            let { name } = data;
            setCategoryName(name)
            setValues({ isValid: 'is-valid' });
        }
    );
    const handleUpdateSingleCategory = useCallback((data) => {
        let file = childRef.current.hanldeGetImageFile();
        let category_type = childRef.current.getCategoryType();
        let startTime = childRef.current.handleGetStartTime();
        let endTime = childRef.current.handleGetEndTime();

        if (data) {
            if (file.name) {
                setIsUpdated(true);
                updateCategoryImage(file)
                setData(data);
            }
            else if (file.length === 0) {
                let image = {
                    url: updateCategoryData.image.url
                }
                data.image = image;
                data.category_type = category_type;
                data.timer = {
                    from: startTime,
                    to: endTime
                };
                updateMenu(data, updateCategoryData.id);
                Alert.success("Item updated successfully")
                dispatch({ type: 'CLEAR_CATEGORY' });
                setUpdateCatgeoryVisible(false);
                childRef.current.handleCloseLoading();
            }
            setTimeout(() => {
                viewBranchCategory(match.params.id, selected);
            }, 300)
        }

    });

    const handleUpdateImage = (imageFile) => {
        let category_type = childRef.current.getCategoryType();
        let startTime = childRef.current.handleGetStartTime();
        let endTime = childRef.current.handleGetEndTime();
        let image = {
            url: imageFile
        }
        if (objectVal) {
            objectVal.image = image;
            objectVal.category_type = category_type;
            objectVal.timer = {
                from: startTime,
                to: endTime
            };
        }
        updateMenu(objectVal, updateCategoryData.id);
        setTimeout(() => {
            viewBranchCategory(match.params.id, selected);
            setUpdateCatgeoryVisible(false);
            childRef.current.handleCloseLoading();
            dispatch({ type: 'CLEAR_CATEGORY' });
            Alert.success("Item updated successfully")
        }, 300)
        setIsUpdated(false);
    }
    const createBranchMenu = (imageFile) => {
        let name = categoryName.replace(/\b\w/g, l => l.toUpperCase()).trim();
        let category_type = create.current.handleGetCategoryType();
        let startTime = create.current.handleGetStartTime();
        let endTime = create.current.handleGetEndTime();

        let data = {
            name: name,
            category_type,
            in_store: 1,
            image: {
                url: imageFile
            },
            timer: {
                from: startTime || 0,
                to: endTime || 0
            }
        }
        if (isUploaded) createMenu(data, match.params.id)
        setTimeout(() => {
            viewBranchCategory(match.params.id, selected)
        }, 600);
        create.current.hanldeClearForm();
        dispatch({ type: 'CLEAR_IMAGE' })

    }

    const viewOneCategory = (item) => {
        dispatch({ type: 'CLEAR_CATEGORY' });
        openUpdateCategoryModal(item);
        setUpdateCategory(item);
    }

    const handlePageClick = data => {
        let selected = data.selected;
        setSelected(selected);
        viewBranchCategory(match.params.id, selected)

    };

    const handleAvailabilityMenu = () => {
        let in_store = item.in_store == 1 ? 0 : 1;
        setAvailableMenu(false);
        updateMenuInStore(item.id, in_store);
        setTimeout(() => {
            viewBranchCategory(match.params.id, selected)
        }, 500)
    }

    const updateCategoryInStore = (listValue, index) => {
        setAvailableMenu(true)
        setItem(listValue)
    }

    useEffect(() => {
        if (!mounted.current) {
            dispatch({ type: 'CLEAR_BRANCHE_CATEGORY_ITEM' })
            viewBranchCategory(match.params.id, 0)
            // do componentDidMount logic
            setTimeout(() => {
                setValues({ loading: false });
            }, 400);
            mounted.current = true;
        } else {
            // do componentDidUpdate logic

            let page = selected ? selected : 0;
            dispatch({ type: 'CLEAR_BRANCHE_CATEGORY' });
            // if (categories.length === 0) viewBranchCategory(match.params.id, page)
            if (createCategory.err === 0) {
                dispatch({ type: 'CLEAR_CATEGORY' });
            }
            if (uploadMenuImage.length > 0 && isUploaded) createBranchMenu(uploadMenuImage[0].image)
            if (createCategory.err == 24) {
                Alert.warning(createCategory.message)
                dispatch({ type: 'CLEAR_CATEGORY' });
            }
            if (createCategory.err == 22) {
                Alert.success(createCategory.message)
                dispatch({ type: 'CLEAR_CATEGORY' });
            }
            if (updateImage.length > 0 && isUpdated) {
                handleUpdateImage(updateImage[0].image)
            }
            return () => {
                setIsUpdated(false);
            }
        }


    }, [updateImage, createCategory, categories.length, branches.length, getBranch.length, uploadMenuImage, mounted.current]);

    return (
        <div className="dashboard-main-wrapper">
            <Header />
            {values.loading ? <TopBarProgress /> : false}
            <SideNav loading={values.loading} store={true} />
            <div className="dashboard-wrapper">
                <Modal visible={values.csvVisible} width="400" height="300" effect="fadeInUp" onClickAway={closeImportCategoryModal}>
                    <ImportCSVCategory ref={childRef1} exportModal={exportModal} closeModal={closeImportCategoryModal} />
                </Modal>
                <Modal visible={values.catgeoryVisible} width="400" height="550" effect="fadeInUp" onClickAway={closeAddCategoryModal}>
                    <CreateCategory ref={create} onSubmit={onSubmit} closeModal={closeAddCategoryModal} />
                </Modal>
                <Modal visible={updateCatgeoryVisible} width="400" height="400" effect="fadeInUp" onClickAway={closeUpdateCategoryModal}>
                    <UpdateCategory onSubmit={handleUpdateSingleCategory} ref={childRef} closeModal={closeUpdateCategoryModal} />
                </Modal>
                <Dialog title="Delete Menu" visible={deleteMenu} onClose={closeDeleteMenu}>
                    <div style={{ marginBottom: 20 }}>
                        <span>Are you sure want to remove {categoryName} ?</span>
                    </div>
                    <Button type="danger" onClick={removeSingleCategory}>
                        Delete
                    </Button>
                    <Button type="primary" onClick={closeDeleteMenu}>
                        Close
                    </Button>
                </Dialog>
                <Dialog title="Avaliability Menu" visible={availableMenu} onClose={closeAvailableMenu}>
                    <div style={{ marginBottom: 20 }}>
                        <span>Are you sure want to Update ?</span>
                    </div>
                    <Button type="primary" onClick={handleAvailabilityMenu}>
                        Confirm
                    </Button>
                    <Button type="danger" onClick={() => setAvailableMenu(false)}>
                        Close
                    </Button>
                </Dialog>
                <div className="container-fluid dashboard-content">
                    <div className="row">
                        <div className="col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12">
                            <div className="page-header">
                                <h2 className="pageheader-title">
                                    {name} - {branchLocation}
                                </h2>
                                <div className="page-breadcrumb">
                                    <nav aria-label="breadcrumb">
                                        <ol className="breadcrumb">
                                            <li className="breadcrumb-item"><a href="/" className="breadcrumb-link">Dashboard</a></li>
                                            <li className="breadcrumb-item"><a href="/stores" className="breadcrumb-link">Stores</a></li>
                                            <li className="breadcrumb-item active" aria-current="page">Categories</li>
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
                                <div className="card-header">
                                    <h5 className="mb-0">
                                        <div className="section-block">
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
                                                        <th className="">Menu Type</th>
                                                        <th>Availablity</th>
                                                        <th>Time</th>
                                                        <th className="">Date Create</th>
                                                        <th className="">Last Update</th>
                                                        <th className="">In Store</th>
                                                        <th className="">Action</th>
                                                    </tr>
                                                </thead>
                                                <tbody>
                                                    {categories.length > 0 ? categories[0].categories.map((listValue, index) => {
                                                        return (
                                                            <tr key={index}>
                                                                <td>
                                                                    {index + 1}
                                                                </td>
                                                                <td>
                                                                    <div className="m-r-10">{!listValue.image.url ? <Avatar square size={50} name={"NA"} src={"A"} /> : <img src={listValue.image.url} alt="category_image" width="50" />}</div>
                                                                </td>
                                                                <td>
                                                                    <Link to={{ pathname: `/stores/view/category-item/${match.params.id}/${listValue.id}`, state: { name: listValue.name, branchName: name } }} className="redirect-item">{listValue.name}</Link>
                                                                </td>
                                                                <td>
                                                                    {
                                                                        listValue.category_type === 1 ? <span class="badge badge-warning"> Food</span> : listValue.category_type === 2 ? <span class="badge badge-info">Beverge</span> : listValue.category_type === 3 ? <span class="badge badge-primary">Dessert</span> : 'N/A'
                                                                    }
                                                                </td>
                                                                <td>
                                                                    {
                                                                        listValue.in_store === 1 ? <span class="badge badge-success">In-Store</span> : <span class="badge badge-danger">Sold-Out</span>
                                                                    }
                                                                </td>
                                                                <td>
                                                                    {
                                                                        <span class="badge badge-light">{timeFromInt(parseInt(listValue.timer.from), { format: 12 }) + ' : ' + timeFromInt(parseInt(listValue.timer.to), { format: 12 })}</span>
                                                                    }
                                                                </td>
                                                                <td>
                                                                    {moment.utc(listValue.createDate, "YYYY-MM-DD").local().format('YYYY-MM-DD')}
                                                                </td>
                                                                <td>

                                                                    {listValue.updateDate ? moment(listValue.updateDate).format('YYYY-MM-DD') : 'N/A'}
                                                                </td>
                                                                <td>
                                                                    <Switch
                                                                        checked={listValue.in_store}
                                                                        onChange={() => updateCategoryInStore(listValue, index)}
                                                                    />
                                                                </td>
                                                                <td>
                                                                    <div className="dropdown float-right">
                                                                        <a href="#" className="dropdown-toggle card-drop" data-toggle="dropdown" aria-expanded="true">
                                                                            <i className="mdi mdi-dots-vertical"></i>
                                                                        </a>
                                                                        <div className="dropdown-menu dropdown-menu-right">
                                                                            <span onClick={() => viewOneCategory(listValue)} className="dropdown-item"><i color="#000" className="far fa-edit"></i> Modify {listValue.name}</span>
                                                                            <span onClick={() => openDeleteMenuModal(listValue)} className="dropdown-item"><i color="#000" className="far fa-trash-alt"></i>  Delete Menu</span>
                                                                        </div>
                                                                    </div>
                                                                </td>
                                                            </tr>
                                                        );
                                                    }) : null}
                                                </tbody>
                                            </table>
                                        </div> : <div className="col-12 d-flex justify-content-center">
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
                                        pageCount={Math.ceil(categories[0].categories.length / categories[0].count)}
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

const mapStateToProps = ({ categories, createCategory, branches, getBranch, uploadMenuImage, updateImage }) => {
    return { branches, getBranch, uploadMenuImage, categories, createCategory, updateImage };
};

export default connect(mapStateToProps, { createMenu, viewBranchCategory, uploadBranchCategory, viewBranch, bulkCreateMenu, updateMenu, updateCategoryImage, removeMenu, updateMenuInStore })(PageViewStore);
