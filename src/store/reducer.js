const initialState = {
	/*
	Each contact entry is an object with integer(s), string(s) and/or array(s)
	A contact's group entry must be a Set in order to accomodate the
		association of a contact to multiple groups without duplication.
	*/
	contacts: {},
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


export default function reducer (state=initialState, action) {
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

		case 'ERASE_CONTACT':
			const contacts = {...state.contacts}
			delete contacts[payload]
			return {
				...state,
				contacts
			}

		// creates a new or updates an old contact
		case 'MODIFY_CONTACT':
			return {
				...state,
				contacts: {
					...state.contacts,
					[payload.id]: payload
				}
			}

		case 'MODIFY_GROUP':
			return {
				...state,
				contacts: payload
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
