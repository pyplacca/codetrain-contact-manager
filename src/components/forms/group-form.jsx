import React from "react"
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { toggleGroupForm, modifyGroup } from '../../store/actions'
import form from "./form.jsx"


class GroupForm extends React.Component {
	constructor(props) {
		super(props)

		const {name, groups} = this.props
		const members = groups[name] || {}
		this.state = {
			name,
			members
		}

		this.closeForm = this.closeForm.bind(this)
		this.handleSubmit = this.handleSubmit.bind(this)
		this.handleSelection = this.handleSelection.bind(this)
	}

	closeForm () {
		this.props.toggleGroupForm('closed')
	}

	handleSelection ({target}) {
		let {members} = this.state
		const {name, checked} = target
		if (checked) {
			members[name] = this.props.contacts[name]
		} else {
			delete members[name]
		}
		this.setState({
			...this.state,
			members,
		})
	}

	handleSubmit (event) {
		event.preventDefault()
		this.props.modifyGroup({
			...this.state,
			oldname: this.props.name
		})
		this.closeForm()
	}

	render () {
		const [
			{ contacts, mode },
			{ name, members }
		] = [
			this.props,
			this.state
		]

		return (
			<form.Form
				title={mode !== 'edit' ? "New Group" : "Edit Group"}
				id="group-form"
				closeCallback={this.closeForm}
				className={` ${mode}-mode`}
				submitCallback={this.handleSubmit}
			>
				<form.FormField label="Group Name">
					<input
						type="text"
						placeholder="Enter group name"
						name="name"
						id="group-name"
						value={name}
						onChange={({target}) => this.setState({
							name: target.value
						})}
						required
					/>
				</form.FormField>

				<form.FormField label="Select Contacts" />
					{/*
						memberCount ? null :
						<p className="alert">
							Please select at least one contact
						</p>
				</form.FormField>
					*/}
				<div className="checklist">
					{
						Object.values(contacts)
						.sort((a, b) =>
							(a.name < b.name) ? -1 :
							((a.name > b.name) ? 1 : 0)
						)
						.map(contact =>
							<form.FormField key={contact.id}>
								<input
									type="checkbox"
									name={contact.id}
									checked={Boolean(members[contact.id])}
									onChange={this.handleSelection}
								/>
								{contact.name || contact.number}
							</form.FormField>
						)
					}
				</div>
				<div className="form-buttons">
					<input
						type="submit"
						value={(mode === 'edit' ? 'Update' : 'Create Group')}
					/>
				</div>
			</form.Form>
		)
	}
}

GroupForm.propTypes = {
	contacts: PropTypes.objectOf(PropTypes.object),
	groups: PropTypes.object.isRequired,
	name: PropTypes.string.isRequired,
	mode: PropTypes.string,
	toggleGroupForm: PropTypes.func,
	modifyGroup: PropTypes.func
}

const mapStateToProps = state => {
	const {mode, entry} = state.groupModProps
	return {
		contacts: state.contacts,
		groups: state.groups,
		name: entry || '',
		mode,
	}
}

const mapDispatchToProps = {
	toggleGroupForm,
	modifyGroup
}


export default connect(mapStateToProps, mapDispatchToProps)(GroupForm)
