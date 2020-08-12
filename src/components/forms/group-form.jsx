import React from "react"
import form from "./form.jsx"


class GroupForm extends React.Component {
	constructor(props) {
		super(props)

		this.state = {
			name: undefined,
			contact_ids: new Set(),
		}

	}


	render () {
		const {contacts, preview, submitCallback} = this.props
		return (
			<form.Form
				title={!preview ? "New Group" : "Update Group"}
				id="group-form"
			>
				<form.FormField label="Group Name">
					<input
						type="text"
						placeholder="Enter group name"
						value={preview}
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