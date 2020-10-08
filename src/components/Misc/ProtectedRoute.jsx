import React from 'react';
import { connect } from 'react-redux';
// import { Route, Redirect } from 'react-router-dom';

class ProtectedRoute extends React.Component {
	render () {
		// const {component:Page, ...other} = this.props;
		return null;
		/*return (
			<Route
				{...other}
				render={
					props => <Page {...props} />
				}
			/>
		);*/
	};
};

const mapStateToProps = state => ({
	fbauth: state.firebaseReducer.auth,
});

const mapDispatchToProps = {

};


export default connect(mapStateToProps, mapDispatchToProps)(ProtectedRoute);
