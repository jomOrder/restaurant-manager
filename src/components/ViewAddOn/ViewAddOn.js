import React, { useState, useEffect, forwardRef, useImperativeHandle } from 'react';
import { Line } from 'rc-progress';
import { Checkbox, Button, ButtonGroup } from 'zent';

const CheckboxGroup = Checkbox.Group;
const ITEMS = ['Item 1', 'Item 2', 'Item 3'];


const ViewAddOn = forwardRef(({ closeModal }, ref) => {
    const [addOns, setAddOns] = useState([]);

    const handleCheckedAddOn = (checkedList) => {
        setAddOns(checkedList);
    }

    const handleCheckedAll = e => {
        let newCheckedList = e.target.checked ? ITEMS.slice() : [];
        setAddOns(newCheckedList);
    };

    useImperativeHandle(ref, () => ({
        
    }));

    const handleAddOnChanges = () => {

    }


    useEffect(() => {

    }, [])

    const checkedAll =
        !!addOns.length && addOns.length === ITEMS.length;
    const indeterminate =
        !!addOns.length && addOns.length !== ITEMS.length;

    return (
        <div>
            <div className="card" >
                <div className="card-header text-center"><span className="splash-description" style={{ textAlign: "left", fontSize: "1.2rem" }}>Burger AddOns</span></div>
                <div className="card-body" style={{ padding: "2.25rem" }}>
                    <div>
                        <Checkbox
                            checked={checkedAll}
                            indeterminate={indeterminate}
                            onChange={handleCheckedAll}
                        >
                            Select All
                    </Checkbox>

                        <div style={{ margin: '5px 0', height: 1, background: '#dcdee0' }} />

                        <CheckboxGroup
                            value={addOns}
                            onChange={handleCheckedAddOn}
                        >
                            {ITEMS.map(item => {
                                return (
                                    <Checkbox key={item} value={item}>
                                        {item}
                                    </Checkbox>
                                );
                            })}
                        </CheckboxGroup>
                    </div>

                </div>
                <div style={{margin: 20}}>
                    <Button onClick={handleAddOnChanges} type="primary">Save</Button>
                    <Button onClick={closeModal} type="danger">Close</Button>
                </div>
            </div>
        </div>
    )
});
export default ViewAddOn;