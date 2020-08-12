import React from "react"
import form from "./form.jsx"


class ContactForm extends React.Component {
	constructor (props) {
		super(props)

		this.state = {
			name: '',
			number: '',
			email: '',
			id: '',
			group: new Set(),
		}

		this.handleInputChange = this.handleInputChange.bind(this)
		this.handleSubmit = this.handleSubmit.bind(this)
	}

	handleInputChange ({target}) {
		const update = Object.fromEntries([[
			target.name, target.value
		]])
		this.setState({...update})
	}

	handleSubmit (event) {
		event.preventDefault()
		this.props.submitCallback(this.state)
	}

	modeTitles = {
		preview: "",
		edit: "Edit Contact",
		add: "New Contact"
	}

	render () {
		// props: mode [preview, edit], contact (contact to be previewed or edited)
		let {mode, view, toggleForm} = this.props
		const disabled = mode === "preview"

		return (
			<form.Form
				title={this.modeTitles[mode]}
				id="contact-form"
				form_view={view}
				className={` ${mode}-mode`}
				submitCallback={this.handleSubmit}
				toggleForm={toggleForm}
			>
				{/* don't show placeholders when in preview mode */}
				<form.FormField label="Name">
					<input
						type="text"
						placeholder={mode !== 'preview' ? "Enter contact name" : ''}
						disabled={disabled}
						name="name"
						value={this.state.name}
						onChange={this.handleInputChange}

					/>
				</form.FormField>
				<form.FormField label="Mobile Number">
					<input
						type="tel"
						placeholder={mode !== 'preview' ? "Enter mobile number" : ''}
						disabled={disabled}
						name="number"
						value={this.state.number}
						onChange={this.handleInputChange}
						required
					/>
				</form.FormField>
				<form.FormField label="Email Address">
					<input
						type="email"
						placeholder={mode !== 'preview' ? "Email address" : ''}
						disabled={disabled}
						name="email"
						value={this.state.email}
						onChange={this.handleInputChange}
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
