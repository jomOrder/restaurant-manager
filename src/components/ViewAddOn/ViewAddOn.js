import React, { useState, useEffect, forwardRef, useImperativeHandle } from 'react';
import { Line } from 'rc-progress';
import { Icon, BlockLoading } from 'zent';
import { useForm } from 'react-hook-form';
import { Button } from 'evergreen-ui';
import ReactPaginate from 'react-paginate';

const ViewAddOn = forwardRef(({ onSubmit, closeModal }, ref) => {
    const { errors, register, handleSubmit } = useForm();

    const [items, setItems] = useState([]);
    const [loading, setLoading] = useState(true);
    const [values, setValues] = useState({
        isValid: "",
    });
    const handleCheckedAddOn = (e) => {
        console.log(e.target.value);
        //setAddOns(checkedList);
    }

    useImperativeHandle(ref, () => ({
        handleApi(items) {
            setItems(items)
            setTimeout(() => {
                setLoading(false);
            }, 500)

        },
        handleClearForm() {
            setValues({ isValid: 'is-valid' });
            setItems([]);
            setLoading(true);
        }
    }));


    const handlePageClick = data => {
        let selected = data.selected;
        let offset = Math.ceil(selected * 12);
        // this.setState({ offset: offset }, () => {
        //   this.loadCommentsFromServer();
        // });
    };

    useEffect(() => {
        console.log("items: ", items);
    }, [items.length])

    return (
        <div style={{ height: "80%" }}>

            <form onSubmit={handleSubmit(onSubmit)}>
                <div className="form-group">
                    <input className={"form-control form-control-lg " + (errors.name ? 'is-invalid' : values.isValid)} ref={register({ required: true })} type="text" name="name" placeholder="Item Name" autoComplete="off" />
                    <div className="invalid-feedback">
                        {errors.name && 'Name is required.'}
                    </div>
                </div>

                {loading && items.length > 0 ? <BlockLoading loading={loading} icon="circle" iconSize={64} iconText="Loading" /> : <div>

                    <div className="card">

                        {items.length > 0 ? <div className="card-body">
                            <table className="table">
                                <thead>
                                    <tr>
                                        <th className="">No.</th>
                                        <th className="">Name</th>
                                        <th className="">Price</th>
                                        <th className="">Status</th>
                                        <th className="">Remove</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {items.map((item, index) => {
                                        return (
                                            <tr key={index}>
                                                <td>
                                                    {index + 1}
                                                </td>
                                                <td>
                                                    {item.name}
                                                </td>
                                                <td>
                                                    {item.price}
                                                </td>
                                                <td>
                                                    {item.status === 0 ? <span class="badge badge-success">Active</span> : <span class="badge badge-danger">Disabled</span>}
                                                </td>
                                                <td>
                                                    <Button type="button" onClick={() => { console.log("Hello") }}><Icon size={30} type="remove-o" /></Button>
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
                                pageCount={items.length / 10}
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


                </div>}
                <div className="form-group">
                    <button style={{ marginTop: 30, marginRight: 10 }} type="submit" className="btn btn-primary">Save</button>
                    <button style={{ marginTop: 30, marginRight: 10 }} onClick={closeModal} className="btn btn-danger">Close</button>
                </div>
            </form>

        </div>

    )
});

export default ViewAddOn;