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

export const modifyContact = info => newAction('MODIFY_CONTACT', info)

export const modifyGroup = info => newAction('MODIFY_GROUP', info)

export const toggleContactForm = to => createFormAction('contact', 'toggle', to)

export const toggleGroupForm = to => createFormAction('group', 'toggle', to)

export const updateId = id => newAction('UPDATE_ID', id)
