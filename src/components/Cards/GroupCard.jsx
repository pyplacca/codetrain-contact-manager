import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { changeGroupModProps, toggleGroupForm, eraseData } from 'store/actions';
import * as Misc from 'components/Misc';
// import { Misc } from 'components';


class GroupCard extends React.Component {

	render () {
		const {name, count, eraseData} = this.props;
		return (
			<section
				className="card group"
				onClick={({target}) => {
					this.props.changeGroupModProps({
						mode: 'edit',
						entry: name
					})
					this.props.toggleGroupForm('open')
				}}
			>
				<p className="name">{name}</p>
				<p className="count">
					{`${count} contact${count > 1 ? 's' : ''}`}
				</p>
				<div className="modify">
					<button
						title="Edit"
						onClick={event => {
							event.stopPropagation()
							eraseData('groups', name)
						}}
					>
						<Misc.Icons.Delete />
					</button>
				</div>
			</section>
		);
	};
};

const mapDispatchToProps = {
	changeGroupModProps,
	toggleGroupForm,
	eraseData
};

GroupCard.defaultProps = {
	name: 'Unknown',
	count: 0
};

GroupCard.propTypes = {
	name: PropTypes.string.isRequired,
	count: PropTypes.number.isRequired,
	toggleGroupForm: PropTypes.func,
	changeGroupModProps: PropTypes.func,
	eraseData: PropTypes.func
};


export default connect(null, mapDispatchToProps)(GroupCard)
