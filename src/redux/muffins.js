import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

// Actions 
// export const likeMuffin = createAction('muffins/like', muffinId => {
//     return { payload: { id: muffinId } }
// })

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

const muffinsSlice = createSlice({
    name: 'muffins',
    initialState,
    reducers: {
        likeMuffin: {
            reducer: (state, action) => {
                const muffinToLike = state.muffins.find(
                    (muffin) => muffin.id === action.payload.id
                );
                muffinToLike.likes += 1;
            },
            prepare: (muffinId) => {
                return { payload: { id: muffinId } };
            },
        },
    },
    extraReducers: {
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
    },
});
// createSlice returns an object with the following structure:
// {
//     name: name of the slice
//     reducer: reducer function that combines reducers from `reducers` and `extraReducers` options
//     actions: action creators extracted from the `reducers` option
//     caseReducers: reducer functions from the `reducers` option
//   }

export const { likeMuffin } = muffinsSlice.actions;

export default muffinsSlice.reducer;
