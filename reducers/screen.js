import { createSlice } from '@reduxjs/toolkit';

const initialState = {
	screenHeight:0,
	screenWidth:0
};

export const screenSlice = createSlice({
	name: 'screen',
	initialState,
	reducers: {
		updateScreenHeight: (state, action) => {
			state.screenHeight=action.payload;
		},
		updateScreenWidth: (state, action) => {
			state.screenWidth=action.payload;
		},
	},
});

export const { updateScreenHeight, updateScreenWidth } = screenSlice.actions;
export default screenSlice.reducer;
