import React from 'react'


class GroupCard extends React.Component {

	render () {
		const {name, list, clickCallback} = this.props
		const total = list.length
		return (
			<section id={name} className="card group" onClick={clickCallback}>
				<p className="name">{name}</p>
				<p className="count">
					{`${total} contact${total > 1 ? 's' : ''}`}
				</p>
			</section>
		)
	}
}


export default GroupCard
