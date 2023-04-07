import styled from 'styled-components';
import { useFirebase } from 'react-redux-firebase';
import FlexGroup from './common/FlexGroup';
import RouterLink from './common/RouterLink';
import { COLOR_LIGHT_GRAY } from '../constants';
import useAuth from '../hooks/useAuth';

function ProfileDropdown() {
  const firebase = useFirebase();
  const auth = useAuth();

  const handleLogout = () => {
    if (auth) {
      firebase.auth().signOut(auth);
    }
  };

  return (
    <Container
      vertical
    >
      <Link
        to="app"
      >
        Metadata Tool
      </Link>
      <Link
        to="profile"
      >
        My Profile
      </Link>
      <Logout
        onClick={handleLogout}
      >
        Logout
      </Logout>
    </Container>
  );
}

const Container = styled(FlexGroup)`
  background-color: ${COLOR_LIGHT_GRAY};
  padding: 10px;
`;

const Link = styled(RouterLink)`
  margin-bottom: 10px;
`;

const Logout = styled(FlexGroup)`
  font-size: 19px;
  cursor: pointer;
`;

export default ProfileDropdown;
