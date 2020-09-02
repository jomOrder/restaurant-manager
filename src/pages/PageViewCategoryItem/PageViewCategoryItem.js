import React, { useEffect, useState, useCallback, useRef } from 'react';
import SideNav from '../../components/SideNav/SideNav';
import Header from '../../components/Header/Header';
import TopBarProgress from "react-topbar-progress-indicator";
import ReactPaginate from 'react-paginate';
import Modal from 'react-awesome-modal';
import { useHistory } from 'react-router-dom'
import CreateCategoryItem from '../../components/CreateCategoryItem/CreateCategoryItem';
import ViewAddOn from '../../components/ViewAddOn/ViewAddOn';
import { Alert } from 'rsuite';
import { connect } from 'react-redux';
import { createMenuItem, viewCategoryItem, viewOneCategory, uploadBranchCategoryItem, viewItemAddOn, createNewAddOn, removeItemViewAddOn, bulkCreateMenuItem, removeMenuItem, updateCategoryItemImage, updateMenuItem } from '../../actions'
import Moment from 'react-moment';
import Skeleton, { SkeletonTheme } from 'react-loading-skeleton';
import { BlockLoading, Dialog, Button, Input, Checkbox } from 'zent';
import ImportCSVCategoryItem from '../../components/ImportCSVCategoryItem/ImportCSVCategoryItem';
import Avatar from 'react-avatar';
import UpdateCategoryItem from '../../components/UpdateCategoryItem/UpdateCategoryItem';
import { useDispatch } from 'react-redux'


TopBarProgress.config({
    barColors: {
        "0": "#be1c1c",
        "0.5": "#be1c1c",
        "1.0": "#be1c1c"
    },
    shadowBlur: 1
});



