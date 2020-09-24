import React from 'react'


class FormField extends React.Component {
	render() {
		const {label, children} = this.props
		return (
			<section className="field">
				{label ? <label>{label}</label> : null}
				{children}
			</section>
		)
	}
}


class Form extends React.Component {
	render () {
		const {
			title,
			children,
			id,
			className,
			submitCallback,
			closeCallback,
		} = this.props

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
				<div className={"form-main" + (className || '')}>
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
		)
	}
}

const form = { Form, FormField }

export default form
