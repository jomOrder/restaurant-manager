import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import reducers from './reducers';
import { syncHistoryWithStore, routerReducer } from 'react-router-redux'

export default function configureStore(initialState={}) {
    return createStore(
        reducers,
        initialState,
        applyMiddleware(thunk)
    );
}
