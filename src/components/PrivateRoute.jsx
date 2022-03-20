import { Route, Redirect } from 'react-router-dom';
import { isLoaded, isEmpty } from 'react-redux-firebase';
import { useSelector } from 'react-redux';
import PropTypes from 'prop-types';

function PrivateRoute({ children, ...remainingProps }) {
  const auth = useSelector((state) => state.firebase.auth);
  return (
    <Route
      // eslint-disable-next-line react/jsx-props-no-spreading
      {...remainingProps}
      render={({ location }) => (isLoaded(auth) && !isEmpty(auth) ? (
        children
      ) : (
        <Redirect
          to={{
            pathname: '/',
            state: { from: location },
          }}
        />
      ))}
    />
  );
}

PrivateRoute.propTypes = {
  children: PropTypes.node.isRequired,
};

export default PrivateRoute;
