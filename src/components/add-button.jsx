import React from 'react'
import Icons from './icons.jsx'


class AddButton extends React.Component {
	render () {
		return (
			<button
				className="add"
				onClick={this.props.clickCallback}
			>
				<Icons.Add />
			</button>
		)
	}
}


export default AddButton
