export function signIn (using, credentials={}) {
	return (dispatch, getState, {fb}) => {
		const firebase = fb()
		if (using !== 'email') {
			const provider = using === 'google' ?
				firebase.auth.GoogleAuthProvider : (
					using === 'github' ?
					firebase.auth.GithubAuthProvider : (
						using === 'apple' ?
						firebase.auth.OAuthProvider : (
							using === 'twitter' ?
							firebase.auth.TwitterAuthProvider :
							firebase.auth.FacebookAuthProvider
						)
					)
				)
			firebase.auth().signInWithRedirect(new provider());
		} else {
			const {email, password} = credentials;
			firebase.auth().signInWithEmailAndPassword(email, password)
			.then(() => dispatch({
				type: 'SET_LOG_IN_ERROR',
				payload: null
			}))
			.catch(err => dispatch({
				type: 'SET_LOG_IN_ERROR',
				payload: err
			}))
		};
	};
};

export function signUp (email, password) {
	return (dispatch, getState, {fb}) => {
		fb().auth().createUserWithEmailAndPassword(email, password)
		.then(() => dispatch({
			type: 'SET_SIGN_UP_ERROR',
			payload: null
		}))
		.catch(err => dispatch({
			type: 'SET_SIGN_UP_ERROR',
			payload: err
		}));
	};
};

export function signOut () {
	return (dispatch, getState, {fb}) => {
		fb().auth().signOut();
	};
};
