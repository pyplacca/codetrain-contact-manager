import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import { Provider } from 'react-redux'
import { createStore, compose, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import { /*getFirebase,*/ reactReduxFirebase } from 'react-redux-firebase';
import { getFirestore, reduxFirestore } from 'redux-firestore';
import * as serviceWorker from './serviceWorker';
import firebase from './firebase/config';
import reducer from './store/reducer';


// integrate firebase with redux store
const store = createStore(
	reducer,
	// middleware
	compose(
		applyMiddleware(thunk.withExtraArgument({
			// getFirebase,
			db: getFirestore
		})),
		reduxFirestore(firebase),
		reactReduxFirebase(firebase),
	)
)

ReactDOM.render(
	<React.StrictMode>
		<Provider store={store}>
			<App />
		</Provider>
	</React.StrictMode>,
	document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
