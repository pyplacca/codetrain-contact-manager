import React from 'react'
import form from './form.jsx'


class ContactForm extends React.Component {

	render () {
		return (
			<form.Form
				title="New Contact"
				id="contact-form"
			>
				<form.FormField label="Name">
					<input
						type="text"
						placeholder="Enter contact name"
					/>
				</form.FormField>
				<form.FormField label="Mobile Number">
					<input
						type="tel"
						placeholder="Enter mobile number"
					/>
				</form.FormField>
				<form.FormField label="Email Address">
					<input
						type="email"
						placeholder="Email address"
					/>
				</form.FormField>
				<form.FormField>
					<input
						type="submit"
						value="Add Contact"
					/>
				</form.FormField>
			</form.Form>
		)
	}
}


export default ContactForm
