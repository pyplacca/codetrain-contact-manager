import React from 'react';
// import "../../static/css/footer.css";
import "static/css/footer.css";


export default function Footer () {
	return (
		<footer className="Footer">
			<p>
				{
					'Contact Manager v' +
					process.env.REACT_APP_VERSION
				}
			</p>
			<div className="Footer__signature">
				<p>&copy; 2020 - David Placca - Codetrain Gen 14</p>
			</div>
		</footer>
	);
};
