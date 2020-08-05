import React from 'react'
import Button from 'button.jsx'


class ContactCard extends React.Component {

	render () {
		const {name, number} = this.props
		const buttons = [
			{icon: 'edit', action: null},
			{icon: 'delete', action: null}
		]
		<section className="card contact simple-view">
			<div>
				<p className="name">{name}</p>
				<p className="number">{number}</p>
			</div>
			<div className="modify">
				{
					buttons.map(({name, action}) =>
						<Button id={icon} {...icon} clickCallback={action}/>
					)
				}
			</div>
		</section>
	}
}

ContactCard.defaultProps = {
	name: 'Unknown'
}


export default ContactCard
