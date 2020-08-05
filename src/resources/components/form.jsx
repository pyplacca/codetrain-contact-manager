import React from 'react'


class Form extends React.Component {
	closeForm ({target}) {
		if (target.classList.contains('form-modal')) {
			target.classList.toggle('hidden')
		}
	}
	render () {
		const {submitCallback, submit_name, title,  children} = this.props
		return (
			<div className="form-modal hidden" onClick={this.closeForm}>
				<div className="form-main">
					<h2 className="title">{title}</h2>
					<form onSubmit={submitCallback}>
						{children}
						<input type="submit" value={submit_name}/>
					</form>
				</div>
			</div>
		)
	}
}

Form.defaultProps = {
	submitCallback: () => {},
	submit_name: 'Submit'
}


export default Form
