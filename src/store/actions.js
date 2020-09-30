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

	return newAction(...{
		contact: [
			types.contact[actionType],
			payload
		],
		group: [
			types.group[actionType],
			payload
		]
	}[form])
}

export const changeContactModProps = props => createFormAction('contact', 'changeMod', props)

export const changeGroupModProps = props => createFormAction('group', 'changeMod', props)

export const eraseData = (collection, docId) => {
	return (dispatch, getState, {db}) => {
		db()
			.collection('Contacts Manager')
			.doc('phonebook')
			.collection(collection)
			.doc(docId)
			.delete()
			.catch(err => console.log)
	}
}

export const modifyContact = info => {
	return (dispatch, getState, {db}) => {
		db()
			.collection('Contacts Manager')
			.doc('phonebook')
			.collection('contacts')
			.doc(info.id)
			.set(info)
			.catch(err => console.log)
	}
}

export const modifyGroup = group => {
	return (dispatch, getState, {db}) => {
		const collection = db()
			.collection('Contacts Manager')
			.doc('phonebook')
			.collection('groups')
		/*
		Updating a group whose name was modified requires that we delete the group
			data bearing the old name (group.oldname) and replace it with the group
			data bearing the new name (group.name)
		This complication is due to the structure or technique used to store the group(s) data

		Let me know if you know a better way.
		*/
		if (group.oldname && group.oldname !== group.name) {
			collection.doc(group.oldname).delete()
		}

		collection
			.doc(group.name)
			.set(group.members)
			.catch(err => console.log)
	}
}

export const retrieveData = (collection, actionType) => {
	return (dispatch, getState, {db}) => {
		db()
			.collection('Contacts Manager')
			.doc('phonebook')
			.collection(collection)
			.onSnapshot(snapshot => {
				let output = {}
				snapshot.forEach(entry => output[entry.id] = entry.data())
				dispatch({
					type: actionType,
					payload: output
				})
			})
	}
}

export const toggleContactForm = to => createFormAction('contact', 'toggle', to)

export const toggleGroupForm = to => createFormAction('group', 'toggle', to)
