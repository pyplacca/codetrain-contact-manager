import React from "react"
import { connect } from 'react-redux'
import { toggleGroupForm, modifyGroup } from '../../store/actions'
import form from "./form.jsx"


class GroupForm extends React.Component {
	constructor(props) {
		super(props)

		this.closeForm = this.closeForm.bind(this)
		this.handleSubmit = this.handleSubmit.bind(this)
	}

	closeForm () {
		this.props.toggleGroupForm('closed')
	}

	handleSubmit (event) {
		event.preventDefault()
		const [{target}, {modify, contacts}] = [event, this.props]
		const [
			oldGroupName,
			groupName,
			checklist
		] = [
			modify.entry,
			target[0].value,
			target.children[2]
		]
		// Sift (add or remove) contacts based on their checked states
		for (let child of checklist.children) {
			const checkbox = child.children[0]
			const id = checkbox.name
			if (checkbox.checked) {
				contacts[id].group.delete(oldGroupName)
				contacts[id].group.add(groupName)
			} else {
				// remove contact from group if it was unchecked
				contacts[id].group.delete(groupName)
			}
		}
		this.props.modifyGroup(contacts)
		this.closeForm()
	}

	render () {
		const { contacts, modify } = this.props

		return (
			<form.Form
				title={modify.mode !== 'edit' ? "New Group" : "Edit Group"}
				id="group-form"
				toggleFunc={this.closeForm}
				className={` ${modify.mode}-mode`}
				submitCallback={this.handleSubmit}
			>
				<form.FormField label="Group Name">
					<input
						type="text"
						placeholder="Enter group name"
						name="name"
						id="group-name"
						defaultValue={modify.entry}
						required
					/>
				</form.FormField>

				<form.FormField label="Select Contacts" />
				<div className="checklist">
					{
						Object.values(contacts).map(contact =>
							<form.FormField key={contact.id}>
								<input
									type="checkbox"
									defaultChecked={contact.group.has(modify.entry)}
									name={contact.id}
								/>
								{contact.name || contact.number}
							</form.FormField>
						)
					}
				</div>
				<div className="form-buttons">
					<form.FormField>
						<input
							type="button"
							value="Cancel"
							onClick={this.closeForm}
						/>
					</form.FormField>
					<form.FormField>
						<input
							type="submit"
							value={(modify.mode === 'edit' ? 'Update' : 'Create Group')}
						/>
					</form.FormField>
				</div>
			</form.Form>
		)
	}
}


const mapStateToProps = state => ({
	contacts: state.contacts,
	modify: state.groupModProps
})

const mapDispatchToProps = {
	toggleGroupForm,
	modifyGroup
}


export default connect(mapStateToProps, mapDispatchToProps)(GroupForm)
