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
import { createMenuItem, viewCategoryItem, viewOneCategory, uploadBranchCategoryItem, viewItemAddOn, createNewAddOn, removeItemViewAddOn, bulkCreateMenuItem, removeMenuItem, updateCategoryItemImage, updateMenuItem, updateItemInStore } from '../../actions'
import Moment from 'react-moment';
import { Link } from 'react-router-dom'
import Skeleton, { SkeletonTheme } from 'react-loading-skeleton';
import { BlockLoading, Dialog, Button, Input, Checkbox } from 'zent';
import ImportCSVCategoryItem from '../../components/ImportCSVCategoryItem/ImportCSVCategoryItem';
import Avatar from 'react-avatar';
import UpdateCategoryItem from '../../components/UpdateCategoryItem/UpdateCategoryItem';
import { useDispatch } from 'react-redux'
import { Switch } from 'zent';
import moment from 'moment-timezone'
import { timeFromInt } from 'time-number';
moment.tz.setDefault('Asia/Singapore');


TopBarProgress.config({
    barColors: {
        "0": "#be1c1c",
        "0.5": "#be1c1c",
        "1.0": "#be1c1c"
    },
    shadowBlur: 1
});



const PageViewCategoryItem = ({ location, match, createMenuItem, items, createItem, updateImage, viewItemAddOn, createNewAddOn, removeItemViewAddOn, itemAddOn, uploadMenuImage, viewCategoryItem, viewSingleCategory, viewOneCategory, uploadBranchCategoryItem, bulkCreateMenuItem, removeMenuItem, updateCategoryItemImage, updateMenuItem, updateItemInStore }) => {
    let history = useHistory();
    let dispatch = useDispatch();
    const mounted = useRef();
    const childRef = useRef();
    const childRef1 = useRef();

    const itemAddOnChild = useRef();
    const { name, branchName } = location.state;
    const [AllItems, setCategoryItems] = useState([]);
    const [isUploaded, setIsUploaded] = useState(true);
    const [isAdded, setIsAdded] = useState(false);

    const [categoryName, setCategoryName] = useState(null);
    const [itemName, setItemName] = useState(null);
    const [itemID, setItemID] = useState(null);
    const [selected, setSelected] = useState(0);

    const [itemPrice, setItemPrice] = useState(null);
    const [addOnModal, setAddOnModal] = useState(false);
    const [isUpdated, setIsUpdated] = useState(false);
    const [deleteMenuItem, setDeleteMenuItem] = useState(false);
    const [objectVal, setData] = useState(null);
    const [updateItemData, setUpdateItem] = useState(null);
    const [deleteMenu, setDeleteMenu] = useState(false);
    const [availableMenu, setAvailableMenu] = useState(false);
    const [item, setItem] = useState(null);


    const [values, setValues] = useState({
        loading: true,
        visible: false,
        csvVisible: false,
        updateCatgeoryItemVisible: false
    });

    const historyGoBack = () => {
        dispatch({ type: 'CLEAR_BRANCHE_CATEGORY_ITEM' })
        history.goBack();
    };

    const openModal = () => {
        setValues({ visible: true });
    }

    const openImportCategoryItemModal = () => {
        setValues({ csvVisible: true });
    }


    const openDeleteMenuModal = (item) => {
        setDeleteMenuItem(true);
        setCategoryName(item.name);
        setItemID(item.id);
    }

    const removeSingleCategoryItem = () => {
        setDeleteMenuItem(false);
        removeMenuItem(itemID);
        setTimeout(() => {
            viewCategoryItem(match.params.id, selected)
        }, 300);
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
        childRef1.current.hanldeClearForm();

    });

    const handleChangeInSotre = (checked) => {
        // setToggleChecked(checked)
    }

    const getOneCategoryItems = () => {
        viewOneCategory(match.params.id, match.params.branch);
    }
    const setBranchCategoryName = () => {
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
        setIsUploaded(false)
        setIsAdded(true);
        let data = {
            name: itemName,
            price: itemPrice,
            in_store: 1,
            photo: {
                url: imageFile
            }
        }
        createMenuItem(data, match.params.id);
        childRef1.current.hanldeClearForm();
       
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
                data.in_store = in_store;
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


    const updateCategoryInStore = (listValue, index) => {
        setAvailableMenu(true)
        setItem(listValue)
    }

    const closeAvailableMenu = () => {
        setAvailableMenu(false);
    }


    const handleAvailabilityMenu = () => {
        let in_store = item.in_store == 1 ? 0 : 1;
        setAvailableMenu(false);
        updateItemInStore(item.id, in_store);
        setTimeout(() => {
            viewCategoryItem(match.params.id, selected)
        }, 500)
    }


    useEffect(() => {
        if (!mounted.current) {
            // do componentDidMount logic
            dispatch({ type: 'CLEAR_ITEM' });
            dispatch({ type: 'CLEAR_CHOOSE_ITEM' })
            dispatch({ type: 'CLEAR_SPECIAL_REQUEST' })
            if (items.length === 0) viewCategoryItem(match.params.id, selected)

            setTimeout(() => {
                setValues({ loading: false });
            }, 400);
            mounted.current = true;
        } else {
            // do componentDidUpdate logic
            if (items.length > 0) setCategoryItems(items[0].items);
            if (createItem.err == 24) {
                Alert.warning(createItem.message)
                dispatch({ type: 'CLEAR_ITEM' });
            }
            if (createItem.err == 0 && isAdded) {
                dispatch({ type: 'CLEAR_ITEM' });
                Alert.success("Item Added Successfully")
                viewCategoryItem(match.params.id, selected)
                setIsAdded(false);
            }
            if (createItem.err == 22) {
                Alert.success(createItem.message)
                dispatch({ type: 'CLEAR_ITEM' });
            }
            if (uploadMenuImage.length > 0 && isUploaded) createBranchMenuItem(uploadMenuImage[0].image)
            if (updateImage.length > 0 && isUpdated) {
                handleUpdateImage(updateImage[0].image)
            }
        }



    }, [updateImage, viewSingleCategory.length, AllItems.length, items.length, createItem, itemAddOn.length, uploadMenuImage, mounted.current]);


    return (

        <div className="dashboard-main-wrapper">
            <Header />
            {values.loading ? <TopBarProgress /> : false}
            <SideNav loading={values.loading} store={true} />
            <div className="dashboard-wrapper">
                <Modal visible={values.csvVisible} width="400" height="300" effect="fadeInUp" onClickAway={closeImportCategoryItemModal}>
                    <ImportCSVCategoryItem ref={childRef} exportModal={exportModal} closeModal={closeImportCategoryItemModal} />
                </Modal>
                <Modal visible={values.visible} width="400" height="450" effect="fadeInUp" onClickAway={closeModal}>
                    <CreateCategoryItem ref={childRef1} onSubmit={onSubmit} closeModal={closeModal} />
                </Modal>
                <Modal visible={values.updateCatgeoryItemVisible} width="400" height="400" effect="fadeInUp" onClickAway={closeUpdateCategoryItemModal}>
                    <UpdateCategoryItem onSubmit={handleUpdateSingleItem} ref={childRef} closeModal={closeUpdateCategoryItemModal} />
                </Modal>
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
                                                    <th>Availability</th>
                                                    <th>Create Date</th>
                                                    <th>Update Date</th>
                                                    <th>In Store</th>
                                                    <th>Action</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                {items[0].items.map((listValue, index) => {
                                                    return (
                                                        <tr key={index}>
                                                            <td>
                                                                {index + 1}
                                                            </td>

                                                            <td>
                                                                <div class="m-r-10">{!listValue.photo.url ? <Avatar square size={50} name={"NA"} src={"A"} /> : <img src={listValue.photo.url} alt="item_image" width="50" />}</div>
                                                            </td>
                                                            <td>
                                                                <Link to={{ pathname: `/stores/view/item/${listValue.id}`, state: { name: listValue.name, categoryName: name } }} className="redirect-item">{listValue.name}</Link>
                                                            </td>
                                                            <td>

                                                                RM {listValue.price}
                                                            </td>
                                                            <td>
                                                                {
                                                                    listValue.in_store === 1 ? <span class="badge badge-success">In-Store</span> : <span class="badge badge-danger">Sold-Out</span>
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

                                            {!values.loading && AllItems.length === 0 ? <div>
                                                <img className="logo-img" style={{ width: 180, marginTop: 10 }} src="../assets/images/no_data_found.svg" alt="no_data_found" />
                                                <p>No Menu Item Available</p>
                                            </div> : null}

                                        </div>}
                                    {items.length > 0 ? <ReactPaginate
                                        previousLabel={<i class="fas fa-arrow-left"></i>}
                                        nextLabel={<i class="fas fa-arrow-right"></i>}
                                        breakLabel={'...'}
                                        breakClassName={'break-me'}
                                        pageCount={Math.ceil(AllItems.length / items[0].count)}
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


const mapStateToProps = ({ viewSingleCategory, items, createItem, uploadMenuImage, itemAddOn, updateImage }) => {
    return { viewSingleCategory, items, createItem, uploadMenuImage, itemAddOn, updateImage };
};

export default connect(mapStateToProps, { createMenuItem, viewCategoryItem, viewOneCategory, uploadBranchCategoryItem, viewItemAddOn, createNewAddOn, removeItemViewAddOn, bulkCreateMenuItem, removeMenuItem, updateCategoryItemImage, updateMenuItem, updateItemInStore })(PageViewCategoryItem);

