import React from 'react';
import { Link } from 'react-router-dom';
import 'static/css/404.css';


export default function NotFound () {
	return (
		<div className="page404">
			<h1 className="text-404">404</h1>
			<p className="text">
				Seems you went through the wrong door
			</p>
			<p className="text">
				Allow me to take you back&nbsp;
				<Link
					to="/"
					className="redirect"
				>home</Link>
			</p>
		</div>
	)
}
