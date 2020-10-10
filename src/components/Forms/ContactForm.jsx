import React from "react";
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
// import { toggleContactForm, modifyContact } from '../../store/actions';
import { toggleContactForm, modifyContact } from 'store/actions';
// import { form } from './form';
// import { fields } from './fields';
import { fields, form } from '.';
import { v4 as uuid4 } from 'uuid';


class ContactForm extends React.Component {
	constructor (props) {
		super(props);

		this.state = {...this.props.entry, novalue: undefined};

		this.handleInputChange = this.handleInputChange.bind(this);
		this.handleSubmit = this.handleSubmit.bind(this);
		this.closeForm = this.closeForm.bind(this);
	};

	closeForm () {
		this.props.toggleContactForm('closed');
	};

	handleInputChange ({target}) {
		const {name, value} = target;
		this.setState({ [name] : value });
	};

	handleSubmit (event) {
		event.preventDefault();
		const {entry, modifyContact} = this.props;
		// don't create a contact entry if a name or number has not been provided
		if (!(this.state.name || this.state.number)) {
			this.setState({novalue: true})
			return;
		};
		delete this.state['novalue'];
		modifyContact({
			...this.state,
			id: entry.id || uuid4(), /* this strategy takes advantage of
			the ability to either create or edit a contact using the same form.
			When an id already exists, that means an old contact is being edited else otherwise */
		});
		this.closeForm();
	};

	modeTitles = {
		preview: "",
		edit: "Edit Contact",
		add: "New Contact"
	};

	render () {
		const {mode} = this.props;
		const disabled = mode === "preview";

		return (
			<form.Form
				title={this.modeTitles[mode]}
				id="contact-form"
				className={` ${mode}-mode`}
				submitCallback={this.handleSubmit}
				closeCallback={this.closeForm}
			>
				{
					this.state.novalue
					?
					<p className="alert">
						Please provide at least a name or number
					</p>
					:
					null
				}
				{
					fields.map((field, i) =>
						// when in preview mode,
						// don't display a field that has no value
						mode === 'preview' && !this.state[field.name] ? null :
						<form.InputField
							label={field.label}
							inputAttrs={{
								autoFocus:!i,
								type:field.type,
								placeholder:field.placeholder,
								disabled,
								name:field.name,
								value:this.state[field.name],
								onChange:this.handleInputChange,
							}}
							key={i}
						/>
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
		);
	};
};

const mapStateToProps = state => {
	const {mode, entry} = state.mainReducer.contactModProps;
	return {
		mode,
		entry
	};
};

const mapDispatchToProps = {
	modifyContact,
	toggleContactForm,
};

ContactForm.propTypes = {
	mode: PropTypes.string.isRequired,
	entry: PropTypes.object,
	modifyContact: PropTypes.func,
	toggleContactForm: PropTypes.func
};

export default connect(mapStateToProps, mapDispatchToProps)(ContactForm);
