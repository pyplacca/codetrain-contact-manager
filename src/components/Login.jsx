import React from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
// import { Forms, Misc } from 'components';
import { InputField } from '../Forms/form';
import Loading from '../Misc/Loading';
import Footer from '../Misc/Footer';
// import { signIn } from 'store/actions';
import { signIn } from '../../store/actions';
// import "static/css/signin.css";
import "../../static/css/signin.css";


class Login extends React.Component {
	constructor(props) {
		super(props)
		this.state = {
			signupInstead: false,
			isLoggingIn: false,
			isAuthenticating: false,
			// showPassword: false
			error: null,
			errorMsg: '',
			hasSetErrorMsg: false
		}
		this.loginWithEmail = this.loginWithEmail.bind(this)
		this.loginWithProvider = this.loginWithProvider.bind(this)
	}

	loginWithProvider ({currentTarget}) {
		this.props.signIn(currentTarget.name)
	}

	loginWithEmail (event) {
		event.preventDefault()
		const {email, password} = event.target.elements;
		this.setState({isAuthenticating: true})
		this.props.signIn('email', {
			email: email.value,
			password: password.value
		});
	};

	setErrorMessage (error) {
		let [{code, message}, errorType] = [error,];
		[errorType, code] = code.split('/');

		if (errorType === 'auth') {
			const codeMsg = {
				'user-not-found': 'No login credentials found. ' +
					'You need to first have an account to login',

				'wrong-password': 'The password you entered is invalid',

				'timeout': 'Could not establish connection. ' +
					'Please check your network and try again'
			}
			message = codeMsg[code] || message
			this.setState({
				error,
				errorMsg: message,
				hasSetErrorMsg: true,
				isAuthenticating: false
			});
		}
	};

	render () {
		const {
			errorMsg, signupInstead, hasSetErrorMsg, error, isAuthenticating
		} = this.state;
		const {fbRdcr, loginError, hasSetLoginError} = this.props;
		const {auth, authError} = fbRdcr;

		if (!auth.isLoaded) {
			return <Loading />
		};

		if (auth.isLoaded && auth.uid) {
			return <Redirect to={{pathname: '/'}} />
		};

		const tmpError = authError || loginError;
		if (
			(tmpError && !hasSetErrorMsg) ||
			(hasSetLoginError && (error && error.code !== tmpError.code))
		) {
			this.setErrorMessage(tmpError);
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
						<InputField
							label="Email"
							inputAttrs={{
								type: 'email',
								name: 'email',
								placeholder: 'Enter your email address',
								required: true,
								autoComplete: 'username',
							}}
						/>
						<InputField
							label="Password"
							inputAttrs={{
								type: 'password',
								name: 'password',
								placeholder: 'Enter your password',
								required: true,
								autoComplete: 'current-password',
							}}
						/>
						<input type="submit" value="Log in" tabIndex="0" />
					</form>
					<p className="Signin__or">or Log in with</p>
					<div className="Signin__options">
						{
							['google', 'github', 'facebook'].map((provider, i) =>
								<button
									className="option"
									name={provider}
									onClick={this.loginWithProvider}
									title={
										'Log in with ' +
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
						Dont have an account? &nbsp;
						<span
							className="anchor"
							onClick={
								event => {
									this.setState({signupInstead: true})
								}
							}
							tabIndex="0"
						>
							Create one
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
			<Redirect to={{pathname: '/signup'}} />
		)
	};
};

const mapStateToProps = state => {
	const {loginError, hasSetLoginError} = state.authReducer;
	return {
		fbRdcr: state.firebaseReducer,
		loginError,
		hasSetLoginError
	};
};

const mapDispatchToProps = {
	signIn,
};


export default connect(mapStateToProps, mapDispatchToProps)(Login);
