import React from 'react'
import 'static/css/loading.css';

export default function Loading () {
	return (
		<div className="Loading">
			<h2 className="Loading__text">Contact Manager</h2>
			<span className="Loading__loader" />
			<p className="Loading__signature">
				version 4.0.1
			</p>
		</div>
	)
}
