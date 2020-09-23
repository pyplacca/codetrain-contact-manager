import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { changeContactModProps, toggleContactForm, eraseContact } from '../../store/actions';
// import { unmountComponentAtNode } from 'react-dom';
import Icons from '../icons.jsx';


class ContactCard extends React.Component {

	constructor(props) {
		super(props);

		this.toggleEdit = this.toggleEdit.bind(this);
		this.deleteContact = this.deleteContact.bind(this);
		this.togglePreview = this.togglePreview.bind(this);
	};

	toggleEdit (event) {
		event.stopPropagation();
		const [
			{changeContactModProps, toggleContactForm},
			entry
		] = [
			this.props,
			this.getEntry()
		];
		changeContactModProps({mode: 'edit', entry});
		toggleContactForm('open');
	};

	deleteContact (event) {
		event.stopPropagation();
		this.props.eraseContact(this.props.info.id);
	};

	getEntry () {
		const {contacts, info} = this.props;
		return contacts[info.id];
	};

	togglePreview (event) {
		event.stopPropagation();
		const { changeContactModProps, toggleContactForm } = this.props;

		changeContactModProps({
			mode: 'preview',
			entry: this.getEntry()
		});
		toggleContactForm('open');
	};

	render () {
		const { info } = this.props;
		const name = info.name || info.number;

		return (
			<section className="card contact">
				<div
					className="info"
					onClick={this.togglePreview}
				>
					<h4 className="name">{name}</h4>
					<p className="number">{info.number || 'No number'}</p>
				</div>
				<div className="modify">
					<button
						title="Edit"
						onClick={this.toggleEdit}
					>
						<Icons.Edit />
					</button>
					<button
						title="Delete"
						onClick={this.deleteContact}
					>
						<Icons.Delete />
					</button>
				</div>
			</section>
		)
	}
};

const mapStateToProps = state => ({
	contacts: state.contacts
});

const mapDispatchToProps = {
	changeContactModProps,
	eraseContact,
	toggleContactForm
};

ContactCard.propTypes = {
	contacts: PropTypes.objectOf(PropTypes.object).isRequired,
	eraseContact: PropTypes.func,
	toggleContactForm: PropTypes.func,
	changeContactModProps: PropTypes.func,
};

export default connect(mapStateToProps, mapDispatchToProps)(ContactCard);
