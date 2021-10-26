// We create selector functions to provide a reusable API for selecting different parts of the stateWe create selector functions to provide a reusable API for selecting different parts of the state
export const selectMuffinsArray = (state) => state.muffins;
export const selectMuffinsLoading = (state) => state.muffinsLoading;
export const selectMuffinsLoadError = (state) => state.error;
