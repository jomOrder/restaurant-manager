import API from '../services/API';


export const FETCH_TRANSACTIONS = 'FETCH_TRANSACTIONS';
export const FETCH_TRANSACTIONS_NOT_FOUND = 'FETCH_TRANSACTIONS_NOT_FOUND';



export const viewBranchTransaction = (branchID, pageNo) => async dispatch => {
    const response = await API.viewTransactions(branchID, pageNo);
    const { data } = response;
    const { result, err } = data;
    if (err === 0) dispatch({
        type: FETCH_TRANSACTIONS,
        payload: result[0].transactions
    });
    if (err === 25) dispatch({
        type: FETCH_TRANSACTIONS_NOT_FOUND,
        payload: { err: 25 }
    });
}