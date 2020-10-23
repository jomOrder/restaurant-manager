import React, { useEffect, useState, useCallback, useRef } from 'react';
import SideNav from '../../components/SideNav/SideNav';
import Header from '../../components/Header/Header';
import TopBarProgress from "react-topbar-progress-indicator";
import ReactPaginate from 'react-paginate';
import Modal from 'react-awesome-modal';
import { useHistory } from 'react-router-dom'
import { Alert } from 'rsuite';
import { connect } from 'react-redux';
import { viewAllItem, viewSpecialRequestItem, createSpeicalRequestItem, updateSpecialRequestItem, deleteSpeicalRequestItem, createItem, updateItem, deleteItem } from '../../actions'
import { useDispatch } from 'react-redux'
import 'antd/dist/antd.css';
import { Tabs } from 'antd';
import ChooseRequiredItem from '../../components/ChooseItem/ChooseRquiredItem';
import SpecialRequest from '../../components/SpecialRequest/SpecialRequest';
import CreateSpecialRequest from '../../components/SpecialRequestComp/CreateSpecialRequest';
import UpdateSpecialRequest from '../../components/SpecialRequestComp/UpdateSpecialRequest';
import CreateChooseItem from '../../components/ChooseItemComp/CreateChooseItem';
import UpdateChooseItem from '../../components/ChooseItemComp/UpdateChooseItem';
import DeleteChooseItem from '../../components/ChooseItemComp/DeleteChooseItem';
import DeleteSpecialRequest from '../../components/SpecialRequestComp/DeleteSpecialRequest';
const { TabPane } = Tabs;

TopBarProgress.config({
    barColors: {
        "0": "#be1c1c",
        "0.5": "#be1c1c",
        "1.0": "#be1c1c"
    },
    shadowBlur: 1
});

