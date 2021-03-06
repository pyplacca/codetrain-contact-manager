import React from 'react';
import PropTypes from 'prop-types';
import 'static/css/header.css';


class Header extends React.Component {
	constructor (props) {
		super(props)
		this.state = {
			showMenu: false,
		};
	};

	render () {
		const {dp, name, signOutFunc} = this.props;

		return (
			<header className="Header">
				<h3 className="Header__app_title">
					{ process.env.REACT_APP_NAME }
				</h3>
				<div className="Header__profile">
					<img
						className="Header__profile__image"
						src={dp}
						alt="user profile"
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
						<p className="username" title={name}>{name || 'Unknown'}</p>
						<button
							className="signout_btn"
							onClick={signOutFunc}
						>Sign out</button>
					</div>
				</div>
			</header>
		);
	};
};

Header.defaultProps = {
	dp: "assets/images/user.png",
	name: 'Unknown',
}

Header.propTypes = {
	dp: PropTypes.string,
	name: PropTypes.string,
	signOutFunc: PropTypes.func
}


export default Header
