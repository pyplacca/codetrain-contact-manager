import React from 'react';
import { connect } from 'react-redux';
import { Route, Redirect } from 'react-router-dom';
// import { Misc } from 'components'

class ProtectedRoute extends React.Component {
	render () {
		const {component:Page, fbauth, ...other} = this.props;
		const {isLoaded, uid} = fbauth;

		if (!isLoaded) {
			return null
		}
		if (isLoaded) {
			if (uid) {
				return <Route
					{...other}
					render={
						props => <Page {...props} />
					}
				/>
			}
			return <Redirect to={{pathname: '/login'}} />
		}
	};
};

const mapStateToProps = state => ({
	fbauth: state.firebaseReducer.auth,
});

export default connect(mapStateToProps, null)(ProtectedRoute);
