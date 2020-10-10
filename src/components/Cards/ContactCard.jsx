import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { changeContactModProps, toggleContactForm, eraseData } from '../../store/actions';
// import { changeContactModProps, toggleContactForm, eraseData } from 'store/actions';
import * as Misc from '../components/Misc';
// import { Misc } from 'components';


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
		this.props.eraseData('contacts', this.props.info.id);
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
						<Misc.Icons.Edit />
					</button>
					<button
						title="Delete"
						onClick={this.deleteContact}
					>
						<Misc.Icons.Delete />
					</button>
				</div>
			</section>
		)
	}
};

const mapStateToProps = state => ({
	contacts: state.mainReducer.contacts
});

const mapDispatchToProps = {
	changeContactModProps,
	eraseData,
	toggleContactForm
};

ContactCard.propTypes = {
	contacts: PropTypes.objectOf(PropTypes.object).isRequired,
	eraseData: PropTypes.func,
	toggleContactForm: PropTypes.func,
	changeContactModProps: PropTypes.func,
};

export default connect(mapStateToProps, mapDispatchToProps)(ContactCard);
