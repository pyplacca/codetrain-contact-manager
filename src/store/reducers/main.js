const initialState = {
	// Each contact entry is an object with integer(s), string(s) and/or array(s)
	contacts: {},
	groups: {},
	// for previewing and editing purposes
	contactModProps: {
		mode: 'add',
		entry: {}
	},
	// for previewing and editing purposes
	groupModProps: {
		mode: 'add',
		entry: undefined
	},
	// dictates when and which form to toggle
	view: {
		contactForm: 'closed',
		groupForm: 'closed'
	}
}


export default function mainReducer (state=initialState, action) {
	const { type, payload } = action

	switch (type) {

		case 'CHANGE_CONTACT_MOD_PROPS':
			return {
				...state,
				contactModProps: payload,
			}

		case 'CHANGE_GROUP_MOD_PROPS':
			return {
				...state,
				groupModProps: payload,
			}

		case 'RETRIEVE_CONTACTS':
			return {
				...state,
				contacts: payload
			}

		case 'RETRIEVE_GROUPS':
			return {
				...state,
				groups: payload
			}

		case 'TOGGLE_CONTACT_FORM':
			return {
				...state,
				view: {
					...state.view,
					contactForm: payload
				}
			}

		case 'TOGGLE_GROUP_FORM':
			return {
				...state,
				view: {
					...state.view,
					groupForm: payload
				}
			}

		default: return state
	}
}
