import React, { useEffect, useState, useCallback, useRef } from 'react';
import SideNav from '../../components/SideNav/SideNav';
import Header from '../../components/Header/Header';
import TopBarProgress from "react-topbar-progress-indicator";
import ReactPaginate from 'react-paginate';
import Modal from 'react-awesome-modal';
import { useHistory } from 'react-router-dom'
import CreateCategoryItem from '../../components/CreateCategoryItem/CreateCategoryItem';
import ViewAddOn from '../../components/ViewAddOn/ViewAddOn';

import { connect } from 'react-redux';
import { createMenuItem, viewCategoryItem, viewOneCategory, uploadBranchCategoryItem, viewItemAddOn, createNewAddOn, bulkCreateMenuItem } from '../../actions'
import Moment from 'react-moment';
import Skeleton, { SkeletonTheme } from 'react-loading-skeleton';
import { BlockLoading, Dialog, Button, Input, Checkbox } from 'zent';
import ImportCSVCategoryItem from '../../components/ImportCSVCategoryItem/ImportCSVCategoryItem';
const { openDialog, closeDialog } = Dialog;
import Avatar from 'react-avatar';


TopBarProgress.config({
    barColors: {
        "0": "#be1c1c",
        "0.5": "#be1c1c",
        "1.0": "#be1c1c"
    },
    shadowBlur: 1
});



