//file tổng hợp, gom lại tất cả ruducer

import appReducer from './appReducer';
import { combineReducers } from 'redux'; //gom các reducers lại

const rootReducer = combineReducers({
    app: appReducer,
});

export default rootReducer;
