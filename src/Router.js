import React from "react";
import { BrowserRouter, Route } from 'react-router-dom';
import { Containers, Pages } from 'components';


export default function Router () {
	return (
		<BrowserRouter>
			<Containers.ProtectedRoute
				exact
				path="/"
				component={Pages.App}
			/>
			<Route
				path="/login"
				component={Pages.Login}
			/>
			<Route
				path="/signup"
				component={Pages.Signup}
			/>
		</BrowserRouter>
	);
};
