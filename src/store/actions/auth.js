export function logIn (using) {
	return (dispatch, getState, {fb}) => {
		// fb.auth()
		// .then()
		dispatch({
			type: 'LOG_IN',
			payload: {
				user: null
			}
		})
	}
}

export function signUp (using) {
	return (dispatch, getState, {fb}) => {
		dispatch({
			type: 'SIGN_UP',
			payload: {

			}
		})
	}
}

export function signOut () {
	return (dispatch, getState, {fb}) => {
		return null
	}
}
