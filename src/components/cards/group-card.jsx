import React from 'react'


class GroupCard extends React.Component {

	render () {
		const {name, list} = this.props
		const total = list.length
		return (
			<section className="card group simple-view">
				<p className="name">{name}</p>
				<p className="count">
					{`${total} person${total > 1 ? 's' : ''}`}
				</p>
			</section>
		)
	}
}


export default GroupCard
