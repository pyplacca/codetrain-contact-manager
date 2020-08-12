import React from 'react'
// import { unmountComponentAtNode } from 'react-dom'
import Icons from '../icons.jsx'


class ContactCard extends React.Component {

	render () {
		const {
			info,
			previewCallback,
			editCallback,
			deleteCallback
		} = this.props

		return (
			<section
				id={info.id}
				className="card contact"
				onClick={(event) => {
					event.stopPropagation()
					previewCallback(event.target.id)
				}}
			>
				<div className="info">
					<h4 className="name">{info.name || info.number}</h4>
					<p className="number">{info.number}</p>
				</div>
				<div className="modify">
					<button
						onClick={event => {
							event.stopPropagation()
							editCallback(event.target.parentNode.parentNode.id)
						}}
						title="Edit"
					>
						<Icons.Edit />
					</button>
					<button
						onClick={event => {
							event.stopPropagation()
							deleteCallback(event.target.parentNode.parentNode.id)
						}}
						title="Delete">
						<Icons.Delete />
					</button>
				</div>
			</section>
		)
	}
}


export default ContactCard
