import { createSlice } from '@reduxjs/toolkit';

const initialState = {
	name: "",
	token: ""
};

export const userSlice = createSlice({
	name: 'user',
	initialState,
	reducers: {

		updateToken: (state, action) => {
			state.token = action.payload;
		},
		updateName: (state, action) => {
				state.respCivility = action.payload.respCivility;
		},
	},
});

export const {updateName, updateToken} = userSlice.actions;

export default userSlice.reducer;
