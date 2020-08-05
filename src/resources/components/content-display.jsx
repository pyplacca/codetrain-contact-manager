import React from 'react'


class ContentDisplay extends React {

	render () {
		return (
			<div className="display">
				{this.props.children}
			</div>
		)
	}
}


export default ContentDisplay
