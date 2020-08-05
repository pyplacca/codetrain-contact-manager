import React from 'react'


class Form extends React.Component {
	closeForm ({target}) {
		if (target.classList.contains('form-modal')) {
			target.classList.toggle('hidden')
		}
	}

	render () {
		const {submit_name, title,  children, id} = this.props
		return (
			<div className="form-modal hidden" onClick={this.closeForm} id={id}>
				<div className="form-main">
					<h2 className="title">{title}</h2>
					<form onSubmit={null}>
						{children}
						<input type="submit" value={submit_name}/>
					</form>
				</div>
			</div>
		)
	}
}

Form.defaultProps = {
	submit_name: 'Submit'
}


export default Form
