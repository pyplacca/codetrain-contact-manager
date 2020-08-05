import React from 'react'
import Form from './form.jsx'


class GroupForm extends React.Component {
	render () {
		const {contact_list} = this.props
		return (
			<Form
				title="New Group"
				submit_name="Create Group"
				id="group-form"
			>
				<section className="field">
					<h4 className="label">Group Name</h4>
					<input type="text" placeholder="Enter group name"/>
				</section>

				<section className="field">
					<h4 className="label">Select Contacts</h4>
				</section>
					{
						contact_list.map((contact, i) =>
							<section key={i} className="field">
								<input type="checkbox"/>
								{contact.name}
							</section>
						)
					}
			</Form>
		)
	}
}


export default GroupForm
