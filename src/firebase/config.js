import firebase from 'firebase';

console.log(process.env)
// Firebase configuration
var firebaseConfig = {
	apiKey: process.env.REACT_APP_API_KEY,
	authDomain: process.env.REACT_APP_AUTH_DOMAIN,
	databaseURL: process.env.REACT_APP_DB_URL,
	projectId: process.env.REACT_APP_PROJECT_ID,
	storageBucket: process.env.REACT_APP_STORAGE_BKT,
	messagingSenderId: process.env.REACT_APP_MSG_SNDR_ID,
	appId: process.env.REACT_APP_APP_ID,
	// For Firebase JS SDK v7.20.0 and later, measurementId is optional
	measurementId: process.env.REACT_APP_MEASUREMENT_ID
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);
// firebase.analytics();

export default firebase
