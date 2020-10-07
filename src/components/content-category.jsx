import React from 'react'


export class ContentCategory extends React.Component {

	render () {
		const {id, children} = this.props
		return (
			<div className="content-category" id={id}>
				{children}
			</div>
		)
	}
}
