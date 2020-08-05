import React from 'react'
import Icons from '../icons.jsx'


class Button extends React.Component {
	constructor (props) {
		super(props)

		const {icon} = this.props
		if (icon && Icons[icons]) {
			console.warn(`Icon "${icon}" doesn't exist`)
		}
	}

	render () {
		let {icon, clickCallback, id} = this.props
		icon = icon[0].toUpperCase() + icon.substring(1)
		return (
			<button id={id || null} className="btn" onClick={clickCallback}>
				<Icons[icon] />
			</button>
		)
	}
}

Button.defaultProps = {
	clickCallback: null,
	icon: undefined,
}


export default Button
