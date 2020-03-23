export default (state = [], action) => {
    switch(action.type) {
        case 'FETCH_MERCHANTS':
            return action.payload;
        default:
            return state;
    }
}