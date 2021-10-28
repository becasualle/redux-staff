import { createReducer } from '@reduxjs/toolkit';

// Actions 
export const likeMuffin = muffinId => ({
    type: 'muffins/like',
    payload: { id: muffinId }
})

export const loadMuffins = () => async (dispatch) => {
    dispatch({
        type: 'muffins/load_request',
    });

    try {
        const response = await fetch('http://localhost:3001/muffins')
        const data = await response.json();

        dispatch({
            type: 'muffins/load_success',
            payload: { muffins: data }
        })
    } catch (e) {
        dispatch({
            type: 'muffins/load_failure',
            error: 'Failed to load muffins'
        })
    }
}

// Selectors
export const selectMuffinsState = (rootState) => rootState.muffins;
export const selectMuffinsArray = (rootState) => selectMuffinsState(rootState).muffins;
export const selectMuffinsLoading = (rootState) => selectMuffinsState(rootState).muffinsLoading;
export const selectMuffinsLoadError = (rootState) => selectMuffinsState(rootState).error;

// Reducer
const initialState = {
    muffins: [],
};

// createReducer(initialState, caseReducers)
// The first argument is the initial state and the second argument is an object that maps action types to reducer functions that handle that actions.
const reducer = createReducer(initialState, {
    'muffins/like': (state, action) => {
        const muffinToLike = state.muffins.find(muffin => muffin.id === action.payload.id)
        muffinToLike.likes += 1;
    },
    'muffins/load_request': (state) => {
        state.muffinsLoading = true;
    },
    'muffins/load_success': (state, action) => {
        state.muffinsLoading = false;
        state.muffins = action.payload.muffins;
    },
    'muffins/load_failure': (state, action) => {
        state.muffinsLoading = false;
        state.error = action.error;
    },
})

export default reducer;
