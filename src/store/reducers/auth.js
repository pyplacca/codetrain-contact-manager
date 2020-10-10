const authState = {
	isLoggingIn: true,
	isSigningUp: false,
	isLoggedIn: false,
	loggedInWith: '',
	isAuthenticating: false,
	user: undefined,
}


export default function authReducer (state=authState, action) {
	const {type, payload} = action;

	switch (type) {
		case 'USE_LOG_IN': return {
			...state,
			isLoggingIn: true,
			isSigningUp: false,
		}

		case 'USE_SIGN_UP': return {
			...state,
			isSigningUp: true,
			isLoggingIn: false
		}

		default: return state
	}
}
