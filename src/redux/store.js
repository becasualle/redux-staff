import { createStore, applyMiddleware } from "redux";
import thunk from "redux-thunk";

const initialState = {
    muffins: [],
};

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case 'muffins/like':
            const { id } = action.payload;
            const temp = state.muffins.map(muffin => {
                if (muffin.id === id) {
                    return { ...muffin, likes: muffin.likes + 1 }
                }
                return muffin;
            })
            return { ...state, muffins: temp };
        case 'muffins/load_request':
            return { ...state, muffinsLoading: true };
        case 'muffins/load_success':
            const { muffins } = action.payload;
            return { ...state, muffinsLoading: false, muffins }
        case 'muffins/load_failure':
            const { error } = action;
            return { ...state, muffinsLoading: false, error }
        default:
            return state;
    }
}

// store is an object which keeps the app's state and provides the API for working with it
// allows: read the state, dispatch actions to change the state, and subscribe or unsubscribe to or from the state changes
const store = createStore(
    reducer, applyMiddleware(thunk)
);
// const store = createStore(
//     reducer,
//     window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
// );
// When the store initializes, it obtains the initial state by calling our reducer function with undefined for the state and a dummy action (e.g., reducer(undefined, { type: 'DUMMY' }))

export default store;