const PageViewCategoryItem = ({ location, match, createMenuItem, items, updateImage, viewItemAddOn, createNewAddOn, removeItemViewAddOn, itemAddOn, uploadMenuImage, viewCategoryItem, viewSingleCategory, viewOneCategory, uploadBranchCategoryItem, bulkCreateMenuItem, removeMenuItem, updateCategoryItemImage, updateMenuItem }) => {
    let history = useHistory();
    let dispatch = useDispatch();
    const childRef = useRef();
    const childRef1 = useRef();

    const itemAddOnChild = useRef();
    const { name } = location.state;
    const [AllItems, setCategoryItems] = useState([]);
    const [isUploaded, setIsUploaded] = useState(true);
    const [categoryName, setCategoryName] = useState(null);
    const [itemName, setItemName] = useState(null);
    const [itemID, setItemID] = useState(null);
    const [selected, setSelected] = useState(0);

    const [itemPrice, setItemPrice] = useState(null);
    const [branchName, setBranchName] = useState(null);
    const [addOnModal, setAddOnModal] = useState(false);
    const [isUpdated, setIsUpdated] = useState(false);
    const [deleteMenuItem, setDeleteMenuItem] = useState(false);
    const [objectVal, setData] = useState(null);
    const [updateItemData, setUpdateItem] = useState(null);


    const [values, setValues] = useState({
        loading: true,
        visible: false,
        csvVisible: false,
        updateCatgeoryItemVisible: false
    });

    const historyGoBack = () => {
        history.goBack();
    };

    const openModal = () => {
        setValues({ visible: true });
    }

    const openViewAddOnModal = (id) => {
        setItemID(id);
        viewItemAddOn(id, 0);
        setAddOnModal(true);
    }

    const openImportCategoryItemModal = () => {
        setValues({ csvVisible: true });
    }

    const openDeleteMenuModal = (item) => {
        setDeleteMenuItem(true);
        setCategoryName(item.name);
        setItemID(item.id);
        console.log(item);
    }

    const removeSingleCategoryItem = () => {
        setDeleteMenuItem(false);
        setValues({ loading: true });
        console.log(itemID);
        removeMenuItem(itemID);
        setTimeout(() => {
            setValues({ loading: false });
        }, 400);
    }
    const closeImportCategoryItemModal = useCallback(() => {
        setValues({ csvVisible: false })
    });

    const closeDeleteMenuItem = () => {
        setDeleteMenuItem(false);
    }
    const exportModal = useCallback(() => {
        let items = childRef.current.exportItems();
        bulkCreateMenuItem(items, match.params.id)
        setTimeout(() => {
            setValues({ csvVisible: false });
            viewCategoryItem(match.params.id, selected)
        }, 1600)
    });


    const closeAddOnModal = useCallback(() => {
        setAddOnModal(false);
        itemAddOnChild.current.handleClearForm();
        //itemAddOnChild.current.cleanForm();

    });

    const closeModal = useCallback(() => {
        setValues({ visible: false })
        setIsUploaded(false)
        childRef.current.hanldeClearForm();

    });

    const getOneCategoryItems = () => {
        viewOneCategory(match.params.id, match.params.branch);
    }
    const setBranchCategoryName = () => {
        let { result } = viewSingleCategory;
        setBranchName(result.name)
        setCategoryName(result.categories[0].name)
        viewAllCategoryItem();
    }
    const viewAllCategoryItem = () => {
        viewCategoryItem(match.params.id, selected)
    }
    const onSubmit = useCallback(
        (data) => {
            setIsUploaded(true)
            const imageFile = childRef1.current.hanldeUploadImage();
            uploadBranchCategoryItem(imageFile[0]);
            let { name, price } = data;
            let parsePrice = parseFloat(price).toFixed(2);
            setItemName(name);
            setItemPrice(parsePrice);
            setValues({ isValid: 'is-valid' });
        }
    );

    const onSubmitAddOn = useCallback(
        (data) => {
            itemAddOnChild.current.handleLoadingNewItem();
            createNewAddOn(data, itemID);
            setTimeout(() => {
                viewItemAddOn(itemID);
            }, 200)
        }
    );

    const onChnagePage = useCallback(
        (data) => {
            viewItemAddOn(itemID, data);
        }
    );

    const closeUpdateCategoryItemModal = useCallback(() => {
        setValues({ updateCatgeoryItemVisible: false })
        childRef.current.handleCloseLoading();
        childRef.current.clearForm();
    });

    const createBranchMenuItem = (imageFile) => {
        let itemInSotre = childRef1.current.handleItemInSotre();
        setIsUploaded(false)
        let data = {
            name: itemName,
            price: itemPrice,
            in_store: itemInSotre,
            photo: {
                url: imageFile
            }
        }
        createMenuItem(data, match.params.id);
        childRef1.current.hanldeClearForm();
        setTimeout(() => {
            viewCategoryItem(match.params.id, selected)
        }, 300)
    }

    const handleUpdateSingleItem = useCallback((data) => {
        let file = childRef.current.hanldeGetImageFile();
        let toggle = childRef.current.hanldeGetItemStore();
        let in_store = toggle ? 1 : 0;
        data.in_store = in_store;
        if (data) {
            if (file.name) {
                setIsUpdated(true);
                updateCategoryItemImage(file)
                setData(data);
            }
            else if (file.length === 0) {
                let photo = {
                    url: updateItemData.photo.url
                }
                data.photo = photo;
                updateMenuItem(data, updateItemData.id);
                Alert.success("Item updated successfully")
                dispatch({ type: 'CLEAR_CATEGORY' });
                setValues({ updateCatgeoryItemVisible: false });
                childRef.current.handleCloseLoading();

            }
            setTimeout(() => {
                viewCategoryItem(match.params.id, selected);

            }, 300)
        }
    });

    const openUpdateCategoryItemModal = (item) => {
        setValues({ updateCatgeoryItemVisible: true });
        setUpdateItem(item);
        childRef.current.handleShowLoading();
        childRef.current.viewItemByID(item)
    }

    const handlePageClick = data => {
        let selected = data.selected;
        setSelected(selected);
        viewCategoryItem(match.params.id, selected)
    };

    const onSubmitDeleteAddOn = useCallback((addOnID) => {
        removeItemViewAddOn(addOnID)
        setTimeout(() => {
            viewItemAddOn(itemID);
        }, 200)
    });

    const handleUpdateImage = (imageFile) => {
        let photo = {
            url: imageFile
        }

        if (objectVal) objectVal.photo = photo;
        updateMenuItem(objectVal, updateItemData.id);
        setTimeout(() => {
            viewCategoryItem(match.params.id, selected)
            setValues({ updateCatgeoryItemVisible: false })
            childRef.current.handleCloseLoading();
            dispatch({ type: 'CLEAR_ITEM' });
            Alert.success("Item updated successfully")

        }, 300)
        setIsUpdated(false);
    }

    useEffect(() => {
        if (viewSingleCategory.err === 0) setBranchCategoryName();
        if (items.length > 0) setCategoryItems(items);
        console.log("items: ", items);
        console.log("updateImage: ", updateImage);

        if (items.err == 24) {
            Alert.warning(items.message)
            dispatch({ type: 'CLEAR_ITEM' });
        }
        if (items.err == 22) {
            Alert.success(items.message)
            dispatch({ type: 'CLEAR_ITEM' });
        }
        if (uploadMenuImage.length > 0 && isUploaded) createBranchMenuItem(uploadMenuImage[0].image)
        if (updateImage.length > 0 && isUpdated) {
            handleUpdateImage(updateImage[0].image)
        }
        setTimeout(() => {
            setValues({ loading: false });
            getOneCategoryItems();
        }, 400);
    }, [updateImage, viewSingleCategory.length, items.length, itemAddOn.length, uploadMenuImage]);


    return (

        <div className="dashboard-main-wrapper">
            <Header />
            {values.loading ? <TopBarProgress /> : false}
            <SideNav loading={values.loading} store={true} />
            <div className="dashboard-wrapper">
                <Modal visible={values.csvVisible} width="400" height="300" effect="fadeInUp" onClickAway={closeImportCategoryItemModal}>
                    <ImportCSVCategoryItem ref={childRef} exportModal={exportModal} closeModal={closeImportCategoryItemModal} />
                </Modal>
                <Modal visible={values.visible} width="400" height="500" effect="fadeInUp" onClickAway={closeModal}>
                    <CreateCategoryItem ref={childRef1} onSubmit={onSubmit} closeModal={closeModal} />
                </Modal>
                <Modal visible={values.updateCatgeoryItemVisible} width="400" height="400" effect="fadeInUp" onClickAway={closeUpdateCategoryItemModal}>
                    <UpdateCategoryItem onSubmit={handleUpdateSingleItem} ref={childRef} closeModal={closeUpdateCategoryItemModal} />
                </Modal>
                <Dialog title="New Add On" visible={addOnModal} onClose={closeAddOnModal}>
                    <ViewAddOn ref={itemAddOnChild} items={itemAddOn} onSubmitDeleteAddOn={onSubmitDeleteAddOn} onChnagePage={onChnagePage} onSubmit={onSubmitAddOn} closeModal={closeAddOnModal} />
                </Dialog>
                <Dialog title="Delete Menu Item" visible={deleteMenuItem} onClose={closeDeleteMenuItem}>
                    <div style={{ marginBottom: 20 }}>
                        <span>Are you sure want to remove {categoryName} ?</span>
                    </div>
                    <Button type="danger" onClick={removeSingleCategoryItem}>
                        Delete
                    </Button>
                    <Button type="primary" onClick={closeDeleteMenuItem}>
                        Close
                    </Button>
                </Dialog>
                <div className="container-fluid dashboard-content">
                    <div class="row">
                        <div class="col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12">
                            <div class="page-header">
                                <h2 class="pageheader-title">{branchName} - {name}
                                </h2>
                                <div class="page-breadcrumb">
                                    <nav aria-label="breadcrumb">
                                        <ol class="breadcrumb">
                                            <li class="breadcrumb-item"><a href="/" class="breadcrumb-link">Dashboard</a></li>
                                            <li class="breadcrumb-item"><a href="/stores" class="breadcrumb-link">Stores</a></li>
                                            <li class="breadcrumb-item"><a onClick={historyGoBack} class="breadcrumb-link">Category</a></li>
                                            <li class="breadcrumb-item active" aria-current="page">Items</li>
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
                                            {/* <button className="btn btn-primary"><i className="fab fa-fw fas fa-plus"></i> Add New</button> */}
                                            <button disabled={values.loading} style={{ marginLeft: 10 }} className="btn btn-info float-right" onClick={openModal}><i className="fab fa-fw fas fa-plus"></i> New Item</button>
                                            <button disabled={values.loading} className="btn btn-success float-right" onClick={openImportCategoryItemModal}><i color="#FFF" className="fas fa-file-medical"></i> Import Csv</button>
                                        </div>
                                    </h5>
                                    <h3 className="section-title">My Active Items</h3>
                                </div>
                                <div class="card-body">
                                    {!values.loading && items.length > 0 ? <div class="campaign-table table-responsive">
                                        <table class="table" style={{ width: "100%", marginBottom: "15px" }}>
                                            <thead>
                                                <tr>
                                                    <th>No.</th>
                                                    <th>Photo</th>
                                                    <th>Name</th>
                                                    <th>Price</th>
                                                    <th>In Store</th>
                                                    <th>Create Date</th>
                                                    <th>Update Date</th>
                                                    <th>Add-On</th>
                                                    <th>Action</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                {AllItems.map((listValue, index) => {
                                                    return (
                                                        <tr key={index}>
                                                            <td>
                                                                {index + 1}
                                                            </td>

                                                            <td>
                                                                <div class="m-r-10">{!listValue.photo.url ? <Avatar square size={50} name={"NA"} src={"A"} /> : <img src={listValue.photo.url} alt="item_image" width="50" />}</div>
                                                            </td>
                                                            <td>
                                                                {listValue.name}
                                                            </td>
                                                            <td>

                                                                RM {listValue.price}
                                                            </td>
                                                            <td>
                                                                {
                                                                    listValue.in_store === 1 ? <span class="badge badge-success">Available</span> : <span class="badge badge-danger">Unavailable</span>
                                                                }

                                                            </td>

                                                            <td>
                                                                <Moment format="YYYY-MM-DD HH:mm a">
                                                                    {listValue.createDate}
                                                                </Moment>
                                                            </td>
                                                            <td>
                                                                <Moment format="YYYY-MM-DD HH:mm a">
                                                                    {listValue.updateDate || 'N/A'}
                                                                </Moment>
                                                            </td>
                                                            <td>
                                                                <button onClick={() => openViewAddOnModal(listValue.id)} > <span style={{ fontSize: 12 }} class="badge badge-info">View</span></button>
                                                            </td>
                                                            <td>
                                                                <div className="dropdown float-right">
                                                                    <a href="#" className="dropdown-toggle card-drop" data-toggle="dropdown" aria-expanded="true">
                                                                        <i className="mdi mdi-dots-vertical"></i>
                                                                    </a>
                                                                    <div className="dropdown-menu dropdown-menu-right">
                                                                        <span onClick={() => openUpdateCategoryItemModal(listValue)} className="dropdown-item"><i color="#000" className="far fa-edit"></i>  Modify {listValue.name}</span>
                                                                        <span onClick={() => openDeleteMenuModal(listValue)} className="dropdown-item"><i color="#000" class="far fa-trash-alt"></i>  Delete Item</span>
                                                                    </div>
                                                                </div>
                                                            </td>
                                                        </tr>
                                                    );
                                                })}
                                            </tbody>
                                        </table>
                                    </div> : <div class="col-12 d-flex justify-content-center">
                                            {/* <Spinner radius={30} color={"#000"} stroke={3} visible={true} /> */}
                                            {/* <ScaleLoader
                                                css={override}
                                                size={35}
                                                color={"#e02d2d"}
                                                loading={values.loading}
                                            /> */}
                                            <BlockLoading loading={values.loading} icon="circle" iconSize={64} iconText="Loading" />

                                            {!values.loading && items.length === 0 ? <div>
                                                <img className="logo-img" style={{ width: 180, marginTop: 10 }} src="../assets/images/no_data_found.svg" alt="no_data_found" />
                                                <p>No Menu Item Available</p>
                                            </div> : null}

                                        </div>}
                                    {items.length > 0 ? <ReactPaginate
                                        previousLabel={<i class="fas fa-arrow-left"></i>}
                                        nextLabel={<i class="fas fa-arrow-right"></i>}
                                        breakLabel={'...'}
                                        breakClassName={'break-me'}
                                        pageCount={Math.ceil(items.length / 50)}
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
                                    /> : null}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}


const mapStateToProps = ({ viewSingleCategory, items, uploadMenuImage, itemAddOn, updateImage }) => {
    return { viewSingleCategory, items, uploadMenuImage, itemAddOn, updateImage };
};

export default connect(mapStateToProps, { createMenuItem, viewCategoryItem, viewOneCategory, uploadBranchCategoryItem, viewItemAddOn, createNewAddOn, removeItemViewAddOn, bulkCreateMenuItem, removeMenuItem, updateCategoryItemImage, updateMenuItem })(PageViewCategoryItem);

