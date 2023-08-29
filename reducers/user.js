import { createSlice } from '@reduxjs/toolkit';

const initialState = {
	token: "",
	mail: "",
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
			console.log(action)
			state.token = action.payload.token;
			state.mail = action.payload.mail;
		},
		logout: (state) => {
			state.token = null;
			state.mail= null;
		  },
	},
});

export const {login, logout, updateCreatedOrganism} = userSlice.actions;

export default userSlice.reducer;
