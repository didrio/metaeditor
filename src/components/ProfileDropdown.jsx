import styled from 'styled-components';
import { useFirebase } from 'react-redux-firebase';
import FlexGroup from './common/FlexGroup';
import RouterLink from './common/RouterLink';
import { COLOR_LIGHT_GRAY } from '../constants';
import useAuth from '../hooks/useAuth';
import useUser from '../hooks/useUser';

function ProfileDropdown() {
  const firebase = useFirebase();
  const auth = useAuth();

  const handleLogout = () => {
    if (auth) {
      firebase.auth().signOut(auth);
    }
  };

  const user = useUser();
  const admin = user?.admin ?? false;

  return (
    <Container
      vertical
    >
      {!admin ? null : (
        <AdminLink
          to="admin"
        >
          Admin
        </AdminLink>
      )}
      <Link
        to="app"
      >
        Meta Data Editor
      </Link>
      <Link
        to="profile"
      >
        Edit Profile
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

const AdminLink = styled(Link)`
  & > a {
    color: red;
  }
`;

const Logout = styled(FlexGroup)`
  font-size: 19px;
  cursor: pointer;
`;

export default ProfileDropdown;
