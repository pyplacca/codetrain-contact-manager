import React from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router';
import { Forms, Misc } from 'components';
import { signUp } from 'store/actions';
import "static/css/signin.css";


class Login extends React.Component {
	constructor(props) {
		super(props)
		this.state = {
			loginInstead: false,
			isLoggingIn: false,
			// showPassword: false
			errorMsg: ''
		}
		this.signupWithEmail = this.signupWithEmail.bind(this)
		this.signupWithProvider = this.signupWithProvider.bind(this)
	}

	componentDidMount () {

	}

	signupWithProvider ({currentTarget}) {
		console.log(currentTarget.name)
	}

	signupWithEmail (event) {
		event.preventDefault()
		const {email, password, password2} = event.target.elements;
		if (password !== password2) {
			this.setState({
				errorMsg: 'Passwords do not match. Please try again.'
			})
		}
	}

	render () {
		const {loginInstead, errorMsg} = this.state
		return !loginInstead ? (
			<div className="Signin">
				<div className="Signin__container">
					<h1 className="title">Create an Account</h1>
					<p className="sub_title">
						Getting started here is easy. <br/> Just enter your email and a strong password.
					</p>
					<form onSubmit={this.signupWithEmail}>
						<p className="Signin__error">{errorMsg}</p>
						<Forms.form.InputField
							label="Email"
							inputAttrs={{
								type: 'email',
								name: 'email',
								placeholder: 'Enter email address',
								required: true,
								autoComplete: 'username',
							}}
						/>
						<Forms.form.InputField
							label="Password"
							inputAttrs={{
								type: 'password',
								name: 'password',
								placeholder: 'Enter password',
								required: true,
								autoComplete: 'new-password',
							}}
						/>
						<Forms.form.InputField
							label="Confirm password"
							inputAttrs={{
								type: 'password',
								name: 'password2',
								placeholder: 'Re-enter password',
								required: true,
								autoComplete: 'new-password'
							}}
						/>
						<input type="submit" value="Let's get started" />
					</form>
					<p className="Signin__or">or Sign up with</p>
					<div className="Signin__options">
						{
							['google', 'github', 'apple'].map((provider, i) =>
								<button
									className="option"
									name={provider}
									onClick={this.signupWithProvider}
									title={
										'Sign up with ' +
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
						Already have an account? &nbsp;
						<span
							className="anchor"
							onClick={
								event => {
									this.setState({loginInstead: true})
								}
							}
						>
							Log in instead
						</span>
					</p>
				</div>
				<Misc.Footer />
			</div>
		) : (
			<Redirect to={{pathname: '/login'}} />
		)
	};
};

const mapStateToProps = state => ({
	fbRdcr: state.firebaseReducer,
	authRdcr: state.authReducer,
})

const mapDispatchToProps = {
	signUp
}


export default connect(mapStateToProps, mapDispatchToProps)(Login);
