import React from "react"
import form from "./form.jsx"


class GroupForm extends React.Component {
	constructor(props) {
		super(props)

		this.state = {
			name: '',
			...Object.fromEntries(
				Object.keys(this.props.contacts)
				.map(id => [id, false])
			)
		}

		this.handleSelection = this.handleSelection.bind(this)
		this.handleSubmit = this.handleSubmit.bind(this)
	}

	handleSelection ({target}) {
		this.setState({[target.name] : target.checked})
	}

	handleSubmit (event) {
		event.preventDefault()
		this.props.submitCallback(this.props.group, this.state)
	}

	render () {
		const { contacts, view, mode, toggleFunc } = this.props

		return (
			<form.Form
				title={mode !== 'edit' ? "New Group" : "Edit Group"}
				id="group-form"
				form_view={view}
				toggleFunc={toggleFunc}
				className={` ${mode}-mode`}
				submitCallback={this.handleSubmit}
			>
				<form.FormField label="Group Name">
					<input
						type="text"
						placeholder="Enter group name"
						name="name"
						value={this.state.name}
						onChange={({target}) => this.setState({name: target.value})}
						required
					/>
				</form.FormField>

				<form.FormField label="Select Contacts" />
				<div className="checklist">
					{
						Object.values(contacts).map(contact =>
							<form.FormField key={contact.id.toString()}>
								<input
									type="checkbox"
									checked={this.state[contact.id]}
									onChange={this.handleSelection}
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
							onClick={() => toggleFunc('closed')}
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
