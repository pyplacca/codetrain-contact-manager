import React from "react"
import form from "./form.jsx"


class ContactForm extends React.Component {

	modes = {
		preview: "",
		edit: "Edit Contact",
		add: "New Contact"
	}

	render () {
		// props: mode [preview, edit], contact (contact to be previewed or edited)
		let {mode, contact} = this.props
		if (contact.name && mode !== "edit") {
			mode = "preview"
		}
		const disabled = mode === "preview"

		return (
			<form.Form
				title={this.modes[mode]}
				id="contact-form"
				className={` ${mode}-mode`}
			>
				<form.FormField label="Name">
					<input
						type="text"
						placeholder="Enter contact name"
						disabled={disabled}
						name="name"
						value={contact.name}

					/>
				</form.FormField>
				<form.FormField label="Mobile Number">
					<input
						type="tel"
						placeholder="Enter mobile number"
						disabled={disabled}
						name="number"
						value={contact.number}
					/>
				</form.FormField>
				<form.FormField label="Email Address">
					<input
						type="email"
						placeholder="Email address"
						disabled={disabled}
						name="email"
						value={contact.email}
					/>
				</form.FormField>
				{
					mode === "preview" ? null :
					<form.FormField>
						<input
							type="submit"
							value={mode === "edit" ? "Update" : "Add Contact"}
						/>
					</form.FormField>
				}
			</form.Form>
		)
	}
}

ContactForm.defaultProps = {
	mode: "add",
	contact: {},
}


export default ContactForm
