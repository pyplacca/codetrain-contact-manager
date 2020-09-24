function newAction (type, payload) {
	return {
		type,
		payload
	}
}

function createFormAction(form, actionType, payload) {
	const types = {
		contact: {
			toggle: 'TOGGLE_CONTACT_FORM',
			changeMod: 'CHANGE_CONTACT_MOD_PROPS',
		},
		group: {
			toggle: 'TOGGLE_GROUP_FORM',
			changeMod: 'CHANGE_GROUP_MOD_PROPS',
		}
	}

	return {
		contact: newAction(
			types.contact[actionType],
			payload
		),
		group: newAction(
			types.group[actionType],
			payload
		)
	}[form]
}

export const changeContactModProps = props => createFormAction('contact', 'changeMod', props)

export const changeGroupModProps = props => createFormAction('group', 'changeMod', props)

export const eraseContact = id => newAction('ERASE_CONTACT', id)

export const modifyContact = info => {
	return (dispatch, getState, {db}) => {
		db()
			.collection('Contacts App')
			.doc('phonebook')
			.collection('contacts')
			.doc(info.id)
			.set(info)
			.then(() => {
				dispatch(newAction('MODIFY_CONTACT', info))
			})
			.catch(err => console.log)
	}
}

export const modifyGroup = group => {
	return (dispatch, getState, {db}) => {
		db()
			.collection('Contacts App')
			.doc('phonebook')
			.collection('groups')
			.doc(group.name)
			.set(group.members)
			.then(() => {
				dispatch(newAction('MODIFY_GROUP', group))
			})
			.catch(err => console.log)
	}
}

export const toggleContactForm = to => createFormAction('contact', 'toggle', to)

export const toggleGroupForm = to => createFormAction('group', 'toggle', to)
