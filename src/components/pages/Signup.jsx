import React from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router';
import { InputField } from '../objects/form';
// import Loading from './Loading';
import Footer from '../containers/Footer';
// import { Forms, Misc } from 'components';
import { signUp, signIn } from '../../store/actions';
// import { signUp, signIn } from 'store/actions';
import "../../static/css/signin.css";
// import "static/css/signin.css";


class Signup extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			loginInstead: false,
			isLoggingIn: false,
			isAuthenticating: false,
			// showPassword: false
			error: null,
			errorMsg: '',
			hasSetError: false,
		};
		this.signupWithEmail = this.signupWithEmail.bind(this);
		this.signupWithProvider = this.signupWithProvider.bind(this);
	}

	signupWithProvider ({currentTarget}) {
		this.props.signIn(currentTarget.name);
	}

	signupWithEmail (event) {
		event.preventDefault()
		const {email, password, password2} = event.target.elements;
		const check = this.checkPassword(password.value, password2.value);
		if (!check.code) {
			this.setState({isAuthenticating: true})
			this.props.signUp(email.value, password.value);
		} else {
			this.setErrorMessage(check)
		}
	};

	setErrorMessage (error) {
		let [{code, /*email,*/ message}, errorType] = [error,];
		[errorType, code] = code.split('/');
		// console.log(error)

		if (errorType === 'auth') {
			// 'An account already exists with' + email +
			// 'Please log in instead with the credentials linked to that email'
			this.setState({
				error,
				errorMsg: message,
				hasSetError: true,
				isAuthenticating: false
			});
		}
	}

	checkPassword(pw1, pw2) {
		return pw1.length < 6 ? {
			message: 'Password too short. Must be at least 6 characters long',
			code: 'auth/short-password'
		} : (
			pw1 !== pw2 ? {
				message: 'Passwords do not match. Please check and try again',
				code: 'auth/password-mismatch'
			} : {}
		)
	}

	render () {
		const {
			loginInstead, errorMsg, hasSetError, error, isAuthenticating
		} = this.state;
		const {fbRdcr, signupError, hasSetSignupError} = this.props;
		const {auth, authError} = fbRdcr;

		// if (!auth.isLoaded) {
		// 	return <Loading />
		// };

		if (!auth.isLoaded || (auth.isLoaded && auth.uid)) {
			return <Redirect to={{pathname: '/'}} />
		};

		const tmpError = authError || signupError;
		if (
			(tmpError && !hasSetError) ||
			(hasSetSignupError && (error && error.code !== tmpError.code))
		) {
			this.setErrorMessage(tmpError)
		}

		return !loginInstead ? (
			<div className="Signin">
				<div className="Signin__container">
					<h1 className="title">Create an Account</h1>
					<p className="sub_title">
						Getting started here is easy.
						<br/>
						Just enter your email and a strong password.
					</p>
					<form onSubmit={this.signupWithEmail}>
						<p className="Signin__error">{errorMsg}</p>
						<InputField
							label="Email"
							inputAttrs={{
								type: 'email',
								name: 'email',
								placeholder: 'Enter email address',
								required: true,
								autoComplete: 'username',
							}}
						/>
						<InputField
							label="Password"
							inputAttrs={{
								type: 'password',
								name: 'password',
								placeholder: 'Enter password',
								required: true,
								autoComplete: 'new-password',
							}}
						/>
						<InputField
							label="Confirm password"
							inputAttrs={{
								type: 'password',
								name: 'password2',
								placeholder: 'Re-enter password',
								required: true,
								autoComplete: 'new-password'
							}}
						/>
						<input type="submit" value="Sign Up" tabIndex="0" />
					</form>
					<p className="Signin__or">or Sign up with</p>
					<div className="Signin__options">
						{
							['google', 'github', 'facebook'].map((provider, i) =>
								<button
									className="option"
									name={provider}
									onClick={this.signupWithProvider}
									title={
										'Sign up with ' +
										provider[0].toUpperCase() +
										provider.substring(1)
									}
									tabIndex="0"
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
							tabIndex="0"
						>
							Log in instead
						</span>
					</p>
					{
						isAuthenticating ?
						<span className="loader" /> :
						null
					}
				</div>
				<Footer />
			</div>
		) : (
			<Redirect to={{pathname: '/login'}} />
		)
	};
};

const mapStateToProps = state => {
	// console.log(state)
	const {signupError, hasSetSignupError} = state.authReducer
	return {
		fbRdcr: state.firebaseReducer,
		signupError,
		hasSetSignupError
	}
}

const mapDispatchToProps = {
	signUp,
	signIn
}


export default connect(mapStateToProps, mapDispatchToProps)(Signup);
