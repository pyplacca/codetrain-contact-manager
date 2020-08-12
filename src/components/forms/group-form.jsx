import React from "react"
import form from "./form.jsx"


class GroupForm extends React.Component {
	constructor(props) {
		super(props)

		this.state = {
			name: '',
			contactIDs: {}
		}

		this.handleSelection = this.handleSelection.bind(this)
	}

	handleSelection ({target}) {
		const {contactIDs} = this.state
		contactIDs[target.id] = target.checked
		this.setState({contactIDs})
	}

	render () {
		const {
			contacts,
			submitCallback,
			view,
			mode,
			group,
			toggleForm
		} = this.props

		return (
			<form.Form
				title={mode !== 'edit' ? "New Group" : "Edit Group"}
				id="group-form"
				form_view={view}
				toggleForm={toggleForm}
				className={` ${mode}-mode`}
				submitCallback={event => {
					event.preventDefault()
					submitCallback(group, this.state)
				}}
			>
				<form.FormField label="Group Name">
					<input
						type="text"
						placeholder="Enter group name"
						value={this.state.name}
						onChange={
							({target}) => {
								this.setState({name: target.value})
							}
						}
						required
					/>
				</form.FormField>

				<form.FormField className="field" label="Select Contacts" />
				<div className="checklist">
					{
						Object.values(contacts).map((contact, i) =>
							<form.FormField key={i}>
								<input
									type="checkbox"
									checked={this.state.contactIDs[contact.id]}
									onChange={this.handleSelection}
									value={this.state.contactIDs[contact.id]}
									id={contact.id}
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
							onClick={() => toggleForm('closed')}
						/>
					</form.FormField>
					<form.FormField>
						<input
							type="submit"
							value={(mode === 'edit' ? 'Update' : 'Create Group')}
						/>
					</form.FormField>
				</div>
			</form.Form>
		)
	}
}

GroupForm.defaultProps = {
	contacts: {},
}


export default GroupForm
