import rootReducer from './store/reducers/rootReducer';
import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import { persistStore } from 'redux-persist';

const reduxConfig = () => {
    const store = createStore(rootReducer, applyMiddleware(thunk));
    const persistor = persistStore(store);

    return { persistor, store };
};

export default reduxConfig;
