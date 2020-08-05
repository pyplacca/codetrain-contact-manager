import React from 'react'
import Form from './form.jsx'


class ContactForm extends React.Component {

	render () {
		return (
			<Form
				title="New Contact"
				submit_name="Add Contact"
				id="contact-form"
			>
				<section className="field">
					<h4 className="label">Name</h4>
					<input type="text" placeholder="Enter contact name"/>
				</section>
				<section className="field">
					<h4 className="label">Mobile Number</h4>
					<input type="tel" placeholder="Enter mobile number"/>
				</section>
				<section className="field">
					<h4 className="label">Email Address</h4>
					<input type="email" placeholder="Email address"/>
				</section>
			</Form>
		)
	}
}


export default ContactForm
