import React from 'react';
import { connect } from 'react-redux';
import { Route, Redirect } from 'react-router-dom';
import * as Misc from 'components/Misc';
// import { Misc } from 'components'

class ProtectedRoute extends React.Component {
	render () {
		const {component:Page, fbauth, ...other} = this.props;
		const {isLoaded, uid} = fbauth;

		if (!isLoaded) {
			return <Misc.Loading />
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
