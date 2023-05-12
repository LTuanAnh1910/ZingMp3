//lưu các state, là các biến liên quan đến app
import actionTypes from '../actions/actionTypes';

const initState = {
    homeData: [],
    test: 'hello world',
};

const appReducer = (state = initState, action) => {
    switch (action.type) {
        case actionTypes.GET_HOME:
            return state;

        default:
            return state;
    }
};

export default appReducer;
