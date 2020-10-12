import React from "react";
import { BrowserRouter, Route } from 'react-router-dom';
import ProtectedRoute from './components/ProtectedRoute';
import App from './components/App';
import Login from './components/Login';
import Signup from './components/Signup';
// import { Misc, Pages } from 'components';


export default function Router () {
	return (
		<BrowserRouter>
			<ProtectedRoute
				exact
				path="/"
				component={App}
				// component={Pages.App}
			/>
			<Route
				path="/login"
				component={Login}
				// component={Pages.Login}
			/>
			<Route
				path="/signup"
				component={Signup}
				// component={Pages.Signup}
			/>
		</BrowserRouter>
	);
};
