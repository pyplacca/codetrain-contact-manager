import React from 'react'
import { connect } from 'react-redux'
import { changeGroupModProps, toggleGroupForm } from '../../store/actions'


class GroupCard extends React.Component {

	render () {
		const {name, count} = this.props
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
			</section>
		)
	}
}

const mapDispatchToProps = {
	changeGroupModProps,
	toggleGroupForm
}


export default connect(null, mapDispatchToProps)(GroupCard)
