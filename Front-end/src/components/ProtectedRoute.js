import { Route, Redirect } from 'react-router-dom';

const ProtectedRoute = ({isAuthenticated, Component, path}) => {

    return (
        <Route
        exact
        path={path} 
        render={props => (
            isAuthenticated ?
              <Component {...props} /> :
              <Redirect to='/login' />
          )}
        />
    )
};

export default ProtectedRoute;