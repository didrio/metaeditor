import { useState } from 'react';
import styled from 'styled-components';
import FlexGroup from './common/FlexGroup';
import FlexItem from './common/FlexItem';
import RouterLink from './common/RouterLink';
import useAuth from '../hooks/useAuth';
import ProfileDropdown from './ProfileDropdown';

function NavBar() {
  const [dropdownActive, setDropdownActive] = useState(false);
  const auth = useAuth();

  const handleMouseEnter = () => {
    setDropdownActive(true);
  };

  const handleMouseLeave = () => {
    setDropdownActive(false);
  };

  return (
    auth ? (
      <Container
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
      >
        <ProfileContainer>
          Profile
        </ProfileContainer>
        {!dropdownActive ? null : (
          <DropdownContainer>
            <ProfileDropdown />
          </DropdownContainer>
        )}
      </Container>
    ) : (
      <Container>
        <FlexGroup>
          <FlexItem>
            <Link to="/login">Login</Link>
          </FlexItem>
          <FlexItem>
            <Link to="/signup">Sign up</Link>
          </FlexItem>
        </FlexGroup>
      </Container>
    )
  );
}

const Container = styled(FlexGroup)`
  position: relative;
  align-items: center;
  justify-content: flex-end;
  height: 100%;
  width: 200px;
`;

const Link = styled(RouterLink)`
  margin-left: 15px;
`;

const DropdownContainer = styled(FlexGroup)`
  position: absolute;
  left: 60px;
  top: 50px;
  width: 300px;
`;

const ProfileContainer = styled(FlexItem)`
  font-size: 19px;
  letter-spacing: -1px;
  text-decoration: underline;
  cursor: pointer;
`;

export default NavBar;
