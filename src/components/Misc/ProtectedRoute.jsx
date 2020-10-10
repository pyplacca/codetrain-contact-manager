import React from 'react';
import { connect } from 'react-redux';
import { Route, Redirect } from 'react-router-dom';
// import { Log}
import { Pages, Misc } from 'components'

class ProtectedRoute extends React.Component {
	render () {
		const {component:Page, frbauth, ...other} = this.props;
		console.log(frbauth)
		const {isLoaded, uid} = frbauth;
		// return <Redirect to={{pathname: 'login'}} />
		// return <Misc.Loading />
		if (!isLoaded) {
			return <Misc.Loading />
		}
		if (isLoaded && uid) {
			return (
				<Route
					{...other}
					render={
						props => <Page {...props} />
					}
				/>
			);
		}
		return <Route {...other} component={Pages.Login} />
	};
};

const mapStateToProps = state => ({
	frbauth: state.firebaseReducer.auth,
});

const mapDispatchToProps = {

};


export default connect(mapStateToProps, mapDispatchToProps)(ProtectedRoute);
