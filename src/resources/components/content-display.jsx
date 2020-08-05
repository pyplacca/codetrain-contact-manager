import React from 'react'


class ContentDisplay extends React.Component {

	render () {
		return (
			<div className="display">
				{this.props.children}
			</div>
		)
	}
}


export default ContentDisplay
