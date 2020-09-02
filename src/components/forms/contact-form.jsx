import React from "react"
import form from "./form.jsx"


const inputs = [
	{
		type: 'text',
		name: 'name',
		label: 'Name',
		placeholder: 'Enter contact name'
	},
	{
		type: 'tel',
		name: 'number',
		label: 'Mobile',
		placeholder: 'Enter mobile number'
	},
	{
		type: 'email',
		name: 'email',
		label: 'Email Address',
		placeholder: 'Enter email'
	},
	{
		type: 'text',
		name: 'occupation',
		label: 'Occupation',
		placeholder: 'Enter occupation'
	},
	{
		type: 'text',
		name: 'organization',
		label: 'Organization',
		placeholder: 'Enter company name'
	},
	{
		type: 'text',
		name: 'department',
		label: 'Department',
		placeholder: 'Company department'
	},
	{
		type: 'text',
		name: 'position',
		label: 'Position',
		placeholder: 'Position'
	},
	{
		type: 'url',
		name: 'website',
		label: 'Website',
		placeholder: 'Enter url'
	},
	{
		type: 'date',
		name: 'anniversary',
		label: 'Anniversary',
		placeholder: 'Anniversary / Birthday'
	},
]

class ContactForm extends React.Component {
	constructor (props) {
		super(props)

		this.state = Object.assign({
			id: '',
			group: new Set(),
		}, Object.fromEntries(inputs.map(input => [input.name, ''])))

		this.handleInputChange = this.handleInputChange.bind(this)
		this.handleSubmit = this.handleSubmit.bind(this)
	}

	handleInputChange ({target}) {
		const {name, value} = target
		this.setState({ [name] : value })
	}

	handleSubmit (event) {
		event.preventDefault()
		this.props.submitCallback(this.state)
		// reset form state
		this.setState({
			...Object.fromEntries(
				Object.keys(this.state).map(key => [key, ''])
			),
			group: new Set()
		})
	}

	modeTitles = {
		preview: "",
		edit: "Edit Contact",
		add: "New Contact"
	}

	render () {
		const {mode, view, toggleFunc} = this.props
		const disabled = mode === "preview"

		return (
			<form.Form
				title={this.modeTitles[mode]}
				id="contact-form"
				form_view={view}
				className={` ${mode}-mode`}
				submitCallback={this.handleSubmit}
				toggleFunc={toggleFunc}
			>
				{
					inputs.map((input, i) =>
						// when in preview mode,
						// don't display a field that doesn't have a state value
						mode === 'preview' && !this.state[input.name] ? null :
						<form.FormField label={input.label} key={i}>
							<input
								type={input.type}
								// don't show placeholders when in preview mode
								placeholder={mode !== 'preview' ? input.placeholder : ''}
								disabled={disabled}
								name={input.name}
								value={this.state[input.name]}
								onChange={this.handleInputChange}
							/>
						</form.FormField>
					)
				}
				{
					// don't show these buttons when in preview mode
					mode === "preview" ? null :
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
								value={mode === "edit" ? "Update" : "Add Contact"}
							/>
						</form.FormField>
					</div>
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
