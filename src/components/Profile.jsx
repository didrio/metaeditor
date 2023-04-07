import {
  useCallback, useState, useEffect,
} from 'react';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';
import { useFirebase } from 'react-redux-firebase';
import isEmpty from 'lodash/isEmpty';
import TextInput from './common/TextInput';
import FlexGroup from './common/FlexGroup';
import Button from './common/Button';
import useAuth from '../hooks/useAuth';
import useUser from '../hooks/useUser';
import {
  COLOR_LIGHT_GRAY,
} from '../constants';

function Profile() {
  const [artist, setArtist] = useState('');
  const [affiliates, setAffiliates] = useState('');
  const [splits, setSplits] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [comments, setComments] = useState('');
  const [contactName, setContactName] = useState('');
  const [producer, setProducer] = useState('');

  const auth = useAuth();
  const firebase = useFirebase();
  const navigate = useNavigate();
  const user = useUser();

  useEffect(() => {
    if (user !== null) {
      setAffiliates(user.affiliates || '');
      setSplits(user.splits || '');
      setArtist(user.artist || '');
      setProducer(user.producer || '');
      setContactName(user.name || '');
      setEmail(user.contactEmail || '');
      setPhone(user.phone || '');
      setComments(user.comments || '');
    }
  }, [user]);

  useEffect(() => {
    if (auth === false) {
      navigate('/');
    }
  }, [auth, navigate]);

  const handleSave = useCallback(() => {
    const run = async () => {
      const userEmail = auth?.email ?? '';
      if (!isEmpty(userEmail)) {
        const db = firebase.firestore();
        const query = await db.collection('users').where('email', '==', userEmail).get();
        if (!isEmpty(query?.docs ?? [])) {
          const docRef = query.docs[0];
          await docRef.ref.update({
            artist,
            affiliates,
            comments,
            contactEmail: email,
            name: contactName,
            phone,
            producer,
            splits,
          });
        }
      }
    };
    run();
  }, [auth, firebase, artist, affiliates, splits, email, phone, comments, contactName, producer]);

  return (
    <Container>
      <Header>
        Edit Profile
      </Header>
      <FormContainer>
        <FieldContainer>
          <SubHeader>
            Set Default Values:
          </SubHeader>
        </FieldContainer>
        <FieldContainer>
          <FieldTitle>
            Artist Name
          </FieldTitle>
          <FieldTextInput
            hasBorder
            onChange={setArtist}
            value={artist}
          />
          <Disclaimer>
            Singer on the track (comma separate multiple artists)
          </Disclaimer>
        </FieldContainer>
        <FieldContainer>
          <FieldTitle>
            Composers, Affiliates, Publishing
          </FieldTitle>
          <FieldTextInput
            hasBorder
            onChange={setAffiliates}
            value={affiliates}
          />
          <Disclaimer>
            Example: John Doe Merf Music publishing BMI (comma separate multiple composers)
          </Disclaimer>
        </FieldContainer>
        <FieldContainer>
          <FieldTitle>
            Producer
          </FieldTitle>
          <FieldTextInput
            hasBorder
            onChange={setProducer}
            value={producer}
          />
          <Disclaimer>
            Example: John Doe Merf Music publishing BMI (comma separate multiple composers)
          </Disclaimer>
        </FieldContainer>
        <FieldContainer>
          <FieldTitle>
            Splits/Shares
          </FieldTitle>
          <FieldTextInput
            hasBorder
            onChange={setSplits}
            value={splits}
          />
          <Disclaimer>
            Example: 50%/50% or 33.3%/33.3%/34%
          </Disclaimer>
        </FieldContainer>
        <FieldContainer>
          <FieldTitle>
            Contact Name
          </FieldTitle>
          <FieldTextInput
            hasBorder
            onChange={setContactName}
            value={contactName}
          />
        </FieldContainer>
        <FieldContainer>
          <FieldTitle>
            Contact Email
          </FieldTitle>
          <FieldTextInput
            hasBorder
            onChange={setEmail}
            value={email}
          />
        </FieldContainer>
        <FieldContainer>
          <FieldTitle>
            Contact Phone
          </FieldTitle>
          <FieldTextInput
            hasBorder
            onChange={setPhone}
            value={phone}
          />
        </FieldContainer>
        <FieldContainer>
          <FieldTitle>
            Comments
          </FieldTitle>
          <FieldTextInput
            hasBorder
            onChange={setComments}
            value={comments}
          />
          <Disclaimer>
            Any comments you&apos;d like about the song
          </Disclaimer>
        </FieldContainer>
        <FieldContainer>
          <Button
            onClick={handleSave}
          >
            Save
          </Button>
        </FieldContainer>
      </FormContainer>
    </Container>
  );
}

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  font-size: 14px
  color: #a70003;
`;

const Header = styled.h1`
  display: inline;
  margin-top: 0px;
  margin-bottom: 10px;
  font-size: 24px;
  color: #a70003;
`;

const SubHeader = styled.h2`
  margin: 0;
  margin-bottom: 10px;
`;

const FormContainer = styled.div`
  min-width: 70%;
  max-width: 95%;
  background-color: ${COLOR_LIGHT_GRAY};
  padding: 20px;
  border-radius: 5px;
  box-shadow: 2px 2px 3px rgba(0, 0, 0, 0.1);
  border: 1px solid #ccc;
  align-items: center;
  margin-bottom: 60px;
  margin-top: 20px;
  color: #a70003;
`;

const FieldContainer = styled.div`
  display: flex;
  flex-direction: column;
  margin-bottom: 40px;
  margin-top: 30px;
`;

const FieldTitle = styled(FlexGroup)`
  font-weight: bold;
  margin-bottom: 10px;
  align-items: center;
  color: #a70003;
  margin-left: 5px;
  font-size: 16px;
`;

const FieldTextInput = styled(TextInput)`
  border: 1px solid #aaa;
  outline-color: #777;
  height: 16px;
  padding: 5px 10px;
`;

const Disclaimer = styled.div`
  color: #a70003;
  font-size: 11px;
  margin-top: 10px;
  font-weight: 500;
`;

export default Profile;
