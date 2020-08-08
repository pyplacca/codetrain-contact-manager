import React from 'react'
// import { unmountComponentAtNode } from 'react-dom'
import Icons from '../icons.jsx'


class ContactCard extends React.Component {

	render () {
		const {info, clickCallback} = this.props
		return (
			<section
				id={info.id}
				className="card contact"
				onClick={clickCallback}
			>
				<div className="info">
					<h4 className="name">{info.name || info.number}</h4>
					<p className="number">{info.number}</p>
				</div>
				<div className="modify">
					<button onClick={this.editContact} title="Edit">
						<Icons.Edit />
					</button>
					<button onClick={this.deleteContact} title="Delete">
						<Icons.Delete />
					</button>
				</div>
			</section>
		)
	}
}


export default ContactCard
