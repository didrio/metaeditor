/* eslint-disable max-len */
import { useEffect } from 'react';
import styled from 'styled-components';
import noop from 'lodash/noop';
import { useNavigate } from 'react-router-dom';
import FlexGroup from './common/FlexGroup';
import TextInput from './common/TextInput';
import useAuth from '../hooks/useAuth';

function Profile() {
  const auth = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (auth === false) {
      navigate('/');
    }
  }, [auth, navigate]);

  return (
    <Container
      vertical
    >
      Edit Profile
      <TextInputContainer
        onChange={noop}
        value="Andrew Harris"
      />
    </Container>
  );
}

const Container = styled(FlexGroup)`

`;

const TextInputContainer = styled(TextInput)`
  margin-bottom: 20px;
`;

export default Profile;
