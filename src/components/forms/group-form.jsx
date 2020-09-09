import React from "react"
import { connect } from 'react-redux'
import { toggleGroupForm, modifyGroup } from '../../store/actions'
import form from "./form.jsx"


class GroupForm extends React.Component {
	constructor(props) {
		super(props)

		const {name, contacts} = this.props
		this.state = {
			madeSelection: true,
			name,
			members: Object.fromEntries(
				Object.values(contacts).map(
					({id, group}) => [id, group.has(name)]
				)
			)
		}

		this.closeForm = this.closeForm.bind(this)
		this.handleSubmit = this.handleSubmit.bind(this)
		this.handleSelection = this.handleSelection.bind(this)
	}

	closeForm () {
		this.props.toggleGroupForm('closed')
	}

	handleSelection ({target}) {
		this.setState({
			...this.state,
			members: {
				...this.state.members,
				[target.name]: target.checked
			}
		})
	}

	handleSubmit (event) {
		event.preventDefault()
		const {contacts} = this.props
		let count = 0 // keeps track of selected contacts
		// Sift (add or remove) contacts based on their checked states
		const {name, members} = this.state
		for (let id in members) {
			if (members[id]) {
				/*
					Delete group name received from props from the contact's group set.
					This way, if that name was changed during editing, it would...
				*/
				contacts[id].group.delete(this.props.name)
				// ...be replaced with the new name.
				contacts[id].group.add(name)
				count++
			} else {
				// Remove group's name from the contact's group set if it was unchecked
				contacts[id].group.delete(name)
			}
		}
		// Check if at least a contact has been selected...
		if (count) {
			this.props.modifyGroup(contacts)
			this.closeForm()
		} else {
			// ...show an alert if not.
			this.setState({madeSelection: false})
		}
	}

	render () {
		const [
			{ contacts, mode },
			{name, madeSelection, members}
		] = [
			this.props,
			this.state
		]

		return (
			<form.Form
				title={mode !== 'edit' ? "New Group" : "Edit Group"}
				id="group-form"
				closeCallback={this.closeForm}
				className={` ${mode}-mode`}
				submitCallback={this.handleSubmit}
			>
				<form.FormField label="Group Name">
					<input
						type="text"
						placeholder="Enter group name"
						name="name"
						id="group-name"
						value={name}
						onChange={({target}) => this.setState({
							name: target.value
						})}
						required
					/>
				</form.FormField>

				<form.FormField label="Select Contacts">
					{
						madeSelection ? null :
						<p className="alert">
							You need to select at least one contact
						</p>
					}
				</form.FormField>
				<div className="checklist">
					{
						Object.values(contacts).map(contact =>
							<form.FormField key={contact.id}>
								<input
									type="checkbox"
									name={contact.id}
									checked={members[contact.id]}
									onChange={this.handleSelection}
								/>
								{contact.name || contact.number}
							</form.FormField>
						)
					}
				</div>
				<div className="form-buttons">
					<input
						type="submit"
						value={(mode === 'edit' ? 'Update' : 'Create Group')}
					/>
				</div>
			</form.Form>
		)
	}
}


const mapStateToProps = state => {
	const {mode, entry} = state.groupModProps
	return {
		contacts: state.contacts,
		name: entry || '',
		mode,
	}
}

const mapDispatchToProps = {
	toggleGroupForm,
	modifyGroup
}


export default connect(mapStateToProps, mapDispatchToProps)(GroupForm)
