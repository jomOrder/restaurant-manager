import React, { useState, useEffect, forwardRef, useImperativeHandle, useRef } from 'react';
import { Dialog, Button } from 'zent';

const DeleteSpecialRequest = forwardRef(({ closeModel, item, visible, itemName, itemID, onSubmit }, ref) => {
    let mounted = useRef();
    const [values, setValues] = useState({
        isValid: false,
    });

    useImperativeHandle(ref, () => ({
        getItemID() {
            return itemID;
        }
    }));

    useEffect(() => {
        if (!mounted.current) {
            // do componentDidMount logic
            mounted.current = true;
        } else {
            // do componentDidUpdate logic
            // setItemID(item.id);
        }
    }, [item, mounted.current])

    return (
        <Dialog title="Delete Menu Item" visible={visible} onClose={closeModel}>
            <div style={{ marginBottom: 20 }}>
                <span>Are you sure want to remove {itemName} ?</span>
            </div>
            <Button type="danger" onClick={onSubmit}>
                Delete
            </Button>
            <Button type="primary" onClick={closeModel}>
                Close
            </Button>
        </Dialog>
    )
});
export default DeleteSpecialRequest;

