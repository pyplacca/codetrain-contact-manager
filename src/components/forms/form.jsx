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
			form_view,
			toggleFunc,
		} = this.props
		return (
			<div
				className={`form-modal ${className} ${form_view}`}
				onClick={({target}) => {
					if (target.classList.contains('form-modal')) {
						toggleFunc('closed')
					}
				}}
				id={id}
			>
				<div className={"form-main" + (className || '')}>
					{title ? <h2 className="title">{title}</h2> : null}
					<form onSubmit={submitCallback}>
						{children}
					</form>
				</div>
			</div>
		)
	}
}

const form = { Form, FormField }

export default form
