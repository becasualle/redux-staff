import { createStore } from "redux";

const initialState = {
    muffins: [
        { id: 1, name: 'Chocolate chip muffin', likes: 11 },
        { id: 2, name: 'Blueberry muffin', likes: 10 },
    ],
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
        default:
            return state;
    }
}

// store is an object which keeps the app's state and provides the API for working with it
// allows: read the state, dispatch actions to change the state, and subscribe or unsubscribe to or from the state changes
const store = createStore(
    reducer,
    window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
);
// When the store initializes, it obtains the initial state by calling our reducer function with undefined for the state and a dummy action (e.g., reducer(undefined, { type: 'DUMMY' }))

export default store;