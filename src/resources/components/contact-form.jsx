import React from 'react'
import Form from './form.jsx'


class ContactForm extends React.Component {

	render () {
		return (
			<Form
				title="New Contact"
				submit_name="Add Contact"
			>
				<section className="field">
					<h5 className="label">Name</h5>
					<input type="text" placeholder="Enter contact name"/>
				</section>
				<section className="field">
					<h5 className="label">Mobile Number</h5>
					<input type="tel" placeholder="Enter mobile number"/>
				</section>
				<section className="field">
					<h5 className="label">Email Address</h5>
					<input type="email" placeholder="Email address"/>
				</section>
			</Form>
		)
	}
}


export default ContactForm