const PageViewCategoryItem = ({ location, match, createMenuItem, items, viewItemAddOn, createNewAddOn, itemAddOn, uploadMenuImage, viewCategoryItem, viewSingleCategory, viewOneCategory, uploadBranchCategoryItem, bulkCreateMenuItem }) => {
    let history = useHistory();
    const childRef = useRef();
    const itemAddOnChild = useRef();
    const { name } = location.state;
    const [AllItems, setCategoryItems] = useState([]);
    const [isUploaded, setIsUploaded] = useState(true);
    const [categoryName, setCategoryName] = useState(null);
    const [itemName, setItemName] = useState(null);
    const [itemID, setItemID] = useState(null);

    const [itemPrice, setItemPrice] = useState(null);
    const [branchName, setBranchName] = useState(null);
    const [addOnModal, setAddOnModal] = useState(false);
    const [addOnDialog, setAddOnDialog] = useState(false);

    const [values, setValues] = useState({
        loading: true,
        visible: false,
        csvVisible: false
    });

    const historyGoBack = () => {
        history.goBack();
    };

    const openModal = () => {
        setValues({ visible: true });
    }

    const openViewAddOnModal = (id) => {
        setItemID(id);
        viewItemAddOn(id);
        setAddOnModal(true);
    }

    const openImportCategoryItemModal = () => {
        setValues({ csvVisible: true });
    }

    const closeImportCategoryItemModal = useCallback(() => {
        setValues({ csvVisible: false })
        childRef.current.removeFile();

    });

    const exportModal = useCallback(() => {
        let items = childRef.current.exportItems();
        bulkCreateMenuItem(items, match.params.id)
        setTimeout(() => {
            setValues({ csvVisible: false });
            viewCategoryItem(match.params.id)
        }, 1600)
    });


    const closeAddOnModal = useCallback(() => {
        setAddOnModal(false);
        itemAddOnChild.current.handleClearForm();

    });

    const triggerDialog = (id) => {
        setItemID(id);
        setAddOnDialog(true);
    };

    const handleAddNewAddOn = () => {
        console.log("Item: ", itemID)
        createNewAddOn({ name: itemName }, itemID)
        setAddOnDialog(false);

    }

    const handleUpdateItemName = e => {
        setItemName(e.target.value);
        console.log(e.target.value)
    };



    const closeModal = useCallback(() => {
        setValues({ visible: false })
        setIsUploaded(true)
        childRef.current.hanldeClearForm();

    });


    const getOneCategoryItems = () => {
        viewOneCategory(match.params.id, match.params.branch);
    }
    const setBranchCategoryName = () => {
        let { result } = viewSingleCategory;
        console.log("result result: ", result)
        setBranchName(result.name)
        setCategoryName(result.categories[0].name)
        viewAllCategoryItem();
    }
    const viewAllCategoryItem = () => {
        viewCategoryItem(match.params.id)
    }
    const onSubmit = useCallback(
        (data) => {
            const imageFile = childRef.current.hanldeUploadImage();
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
            console.log("ITEMDID", itemID)
            setAddOnDialog(false);
            console.log(data);
            //createNewAddOn({ name: itemName }, itemID)

        }
    );

    const createBranchMenuItem = () => {
        let itemInSotre = childRef.current.handleItemInSotre();
        setIsUploaded(false)
        let data = {
            name: itemName,
            price: itemPrice,
            in_store: itemInSotre,
            photo: {
                url: uploadMenuImage.image
            }
        }
        console.log(data);
        childRef.current.hanldeClearForm();
        createMenuItem(data, match.params.id)
    }

    const handlePageClick = data => {
        let selected = data.selected;
        let offset = Math.ceil(selected * 12);

        // this.setState({ offset: offset }, () => {
        //   this.loadCommentsFromServer();
        // });
    };

    useEffect(() => {
        console.log("items: ", items);
        setTimeout(() => {
            if (itemAddOn.length > 0) itemAddOnChild.current.handleApi(itemAddOn);
        }, 200)
        if (viewSingleCategory.err === 0) setBranchCategoryName();
        if (items.length > 0) setCategoryItems(items);
        if (uploadMenuImage.err === 0 && isUploaded) return createBranchMenuItem();
        setTimeout(() => {
            setValues({ loading: false });
            getOneCategoryItems();
        }, 400);
    }, [viewSingleCategory.length, items.length, itemAddOn.length, uploadMenuImage.length]);


    return (

        <div className="dashboard-main-wrapper">
            <Header />
            {values.loading ? <TopBarProgress /> : false}
            <SideNav loading={values.loading} store={true} />
            <div className="dashboard-wrapper">
                <Modal visible={values.csvVisible} width="400" height="300" effect="fadeInUp" onClickAway={closeImportCategoryItemModal}>
                    <ImportCSVCategoryItem ref={childRef} exportModal={exportModal} closeModal={closeImportCategoryItemModal} />
                </Modal>
                <Modal visible={values.visible} width="400" height="560" effect="fadeInUp" onClickAway={closeModal}>
                    <CreateCategoryItem ref={childRef} onSubmit={onSubmit} closeModal={closeModal} />
                </Modal>
                <Dialog title="New Add On" visible={addOnModal} onClose={closeAddOnModal}>
                    <ViewAddOn ref={itemAddOnChild} onSubmit={onSubmitAddOn} closeModal={closeAddOnModal} />
                </Dialog>
                <Dialog
                    visible={addOnDialog}
                    onClose={() => setAddOnDialog(false)}
                    title="New Add On"
                >
                    <div>
                        <Input placeholder="Item Name" onChange={handleUpdateItemName} value={itemName} showClear />
                    </div>
                    <div style={{ marginTop: 20 }}>
                        <Button onClick={() => handleAddNewAddOn()} type="primary">Save</Button>
                        <Button onClick={() => setAddOnDialog(false)} type="danger">Close</Button>
                    </div>
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
                                                                <SkeletonTheme color="#efeff6" highlightColor="#fff">
                                                                    {
                                                                        values.loading ? <Skeleton width={10} height={10} count={1} /> : index + 1
                                                                    }
                                                                </SkeletonTheme>
                                                            </td>

                                                            <td>
                                                                <SkeletonTheme color="#efeff6" highlightColor="#fff">
                                                                    {
                                                                        values.loading ? <Skeleton width={35} height={35} count={1} /> : <div class="m-r-10">{!listValue.photo.url ? <Avatar square size={50} name={"NA"} src={"A"} /> : <img src={listValue.photo.url} alt="item_image" width="50" />}</div>
                                                                    }
                                                                </SkeletonTheme>
                                                            </td>
                                                            <td>
                                                                <SkeletonTheme color="#efeff6" highlightColor="#fff">
                                                                    {
                                                                        values.loading ? <Skeleton width={150} height={10} count={1} /> : listValue.name
                                                                    }
                                                                </SkeletonTheme>
                                                            </td>
                                                            <td>

                                                                <SkeletonTheme color="#efeff6" highlightColor="#fff">
                                                                    RM {
                                                                        values.loading ? <Skeleton width={100} height={10} count={1} /> : listValue.price

                                                                    }
                                                                </SkeletonTheme>
                                                            </td>
                                                            <td>
                                                                <SkeletonTheme color="#efeff6" highlightColor="#fff">
                                                                    {
                                                                        values.loading ? <Skeleton width={100} height={10} count={1} /> : listValue.in_store === 1 ? <span class="badge badge-success">Available</span> : <span class="badge badge-danger">Unavailable</span>

                                                                    }
                                                                </SkeletonTheme>

                                                            </td>

                                                            <td>
                                                                <SkeletonTheme color="#efeff6" highlightColor="#fff">
                                                                    {
                                                                        values.loading ? <Skeleton width={150} height={10} count={1} /> : <Moment format="YYYY-MM-DD HH:mm a">
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
                                                                <button onClick={() => openViewAddOnModal(listValue.id)} > <span style={{ fontSize: 12 }} class="badge badge-info">View</span></button>
                                                            </td>
                                                            <td>
                                                                <div className="dropdown float-right">
                                                                    <a href="#" className="dropdown-toggle card-drop" data-toggle="dropdown" aria-expanded="true">
                                                                        <i className="mdi mdi-dots-vertical"></i>
                                                                    </a>
                                                                    <div className="dropdown-menu dropdown-menu-right">
                                                                        <span className="dropdown-item"><i color="#000" className="far fa-edit"></i>  Modify {listValue.name}</span>
                                                                        <span className="dropdown-item"><i color="#000" class="far fa-trash-alt"></i>  Delete Item</span>
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
                                        pageCount={items.length / 50}
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


const mapStateToProps = ({ viewSingleCategory, items, uploadMenuImage, itemAddOn }) => {
    return { viewSingleCategory, items, uploadMenuImage, itemAddOn };
};

export default connect(mapStateToProps, { createMenuItem, viewCategoryItem, viewOneCategory, uploadBranchCategoryItem, viewItemAddOn, createNewAddOn, bulkCreateMenuItem })(PageViewCategoryItem);

