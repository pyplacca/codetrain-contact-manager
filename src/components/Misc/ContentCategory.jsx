import React from 'react'


export default function ContentCategory ({id, children}) {

	return (
		<div className="content-category" id={id}>
			{children}
		</div>
	);
};
