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
          <FlexItem>
            <Link to="/faq">FAQ</Link>
          </FlexItem>
          <FlexItem
            onClick={handleClose}
          >
            <Link to="/login">Login</Link>
          </FlexItem>
          <FlexItem>
            <Link to="/signup">Register</Link>
          </FlexItem>
        </FlexGroup>
      </Container>
    )
  );
}

const Container = styled(FlexGroup)`
  color: #a70003;
  position: relative;
  align-items: center;
  justify-content: flex-end;
  height: 130px;
`;

const Link = styled(RouterLink)`
  color: #a70003;
  margin-left: 20px;
`;

const DropdownContainer = styled(FlexGroup)`
  position: absolute;
  left: 60px;
  top: 50px;
  width: 300px;
  display: ${getDropdownHeight};
`;

export default NavBar;
