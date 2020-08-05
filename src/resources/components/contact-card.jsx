import React from 'react'
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
					<button>
						<Icons.Edit />
					</button>
					<button>
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
