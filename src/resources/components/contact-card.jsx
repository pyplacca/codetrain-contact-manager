import React from 'react'
// import { unmountComponentAtNode } from 'react-dom'
import Icons from '../icons.jsx'


class ContactCard extends React.Component {

	render () {
		const {name, number} = this.props.info
		return (
			<section className="card simple-view">
				<div className="info">
					<h4 className="name">{name}</h4>
					<p className="number">{number}</p>
				</div>
				<div className="modify">
					<button onClick={this.editContact}>
						<Icons.Edit />
					</button>
					<button onClick={this.deleteContact}>
						<Icons.Delete />
					</button>
				</div>
			</section>
		)
	}
}

ContactCard.defaultProps = {
	name: 'Unknown'
}


export default ContactCard
