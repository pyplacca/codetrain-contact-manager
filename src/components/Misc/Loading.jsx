import React from 'react'
// import '../../static/css/loading.css';
import 'static/css/loading.css';

export default function Loading () {
	return (
		<div className="Loading">
			<h2 className="Loading__text">Contact Manager</h2>
			<span className="loader" />
			<p className="Loading__signature">
				{'version ' +  process.env.REACT_APP_VERSION}
			</p>
		</div>
	)
}
