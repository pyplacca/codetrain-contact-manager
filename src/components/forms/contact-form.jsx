import React from "react"
import { connect } from 'react-redux'
import { toggleContactForm, modifyContact, updateId } from '../../store/actions'
import form from "./form.jsx"
import { fields } from './fields'


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

		for (let child of form.children) {
			if (child.classList.contains('field')) {
				const input = child.lastElementChild
				values[input.name] = input.value
				input.value = ''
			}
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
				closeCallback={this.closeForm}
			>
				{
					fields.map((field, i) =>
						// when in preview mode,
						// don't display a field that has no value
						mode === 'preview' && !entry[field.name] ? null :
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
