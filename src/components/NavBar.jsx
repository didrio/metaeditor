import { Link } from 'react-router-dom';
import styled from 'styled-components';
import FlexGroup from './common/FlexGroup';
import FlexItem from './common/FlexItem';

function NavBar() {
  return (
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
  );
}

const Container = styled.div`
  border: 1px solid blue;
`;

export default NavBar;
