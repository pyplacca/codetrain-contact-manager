import React from "react"
import { connect } from 'react-redux'
import { toggleContactForm, modifyContact } from '../../store/actions'
import form from "./form.jsx"
import { fields } from './fields'


class ContactForm extends React.Component {
	constructor (props) {
		super(props)

		this.state = this.props.entry

		this.handleInputChange = this.handleInputChange.bind(this)
		this.handleSubmit = this.handleSubmit.bind(this)
		this.closeForm = this.closeForm.bind(this)
	}

	closeForm () {
		this.props.toggleContactForm('closed')
	}

	handleInputChange ({target}) {
		const {name, value} = target
		this.setState({ [name] : value })
	}

	handleSubmit (event) {
		event.preventDefault()
		const {entry, modifyContact} = this.props
		modifyContact({
			...this.state,
			id: entry.id || new Date().getTime(), /* this strategy takes advantage of
			the ability to either create or edit a contact using the same form.
			When an id is present, that means an old contact is being edited else otherwise */
			group: entry.group || new Set() // same applies here.
		})
		this.closeForm()
	}

	modeTitles = {
		preview: "",
		edit: "Edit Contact",
		add: "New Contact"
	}

	render () {
		const {mode} = this.props
		const disabled = mode === "preview"

		return (
			<form.Form
				title={this.modeTitles[mode]}
				id="contact-form"
				className={` ${mode}-mode`}
				submitCallback={this.handleSubmit}
				closeCallback={this.closeForm}
			>
				{
					fields.map((field, i) =>
						// when in preview mode,
						// don't display a field that has no value
						mode === 'preview' && !this.state[field.name] ? null :
						<form.FormField label={field.label} key={i}>
							<input
								type={field.type}
								placeholder={field.placeholder}
								disabled={disabled}
								name={field.name}
								value={this.state[field.name]}
								onChange={this.handleInputChange}
							/>
						</form.FormField>
					)
				}
				{
					mode === "preview"
					?
					null
					:
					// don't show these buttons when in preview mode
					<div className="form-buttons">
						<input
							type="submit"
							value={mode === "edit" ? "Update" : "Add Contact"}
						/>
					</div>
				}
			</form.Form>
		)
	}
}

const mapStateToProps = state => {
	const {mode, entry} = state.contactModProps
	return {
		mode,
		entry
	}
}

const mapDispatchToProps = {
	modifyContact,
	toggleContactForm,
}

export default connect(mapStateToProps, mapDispatchToProps)(ContactForm)
