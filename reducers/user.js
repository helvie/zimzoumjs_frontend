import { createSlice } from '@reduxjs/toolkit';

////////////////////////////////////////////////////////////////////////////////

const initialState = {
	token: "",
	mail: "",
	createdOrganism: "",
	organismRegularclass: ""
};

export const userSlice = createSlice({
	name: 'user',
	initialState,
	reducers: {

		updateCreatedOrganism : (state, action) => {
			state.createdOrganism = action.payload;
		},

		updateOrganismRegularclass : (state, action) => {
			state.organismRegularclass = action.payload;
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

export const {login, logout, updateCreatedOrganism, updateOrganismRegularclass} = userSlice.actions;

export default userSlice.reducer;
