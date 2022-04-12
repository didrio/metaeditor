import { useState } from 'react';
import styled from 'styled-components';
import Hamburger from 'hamburger-react';
import FlexGroup from './common/FlexGroup';
import FlexItem from './common/FlexItem';
import RouterLink from './common/RouterLink';
import useAuth from '../hooks/useAuth';
import ProfileDropdown from './ProfileDropdown';

const getDropdownHeight = ({ active }) => (active ? 'auto' : 'none');

function NavBar() {
  const [dropdownActive, setDropdownActive] = useState(false);
  const auth = useAuth();

  const handleToggle = () => {
    setDropdownActive((prev) => !prev);
  };

  const handleClose = () => {
    setDropdownActive(false);
  };

  return (
    auth ? (
      <Container>
        <Hamburger
          toggle={handleToggle}
          toggled={dropdownActive}
        />
        <DropdownContainer
          active={dropdownActive}
        >
          <ProfileDropdown />
        </DropdownContainer>
      </Container>
    ) : (
      <Container>
        <FlexGroup>
          <FlexItem
            onClick={handleClose}
          >
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
  display: ${getDropdownHeight};
`;

export default NavBar;
