import React, { useState, useEffect, forwardRef, useImperativeHandle } from 'react';
import { Line } from 'rc-progress';
import { Icon, BlockLoading } from 'zent';
import { Button } from 'evergreen-ui';
import ReactPaginate from 'react-paginate';
import { Switch } from 'zent';
import moment from 'moment-timezone'
moment.tz.setDefault('Asia/Singapore');


const ViewAddOn = forwardRef(({ items, loading, openAddOnModal, openUpdateAddOnModal, openCSVAddOnModal, openDeleteAddOnModal, setAddOnItem, updateAddOnStatus}, ref) => {

    const [selected, setSelected] = useState(null);

    const [values, setValues] = useState({
        isValid: "",
    });
    const handleCheckedAddOn = (e) => {
        //setAddOns(checkedList);
    }

    useImperativeHandle(ref, () => ({
        handleClearForm() {
            setValues({ isValid: 'is-valid' });
            setLoading(true);
        },
        cleanForm() {
            document.getElementById("item_name").value = null;
            document.getElementById("item_price").value = null;
        },
        handleLoadingNewItem() {
            setLoading(true);
        },
    }));

    const handleAddOnModal = (list) => {
        setAddOnItem(list);
        openUpdateAddOnModal(true);
    }

    const handleNewItem = () => {
        openAddOnModal(true);
    }

    const handleOpenCSVModal = () => {
        openCSVAddOnModal(true);
    }

 

    const handlePageClick = data => {
        let selected = data.selected;
        setSelected(selected);
        onChnagePage(data.selected);
    };

    useEffect(() => {
    }, [items.length, loading.length])

    return (
        <div style={{ height: "80%" }}>
            <div class="card-header">
                <h5 class="mb-0">
                    <div class="section-block">
                        <button onClick={handleNewItem} disabled={loading} style={{ marginLeft: 10 }} className="btn btn-info float-right"><i className="fab fa-fw fas fa-plus"></i> New Item</button>
                        <button disabled={loading} onClick={handleOpenCSVModal} className="btn btn-success float-right"><i color="#FFF" className="fas fa-file-medical"></i> Import Csv</button>
                    </div>
                </h5>
                <h3 className="section-title">My Active Add Ons</h3>
            </div>
            {loading && items.length > 0 ? <BlockLoading loading={loading} icon="circle" iconSize={64} iconText="Loading" /> : <div>
                {items.length > 0 ? <div className="card-body">
                    <table className="table">
                        <thead>
                            <tr>
                                <th className="">No.</th>
                                <th className="">Name</th>
                                <th className="">Price</th>
                                <th className="">Status</th>
                                <th>Create Date</th>
                                <th>Update Date</th>
                                <th className="">Sync</th>
                                <th className="">Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {items[0].addOns.map((item, index) => {
                                return (
                                    <tr key={index}>
                                        <td>
                                            {index + 1}
                                        </td>
                                        <td>
                                            {item.name}
                                        </td>
                                        <td>
                                            RM {item.price}
                                        </td>
                                        <td>
                                            {item.isAvailable === 1 ? <span class="badge badge-success">Active</span> : <span class="badge badge-danger">Disabled</span>}
                                        </td>
                                        {/* <td>
                                            <Button type="button" onClick={() => onSubmitDeleteAddOn(item.id)}><Icon size={30} type="remove-o" /></Button>
                                        </td> */}
                                        <td>
                                            {moment.utc(item.createDate, "YYYY-MM-DD").local().format('YYYY-MM-DD')}
                                        </td>
                                        <td>
                                            {item.updateDate ? moment(item.updateDate).format('YYYY-MM-DD') : 'N/A'}
                                        </td>
                                        <td>
                                            <Switch
                                                checked={item.isAvailable}
                                                onChange={() => updateAddOnStatus(item, index)}
                                            />
                                        </td>
                                        <td>
                                            <div className="dropdown float-right">
                                                <a href="#" className="dropdown-toggle card-drop" data-toggle="dropdown" aria-expanded="true">
                                                    <i className="mdi mdi-dots-vertical"></i>
                                                </a>
                                                <div className="dropdown-menu dropdown-menu-right">
                                                    <span onClick={() => handleAddOnModal(item)} className="dropdown-item"><i color="#000" className="far fa-edit"></i>  Modify {item.name}</span>
                                                    <span onClick={() => openDeleteAddOnModal(item)} className="dropdown-item"><i color="#000" class="far fa-trash-alt"></i>  Delete Item</span>
                                                </div>
                                            </div>
                                        </td>
                                    </tr>
                                );
                            })}
                        </tbody>
                    </table>
                </div> : <div class="col-12 d-flex justify-content-center">
                        {items.length === 0 ? <div>
                            <img className="logo-img" style={{ width: 180, marginTop: 10 }} src="../assets/images/no_data_found.svg" alt="no_data_found" />
                            <p>No Available AddOn</p>
                        </div> : null}

                    </div>}
                <div style={{ marginLeft: 20 }}>
                    {items.length > 0 ? <ReactPaginate
                        previousLabel={<i className="fas fa-arrow-left"></i>}
                        nextLabel={<i className="fas fa-arrow-right"></i>}
                        breakLabel={'...'}
                        breakClassName={'break-me'}
                        pageCount={Math.ceil(items[0].addOns.length / items[0].count)}
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
            }
        </div>

    )
});

export default ViewAddOn;