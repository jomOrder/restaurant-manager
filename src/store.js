import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import reducer from './reducers';
export default function configureStore(initialState={}) {
    return createStore(
        reducer,
        initialState,
        applyMiddleware(thunk)
    );
}


const hello = () => {
    return {
        type: "",
        payload: {
            name,
            ahm
        }
    }
}