const initialState = {
	// An id helps keep track of each contact
	id: 1,
	/*
	Each contact entry is an object with integer(s), string(s) and/or array(s)
	A contact's group entry must be a Set in order to accomodate the
		association of a contact to multiple groups without duplication.
	*/
	contacts: {},
	// for previewing and editing purposes
	modify: {
		contact: {
			mode: 'add',
			entry: {}
		},
		group: {
			mode: 'add',
			entry: undefined
		},
	},
	view: {
		contactForm: 'closed',
		groupForm: 'closed'
	}
}

export default function reducer (state=initialState, action) {
	switch (action.type) {
		default: return state
	}
}
