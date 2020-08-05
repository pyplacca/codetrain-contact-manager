import React from 'react'
import form from './form.jsx'


class GroupForm extends React.Component {
	render () {
		const {contact_list} = this.props
		return (
			<form.Form
				title="New Group"
				id="group-form"
			>
				<form.FormField label="Group Name">
					<input type="text" placeholder="Enter group name"/>
				</form.FormField>

				<form.FormField className="field" label="Select Contacts" />
				<div className="checklist">
					{
						contact_list.map((contact, i) =>
							<form.FormField key={i}>
								<input type="checkbox"/>
								{contact.name}
							</form.FormField>
						)
					}
				</div>
				<form.FormField>
					<input type="submit" value="Create Group"/>
				</form.FormField>
			</form.Form>
		)
	}
}


export default GroupForm
