export default (state = [], action) => {
    switch(action.type) {
        case 'FETCH_BRANCHES':
            return action.payload;
        default:
            return state;
    }
}