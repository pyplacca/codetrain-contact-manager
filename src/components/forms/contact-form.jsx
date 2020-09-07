import React from "react"
import { connect } from 'react-redux'
import { toggleContactForm, modifyContact, updateId } from '../../store/actions'
import form from "./form.jsx"
// import { fields } from './fields'


class ContactForm extends React.Component {
	constructor (props) {
		super(props)

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

	getInputValues (form) {
		const {id, modify} = this.props
		const {entry} = modify
		const values = {
			group: entry.group || new Set(),
			id: entry.id || id
		}

		for (let section of form.children) {
			const input = section.lastElementChild
			values[input.name] = input.value
			input.value = ''
		}

		return values
	}

	handleSubmit (event) {
		event.preventDefault()

		const info = this.getInputValues(event.target)
		this.props.modifyContact(info)
		this.props.updateId(this.props.id + 1)
		this.closeForm()
	}

	modeTitles = {
		preview: "",
		edit: "Edit Contact",
		add: "New Contact"
	}

	render () {
		const {mode, entry} = this.props.modify
		const disabled = mode === "preview"

		return (
			<form.Form
				title={this.modeTitles[mode]}
				id="contact-form"
				className={` ${mode}-mode`}
				submitCallback={this.handleSubmit}
				toggleFunc={this.closeForm}
			>
				{
					mode === 'preview'
					?
					<span
						className="close-icon"
						role="img"
						aria-label="icon"
						aria-hidden="true"
						onClick={this.closeForm}
					>&#x274C;</span>
					:
					null
				}
				{
					this.props.fields.map((field, i) =>
						// when in preview mode,
						// don't display a field that has no value
						mode === 'preview' && !/*this.state*/entry[field.name] ? null :
						<form.FormField label={field.label} key={i}>
							<input
								type={field.type}
								placeholder={field.placeholder}
								disabled={disabled}
								name={field.name}
								defaultValue={entry[field.name]}
							/>
						</form.FormField>
					)
				}
				{
					// don't show these buttons when in preview mode
					mode === "preview"
					?
					null
					:
					<div className="form-buttons">
						<form.FormField>
							<input
								type="button"
								value="Cancel"
								onClick={this.closeForm}
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

const mapStateToProps = state => ({
	id: state.id,
	modify: state.contactModProps,
})

const mapDispatchToProps = {
	modifyContact,
	toggleContactForm,
	updateId
}

export default connect(mapStateToProps, mapDispatchToProps)(ContactForm)
