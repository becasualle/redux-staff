import { createReducer, createAction, createAsyncThunk } from '@reduxjs/toolkit';

// Actions 
export const likeMuffin = createAction('muffins/like', muffinId => {
    return { payload: { id: muffinId } }
})

export const loadMuffins = createAsyncThunk('muffins/load', async () => {
    const response = await fetch('http://localhost:3001/muffins');
    const muffins = await response.json();
    return { muffins }
});

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
    [likeMuffin]: (state, action) => {
        const muffinToLike = state.muffins.find(muffin => muffin.id === action.payload.id)
        muffinToLike.likes += 1;
    },
    [loadMuffins.pending]: (state) => {
        state.muffinsLoading = true;
    },
    [loadMuffins.fulfilled]: (state, action) => {
        state.muffinsLoading = false;
        state.muffins = action.payload.muffins;
    },
    [loadMuffins.rejected]: (state) => {
        state.muffinsLoading = false;
        state.error = 'Failed to load muffins.';
    },
})

export default reducer;