const PageChooseSpecial = ({ location, match, chooseItem, viewItem, viewAllItem, viewSpecialRequest, specialRequest, viewSpecialRequestItem, createSpeicalRequestItem, updateSpecialRequestItem, deleteSpeicalRequestItem, createItem, updateItem, deleteItem }) => {
    const { name, categoryName } = location.state;
    let history = useHistory();
    let dispatch = useDispatch();
    const createChoose = useRef();
    const updateChoose = useRef();
    const deleteChoose = useRef();
    const createSpecial = useRef();
    const updateSpecial = useRef();
    const deleteSpecial = useRef();

    const mounted = useRef();
    const [items, setItems] = useState([]);
    const [specialItem, setSpecialItem] = useState([]);

    const [chooseVisible, setChooseVisible] = useState(false);
    const [updateChooseVisible, setUpdateChooseVisible] = useState(false);
    const [deleteChooseVisible, setDeleteChooseVisible] = useState(false);
    const [itemName, setItemName] = useState(null);
    const [itemID, setItemID] = useState(null);

    const [chooseItemData, setChooseItemData] = useState([]);


    const [specialVisible, setSpcialVisible] = useState(false);
    const [updateSpecialVisible, setUpdateSpcialVisible] = useState(false);
    const [deleteSpcialVisible, setDeleteSpcialVisible] = useState(false);
    const [specialRequestData, setSpecialRequestData] = useState([]);

    const [values, setValues] = useState({
        loading: true,
        visible: false,
        csvVisible: false,
        updateCatgeoryItemVisible: false
    });

    const historyGoBack = () => {
        history.goBack();
    };

    /**
     * Special Request
     */

    const openSpcialModal = (newVal) => {
        setSpcialVisible(newVal);
    }

    const openUpdateSpecialModal = (newVal) => {
        setUpdateSpcialVisible(newVal);
    }

    const openDeleteSpecialModal = (list) => {
        removeSpecialRequest(list);
        setDeleteSpcialVisible(true);
    }
    

    const closeSpecialRequestModal = () => {
        setSpcialVisible(false);
    }

    const closeUpdateSpecialRequestModal = () => {
        setUpdateSpcialVisible(false);
    }

    const closeDeleteSpecialModal = () => {
        setDeleteSpcialVisible(false);
    }


    const onSubmitCreateSpecialRequest = useCallback((data) => {
        createSpeicalRequestItem(data, match.params.id);
        setSpcialVisible(false);
        createSpecial.current.hanldeClearForm();
        setTimeout(() => {
            viewSpecialRequestItem(match.params.id)
        }, 500)
    });

    const onSubmitUpdateSpecialRequest = useCallback((data) => {
        let id = updateSpecial.current.handleItemID();
        updateSpecialRequestItem(id, data);
        setUpdateSpcialVisible(false);
        setTimeout(() => {
            viewSpecialRequestItem(match.params.id)
        }, 500)
    });

    const onSubmitDeleteSpecialRequest = () => {
        let id = deleteSpecial.current.getItemID();
        deleteSpeicalRequestItem(id);
        setDeleteSpcialVisible(false);
        setTimeout(() => {
            viewSpecialRequestItem(match.params.id)
        }, 500)
    };

    const removeSpecialRequest = (list) => {
        setItemName(list.name);
        setItemID(list.id);
    }

    /**
     * Choose Item
     */

    const openChooseModal = (newVal) => {
        setChooseVisible(newVal);
    }
    const closeChooseModal = () => {
        setChooseVisible(false);
        createChoose.current.hanldeClearForm();
    }

    const openUpdateChooseModal = (newVal) => {
        setUpdateChooseVisible(newVal);
    }
    const closeUpdateChooseModal = () => {
        setUpdateChooseVisible(false);
    }

    const openDeleteChooseModal = (list) => {
        removeChooseItem(list);
        setDeleteChooseVisible(true);
    }
    const closeDeleteChooseModal = () => {
        setDeleteChooseVisible(false);
    }

    const onSubmitCreateChooseItem = useCallback((data) => {
        createItem(data, match.params.id);
        setChooseVisible(false);
        createChoose.current.hanldeClearForm();
        setTimeout(() => {
            viewAllItem(match.params.id)
        }, 500)
    });

    const onSubmitUpdateChooseItem = useCallback((data) => {
        let id = updateChoose.current.handleItemID();
        updateItem(id, data);
        setUpdateChooseVisible(false);
        setTimeout(() => {
            viewAllItem(match.params.id)
        }, 500)
    });

    const onSubmitDeleteChooseItem = () => {
        let id = deleteChoose.current.getItemID();
        deleteItem(id);
        setDeleteChooseVisible(false);
        setTimeout(() => {
            viewAllItem(match.params.id)
        }, 500)
    };

    const removeChooseItem = (list) => {
        setItemName(list.name);
        setItemID(list.id);

    }

    useEffect(() => {
        if (!mounted.current) {
            // do componentDidMount logic
            viewAllItem(match.params.id)
            viewSpecialRequestItem(match.params.id)
            setTimeout(() => {
                setValues({ loading: false });
            }, 400);
            mounted.current = true;
        } else {
            // do componentDidUpdate logic
            if (viewItem.length > 0) {
                setItems(viewItem[0].items)
            }
            if (viewSpecialRequest.length > 0) setSpecialItem(viewSpecialRequest[0].items)
            if (chooseItem.err == 19) {
                Alert.success("Item created successfully")
                dispatch({ type: 'CLEAR_CHOOSE' });
            }
            if (specialRequest.err == 19) {
                Alert.success("Item created successfully")
                dispatch({ type: 'CLEAR_SPECIAL' });
            }
            if (chooseItem.err == 21) {
                Alert.success(chooseItem.message)
                dispatch({ type: 'CLEAR_CHOOSE' });
            }
            if (specialRequest.err == 21) {
                Alert.success(specialRequest.message)
                dispatch({ type: 'CLEAR_SPECIAL' });
            }
        }

    }, [viewSpecialRequest, viewItem, chooseItem.length, specialRequest.length, mounted.current]);

    return (
        <div className="dashboard-main-wrapper">
            <Header />
            {values.loading ? <TopBarProgress /> : false}
            <SideNav loading={values.loading} store={true} />
            <Modal visible={specialVisible} width="400" height="200" effect="fadeInUp" onClickAway={closeSpecialRequestModal}>
                <CreateSpecialRequest ref={createSpecial} onSubmit={onSubmitCreateSpecialRequest} closeModal={closeSpecialRequestModal} />
            </Modal>
            <Modal visible={updateSpecialVisible} width="400" height="200" effect="fadeInUp" onClickAway={closeUpdateSpecialRequestModal}>
                <UpdateSpecialRequest item={specialRequestData} ref={updateSpecial} onSubmit={onSubmitUpdateSpecialRequest} closeModal={closeUpdateSpecialRequestModal} />
            </Modal>
            <DeleteSpecialRequest ref={deleteSpecial} itemID={itemID} itemName={itemName} onSubmit={onSubmitDeleteSpecialRequest} visible={deleteSpcialVisible} closeModel={closeDeleteSpecialModal}/>

            <Modal visible={chooseVisible} width="400" height="200" effect="fadeInUp" onClickAway={closeChooseModal}>
                <CreateChooseItem ref={createChoose} onSubmit={onSubmitCreateChooseItem} closeModal={closeChooseModal} />
            </Modal>
            <Modal visible={updateChooseVisible} width="400" height="200" effect="fadeInUp" onClickAway={closeUpdateChooseModal}>
                <UpdateChooseItem ref={updateChoose} item={chooseItemData} onSubmit={onSubmitUpdateChooseItem} closeModal={closeUpdateChooseModal} />
            </Modal>
            <DeleteChooseItem ref={deleteChoose} itemID={itemID} itemName={itemName} onSubmit={onSubmitDeleteChooseItem} visible={deleteChooseVisible} closeModel={closeDeleteChooseModal} />
            <div className="dashboard-wrapper">
                <div className="container-fluid dashboard-content">
                    <div class="row">
                        <div class="col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12">
                            <div class="page-header">
                                <h2 class="pageheader-title">{categoryName} - {name}</h2>
                                <div class="page-breadcrumb">
                                    <nav aria-label="breadcrumb">
                                        <ol class="breadcrumb">
                                            <li class="breadcrumb-item"><span class="breadcrumb-link">Dashboard</span></li>
                                            <li class="breadcrumb-item"><span class="breadcrumb-link">Stores</span></li>
                                            <li class="breadcrumb-item"><span class="breadcrumb-link">Category</span></li>
                                            <li class="breadcrumb-item"><span onClick={historyGoBack} class="breadcrumb-link">Items</span></li>
                                            <li class="breadcrumb-item active" aria-current="page">{name}</li>
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
                                <div style={{ marginLeft: 20 }}>
                                    <Tabs defaultActiveKey="1">
                                        <TabPane tab="Choose Item" key="1">
                                            <ChooseRequiredItem openDeleteChooseModal={openDeleteChooseModal} setChooseItemData={setChooseItemData} loading={values.loading} openChooseModal={openChooseModal} openUpdateChooseModal={openUpdateChooseModal} items={items} />
                                        </TabPane>
                                        <TabPane tab="Special Request" key="2">
                                            <SpecialRequest openDeleteSpecialModal={openDeleteSpecialModal} visible={specialVisible} openSpcialModal={openSpcialModal} setSpecialRequestData={setSpecialRequestData} openUpdateSpecialModal={openUpdateSpecialModal} items={specialItem} loading={values.loading} />
                                        </TabPane>
                                    </Tabs>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}


const mapStateToProps = ({ chooseItem, viewItem, viewSpecialRequest, specialRequest }) => {
    return { chooseItem, viewItem, viewSpecialRequest, specialRequest };
};

export default connect(mapStateToProps, { viewAllItem, viewSpecialRequestItem, createSpeicalRequestItem, updateSpecialRequestItem, deleteSpeicalRequestItem, createItem, updateItem, deleteItem })(PageChooseSpecial);

