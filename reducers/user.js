import { createSlice } from '@reduxjs/toolkit';

const initialState = {
	token: "",
	createdOrganism: "essai"
};

export const userSlice = createSlice({
	name: 'user',
	initialState,
	reducers: {

		updateCreatedOrganism : (state, action) => {
			state.createdOrganism = action.payload;
		},

		login: (state, action) => {
			state.token = action.payload;
		},
		logout: (state) => {
			state.token = null;
		  },
	},
});

export const {login, logout, updateCreatedOrganism} = userSlice.actions;

export default userSlice.reducer;
