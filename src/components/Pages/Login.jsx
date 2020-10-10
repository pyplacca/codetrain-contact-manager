import React from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import { Forms, Misc } from 'components';
import { logIn } from 'store/actions';
import "static/css/signin.css";


class Login extends React.Component {
	constructor(props) {
		super(props)
		this.state = {
			signupInstead: false,
			isLoggingIn: false,
			// showPassword: false
			errorMsg: ''
		}
		this.loginWithEmail = this.loginWithEmail.bind(this)
		this.loginWithProvider = this.loginWithProvider.bind(this)
	}

	componentDidMount () {

	}

	loginWithProvider ({currentTarget}) {
		console.log(currentTarget.name)
	}

	loginWithEmail (event) {
		event.preventDefault()
		// const {email, password, password2} = event.target.elements;
	}

	render () {
		const {errorMsg, signupInstead} = this.state;
		const {auth} = this.props.fbRdcr;
		console.log(this.props.fbRdcr)
		if (!auth.isLoaded) {
			return <Misc.Loading />
		};

		if (auth.isLoaded && auth.uid) {
			return <Redirect to={{pathname: '/'}} />
		};

		return !signupInstead ? (
			<div className="Signin">
				<div className="Signin__container">
					<h1 className="title">Welcome Back</h1>
					<p className="sub_title">
						Enter the credentials linked to your account and hop right in
					</p>
					<form onSubmit={this.loginWithEmail}>
						<p className="Signin__error">{errorMsg}</p>
						<Forms.form.InputField
							label="Email"
							inputAttrs={{
								type: 'email',
								name: 'email',
								placeholder: 'Enter your email address',
								required: true,
								autoComplete: 'username',
							}}
						/>
						<Forms.form.InputField
							label="Password"
							inputAttrs={{
								type: 'password',
								name: 'password',
								placeholder: 'Enter your password',
								required: true,
								autoComplete: 'current-password',
							}}
						/>
						<input type="submit" value="Log in" />
					</form>
					<p className="Signin__or">or Log in with</p>
					<div className="Signin__options">
						{
							['google', 'github', 'apple'].map((provider, i) =>
								<button
									className="option"
									name={provider}
									onClick={this.loginWithProvider}
									title={
										'Log in with ' +
										provider[0].toUpperCase() +
										provider.substring(1)
									}
									key={i}
								>
									<img
										src={`assets/logos/${provider}.png`}
										alt={`${provider} logo`}
									/>
								</button>
							)
						}
					</div>
					<p className="instead">
						Dont have an account? &nbsp;
						<span
							className="anchor"
							onClick={
								event => {
									this.setState({signupInstead: true})
								}
							}
						>
							Create one
						</span>
					</p>
				</div>
				<Misc.Footer />
			</div>
		) : (
			<Redirect to={{pathname: '/signup'}} />
		);
	};
};

const mapStateToProps = state => ({
	fbRdcr: state.firebaseReducer,
})

const mapDispatchToProps = {
	logIn,
}


export default connect(mapStateToProps, mapDispatchToProps)(Login);
