import React from 'react';
import 'static/css/header.css';


class Header extends React.Component {
	constructor (props) {
		super(props)
		this.state = {
			showMenu: false,
		}
	}

	render () {
		const {dp, name, signOutFunc} = this.props
		return (
			<header className="Header">
				<div className="Header__profile">
					<img
						className="Header__profile__image"
						src={dp || "assets/images/user.png"}
						alt="profile image"
						onClick={
							() => this.setState({
								showMenu: !this.state.showMenu
							})
						}
					/>
					<div className={
						"Header__profile__menu" +
						(this.state.showMenu ? ' show' : '')
					}>
						<p className="username">{name}</p>
						<button
							className="signout_btn"
							onClick={signOutFunc}
						>Sign out</button>
					</div>
				</div>
			</header>
		)
	}
}


export default Header
