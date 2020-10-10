import React from "react";
import { BrowserRouter, Route } from 'react-router-dom';
// import * as Misc from './components/Misc';
// import * as Pages from './components/Pages';
import { Misc, Pages } from 'components';


export default function Router () {
	return (
		<BrowserRouter>
			<Misc.ProtectedRoute
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
