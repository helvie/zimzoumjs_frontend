import { createSlice } from '@reduxjs/toolkit';

////////////////////////////////////////////////////////////////////////////////

const initialState = {
	respCivility: "",
	respName: "",
	respNameDisplay: false,
	phonePrivate: 0,
	emailPrivate: "",
};

export const organismDataSlice = createSlice({
	name: 'organismData',
	initialState,
	reducers: {
		updateOrganismData: (state, action) => {

			if (action.payload.respCivility) {
				state.respCivility = action.payload.respCivility;
			}

			if (action.payload.respRole) {
				state.respRole = action.payload.respRole;
			}

			if (action.payload.respName) {
				state.respName = action.payload.respName;
			}
			
			if (action.payload.respNameDisplay) {
				state.respNameDisplay = action.payload.respNameDisplay;
			}

			if (action.payload.phonePrivate) {
				state.phonePrivate = action.payload.phonePrivate;
			}

			if (action.payload.emailPrivate) {
				state.emailPrivate = action.payload.emailPrivate;
			}
		},
	},
});

export const {updateOrganismData, updateImage, updateDoc} = organismDataSlice.actions;

export default organismDataSlice.reducer;
