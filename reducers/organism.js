import { createSlice } from '@reduxjs/toolkit';

const initialState = {
	respCivility: "",
	respName: "",
	respNameDisplay: false,
	phonePrivate: 0,
	emailPrivate: "",
	// organismSort: "",
	// orgName: "",
	// location: {},
	// emailPublic: "",
	// phonePublic: 0,
	// website: "",
	// doc: "",
	// image: "",
	// description: "",
	// visible: false
};

export const organismDataSlice = createSlice({
	name: 'organismData',
	initialState,
	reducers: {
		// updateImage: (state, action) => {
		// 	state.image = action.payload;
		// },
		// updateDoc: (state, action) => {
		// 	state.doc = action.payload;
		// },
		updateOrganismData: (state, action) => {

			if (action.payload.respCivility) {
				state.respCivility = action.payload.respCivility;
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
			// if (action.payload.organismSort) {
			// 	state.organismSort = action.payload.organismSort;
			// }
			// if (action.payload.orgName) {
			// 	state.orgName = action.payload.orgName;
			// }
			// if (action.payload.location) {
			// 	state.location = action.payload.location;
			// }
			// if (action.payload.emailPublic) {
			// 	state.emailPublic = action.payload.emailPublic;
			// }
			// if (action.payload.phonePublic) {
			// 	state.phonePublic = action.payload.phonePublic;
			// }
			// if (action.payload.website) {
			// 	state.website = action.payload.website;
			// }

			// if (action.payload.description) {
			// 	state.description = action.payload.description;
			// }
			// if (action.payload.visible) {
			// 	state.visible = action.payload.visible;
			// }
		},
	},
});

export const {updateOrganismData, updateImage, updateDoc} = organismDataSlice.actions;

export default organismDataSlice.reducer;
