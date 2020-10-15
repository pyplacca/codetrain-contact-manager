import React from "react";
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import { Containers, Pages } from 'components';


export default function Router () {
	return (
		<BrowserRouter>
			<Switch>
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
				<Route
					path="*"
					component={Pages.NotFound}
				/>
			</Switch>
		</BrowserRouter>
	);
};
