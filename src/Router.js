import React from "react";
import { BrowserRouter, Route } from 'react-router-dom';
import ProtectedRoute from './components/Misc/ProtectedRoute';
import App from './components/Pages/App';
import Login from './components/Pages/Login';
import Signup from './components/Pages/Signup';
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
