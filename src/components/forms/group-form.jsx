import React from "react"
import { connect } from 'react-redux'
import { toggleGroupForm, modifyGroup } from '../../store/actions'
import form from "./form.jsx"


class GroupForm extends React.Component {
	constructor(props) {
		super(props)

		this.state = {
			selected: true
		}

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
		let count = 0 // keeps track of selected contacts
		for (let child of checklist.children) {
			const checkbox = child.children[0]
			const id = checkbox.name
			if (checkbox.checked) {
				contacts[id].group.delete(oldGroupName)
				contacts[id].group.add(groupName)
				count++
			} else {
				// remove contact from group if it was unchecked
				contacts[id].group.delete(groupName)
			}
		}
		// check if at least a contact has been selected
		if (count) {
			this.props.modifyGroup(contacts)
			this.closeForm()
		} else {
			// show an alert if not
			this.setState({selected: false})
		}
	}

	render () {
		const { contacts, modify } = this.props

		return (
			<form.Form
				title={modify.mode !== 'edit' ? "New Group" : "Edit Group"}
				id="group-form"
				closeCallback={this.closeForm}
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

				<form.FormField label="Select Contacts">
					{
						this.state.selected ? null :
						<p style={{color: "red", fontSize: ".9em"}}>
							Select at least one contact
						</p>
					}
				</form.FormField>
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
					<input
						type="submit"
						value={(modify.mode === 'edit' ? 'Update' : 'Create Group')}
					/>
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
