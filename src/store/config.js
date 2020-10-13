import firebase from 'firebase/config';
import {
	createStore,
	compose,
	applyMiddleware,
	combineReducers
} from 'redux';
import thunk from 'redux-thunk';
import {
	getFirebase,
	reactReduxFirebase,
	firebaseReducer
} from 'react-redux-firebase';
import { getFirestore, reduxFirestore } from 'redux-firestore';
import { mainReducer, authReducer } from './reducers'


// integrate firebase with redux store
export default createStore(
	combineReducers({
		firebaseReducer,
		mainReducer,
		authReducer,
	}),
	// middleware
	compose(
		applyMiddleware(thunk.withExtraArgument({
			fb: getFirebase,
			db: getFirestore
		})),
		reduxFirestore(firebase),
		reactReduxFirebase(firebase),
	)
);
