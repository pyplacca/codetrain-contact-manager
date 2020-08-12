import React from "react"
import form from "./form.jsx"


class GroupForm extends React.Component {
	constructor(props) {
		super(props)

		this.state = {
			name: undefined,
			contact_ids: new Set(),
		}

		this.handleSelection = this.handleSelection.bind(this)
	}

	handleSelection ({target}) {
		const [{contact_ids}, id] = [this.state, target.value]
		if (target.checked) {
			contact_ids.add(id)
		} else {
			contact_ids.delete(id)
		}
	}

	render () {
		const {contacts, preview, submitCallback} = this.props
		return (
			<form.Form
				title={!preview ? "New Group" : "Update Group"}
				id="group-form"
				submitCallback={event => {
					event.preventDefault()
					submitCallback(this.state)
				}}
			>
				<form.FormField label="Group Name">
					<input
						type="text"
						placeholder="Enter group name"
						value={preview}
						onChange={({target}) => this.setState({name: target.value})}
					/>
				</form.FormField>

				<form.FormField className="field" label="Select Contacts" />
				<div className="checklist">
					{
						Object.values(contacts).map((contact, i) =>
							<form.FormField key={i}>
								<input
									type="checkbox"
									checked={preview && contact.group.includes(preview)}
									onChange={this.handleSelection}
									value={contact.id}
								/>
								{contact.name || contact.number}
							</form.FormField>
						)
					}
				</div>
				<form.FormField>
					<input
						type="submit"
						value={(preview ? 'Update' : 'Create Group')}
					/>
				</form.FormField>
			</form.Form>
		)
	}
}

GroupForm.defaultProps = {
	contacts: {},
}


export default GroupForm
