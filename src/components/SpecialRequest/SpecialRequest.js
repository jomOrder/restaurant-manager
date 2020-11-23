import React, { useState, useEffect, forwardRef, useImperativeHandle } from 'react';
import { BlockLoading } from 'zent';
import ReactPaginate from 'react-paginate';
import moment from 'moment-timezone'
import { Switch } from 'zent';
moment.tz.setDefault('Asia/Singapore');

const SpecialRequest = forwardRef(({ items, loading, visible, openSpcialModal, openUpdateSpecialModal, setSpecialRequestData, openDeleteSpecialModal, updateSpecialStatus, openCSVSpecialModal }, ref) => {

    const handlePageClick = data => {
        let selected = data.selected;
        setSelected(selected)
    };

    const handleUpdateSpecialModal = (list) => {
        setSpecialRequestData(list);
        openUpdateSpecialModal(true);
    }

    const handleNewItem = () => {
        openSpcialModal(true);
    }

    const handleOpenCSV = () => {
        openCSVSpecialModal(true);
    }

    useEffect(() => {

    }, [items.length]);
    return (
        <div>
            <div class="card-header">
                <h5 class="mb-0">
                    <div class="section-block">
                        <button onClick={handleNewItem} disabled={loading} style={{ marginLeft: 10 }} className="btn btn-info float-right"><i className="fab fa-fw fas fa-plus"></i> New Item</button>
                        <button disabled={loading} onClick={handleOpenCSV} className="btn btn-success float-right"><i color="#FFF" className="fas fa-file-medical"></i> Import Csv</button>
                    </div>
                </h5>
                <h3 className="section-title">My Active Special Request</h3>
            </div>
            <div class="card-body">
                {!loading && items.length > 0 ? <div class="campaign-table table-responsive">
                    <table class="table" style={{ width: "100%", marginBottom: "15px" }}>
                        <thead>
                            <tr>
                                <th>No.</th>
                                <th>Name</th>
                                <th>Create Date</th>
                                <th>Update Date</th>
                                <th>Sync</th>
                                <th>Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {items.map((listValue, index) => {
                                return (
                                    <tr key={index}>
                                        <td>
                                            {index + 1}
                                        </td>
                                        <td>
                                            <div class="m-r-10">{listValue.name}</div>
                                        </td>
                                        <td>
                                            {moment.utc(listValue.createDate, "YYYY-MM-DD").local().format('YYYY-MM-DD')}
                                        </td>
                                        <td>
                                            {listValue.updateDate ? moment(listValue.updateDate).format('YYYY-MM-DD') : 'N/A'}
                                        </td>
                                        <td>
                                            <Switch
                                                checked={listValue.isAvailable}
                                                onChange={() => updateSpecialStatus(listValue, index)}
                                            />
                                        </td>
                                        <td>
                                            <div className="dropdown float-right">
                                                <a href="#" className="dropdown-toggle card-drop" data-toggle="dropdown" aria-expanded="true">
                                                    <i className="mdi mdi-dots-vertical"></i>
                                                </a>
                                                <div className="dropdown-menu dropdown-menu-right">
                                                    <span onClick={() => handleUpdateSpecialModal(listValue)} className="dropdown-item"><i color="#000" className="far fa-edit"></i>  Modify {listValue.name}</span>
                                                    <span onClick={() => openDeleteSpecialModal(listValue)} className="dropdown-item"><i color="#000" class="far fa-trash-alt"></i>  Delete Item</span>
                                                </div>
                                            </div>
                                        </td>
                                    </tr>
                                );
                            })}
                        </tbody>
                    </table>
                </div> : <div class="col-12 d-flex justify-content-center">
                        <BlockLoading loading={loading} icon="circle" iconSize={64} iconText="Loading" />
                        {!loading && items.length === 0 && <div>
                            <img className="logo-img" style={{ width: 180, marginTop: 10 }} src="../assets/images/no_data_found.svg" alt="no_data_found" />
                            <p>No Special Item Available</p>
                        </div>}

                    </div>}
            </div>
        </div>
    )
});


export default SpecialRequest;