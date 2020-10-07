import React from 'react'
import { icons } from '.'


export class AddButton extends React.Component {
	render () {
		return (
			<button
				className="add"
				onClick={this.props.clickCallback}
			>
				<icons.Add />
			</button>
		)
	}
}
