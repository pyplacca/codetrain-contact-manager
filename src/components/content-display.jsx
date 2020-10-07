import React from 'react'


export class ContentDisplay extends React.Component {

	render () {
		return (
			<div className="content-display">
				{this.props.children}
			</div>
		)
	}
}
