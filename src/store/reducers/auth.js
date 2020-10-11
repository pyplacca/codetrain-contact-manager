const authState = {
	loginError: null,
	hasSetLoginError: false,
	signupError: null,
	hasSetSignupError: false,
}

export default function authReducer (state=authState, action) {
	const {type, payload} = action;
	switch (type) {

		case 'SET_LOG_IN_ERROR':
			return {
				...state,
				loginError: payload,
				hasSetLoginError: Boolean(payload)
			}

		case 'SET_SIGN_UP_ERROR':
			return {
				...state,
				signupError: payload,
				hasSetSignupError: Boolean(payload)
			}

		default: return state
	}
}
