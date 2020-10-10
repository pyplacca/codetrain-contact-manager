import React from 'react';
// import { Icons } from './Icons';
import { Icons } from '.';


export class Add extends React.Component {
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
