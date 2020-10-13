import React from 'react';


export function InputField ({label, children, inputAttrs}) {
	return (
		<section className="field">
			{ label ? <label>{label}</label> : null }
			{ inputAttrs ? <input {...inputAttrs} /> : null }
			{ children }
		</section>
	);
};

export function Form ({
	children,
	className,
	closeCallback,
	id,
	submitCallback,
	title,
}) {
	return (
		<div
			className="form-modal"
			onClick={event => {
				event.stopPropagation()
				if (event.target.classList.contains('form-modal')) {
					closeCallback()
				}
			}}
			id={id}
		>
			<div className={"form-main " + (className || '')}>
				{title ? <h2 className="title">{title}</h2> : null}
				{
					<span
						className="close-icon"
						role="img"
						aria-label="icon"
						aria-hidden="true"
						onClick={closeCallback}
					>&#x274C;</span>
				}
				<form id={id} onSubmit={submitCallback}>
					{children}
				</form>
			</div>
		</div>
	);
};
