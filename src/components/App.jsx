import {
  useCallback, useState, useMemo, useEffect,
} from 'react';
import styled from 'styled-components';
import ID3Writer from 'browser-id3-writer';
import { saveAs } from 'file-saver';
import { useNavigate } from 'react-router-dom';
import { useFirebase } from 'react-redux-firebase';
import isEmpty from 'lodash/isEmpty';
import TextInput from './common/TextInput';
import ImageInput from './common/ImageInput';
import LoadingAnimation from './common/LoadingAnimation';
import FlexGroup from './common/FlexGroup';
import Button from './common/Button';
import useAuth from '../hooks/useAuth';
import useUser from '../hooks/useUser';
import {
  COLOR_BLACK,
  COLOR_LIGHT_GRAY,
  COLOR_RED,
} from '../constants';

const confirmMessage = `
Downloading the .mp3 file will use 1 of your credits.
Ensure all your fields are correct before downloading.
`;

const getBoolValue = (value) => (value === true ? 'Yes' : 'No');

function App() {
  const [file, setFile] = useState(null);
  const [image, setImage] = useState(null);
  const [title, setTitle] = useState('');
  const [artist, setArtist] = useState('');
  const [genre, setGenre] = useState('');
  const [tempo, setTempo] = useState('');
  const [affiliates, setAffiliates] = useState('');
  const [ipi, setIpi] = useState('');
  const [clearance, setClearance] = useState(true);
  const [oneStop, setOneStop] = useState(false);
  const [splits, setSplits] = useState('');
  const [isrc, setIsrc] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [comments, setComments] = useState('');
  const [contactName, setContactName] = useState('');
  const [credits, setCredits] = useState(false);
  const [producer, setProducer] = useState('');
  const [tier, setTier] = useState(null);

  const auth = useAuth();
  const firebase = useFirebase();
  const navigate = useNavigate();
  const user = useUser();

  useEffect(() => {
    if (user !== null) {
      setCredits(user.credits);
      setAffiliates(user.affiliates);
      setSplits(user.splits);
      setArtist(user.artist);
      setProducer(user.producer);
      setContactName(user.name);
      setEmail(user.contactEmail);
      setPhone(user.phone);
      setComments(user.comments);
      setTier(user.tier);
    }
  }, [user]);

  useEffect(() => {
    if (auth === false) {
      navigate('/');
    }
  }, [auth, navigate]);

  const labels = useMemo(() => ([
    ['Title', title],
    ['Artist', artist],
    ['Contact Name', contactName],
    ['Contact Phone', phone],
    ['Contact Email', email],
    ['Affiliates', affiliates],
    ['Clearance', clearance],
    ['One-stop', oneStop],
    ['Splits', splits],
    ['Producer', producer],
    ['IPI', ipi],
    ['ISRC', isrc],
    ['Genre', genre],
    ['Tempo', tempo],
    ['Comments', comments],
  ]), [title, artist, tempo, clearance, oneStop, splits, ipi, isrc,
    comments, contactName, phone, email, genre, producer, affiliates]);

  const commentText = useMemo(() => (
    labels
      .filter(([label]) => (
        label !== 'Title'
        && label !== 'Artist'
        && label !== 'Tempo'
      ))
      .reduce((prev, [label, value]) => (
        `${prev}\n${label}: ${typeof value === 'boolean' ? getBoolValue(value) : value}`
      ), '')
  ), [labels]);

  const handleOneStop = useCallback(() => {
    setOneStop((prev) => !prev);
  }, []);

  const handleClearance = useCallback(() => {
    setClearance((prev) => !prev);
  }, []);

  const handleUpload = useCallback((e) => {
    const value = e.target.files[0];
    setFile(value);
  }, []);

  const deductCredit = useCallback(() => {
    const run = async () => {
      const userEmail = auth?.email ?? '';
      if (!isEmpty(userEmail)) {
        const db = firebase.firestore();
        const query = await db.collection('users').where('email', '==', userEmail).get();
        if (!isEmpty(query?.docs ?? [])) {
          const docRef = query.docs[0];
          await docRef.ref.update({ credits: credits - 1 });
          setCredits((prev) => prev - 1);
          return true;
        }
        return false;
      }
      return false;
    };
    return run();
  }, [auth, credits, firebase]);

  const handleSave = useCallback(() => {
    const run = async () => {
      try {
        // eslint-disable-next-line no-alert
        const confirmed = window.confirm(confirmMessage);
        if (confirmed) {
          const success = deductCredit();
          if (success) {
            const buffer = await file.arrayBuffer();
            let imageBuffer;
            if (image !== null) {
              imageBuffer = await image.arrayBuffer();
            }
            const writer = new ID3Writer(buffer);
            writer
              .setFrame('TIT2', title)
              .setFrame('TPE1', artist.split(', '))
              .setFrame('TCOM', affiliates.split(', '))
              .setFrame('TBPM', tempo)
              .setFrame('TCON', genre.split(', '));
            if (!isEmpty(commentText)) {
              writer.setFrame('COMM', {
                description: 'Comments',
                text: commentText,
                language: 'eng',
              });
            }
            if (imageBuffer) {
              writer.setFrame('APIC', {
                type: 3,
                data: imageBuffer,
                description: 'Artwork',
              });
            }
            writer.addTag();
            const blob = writer.getBlob();
            saveAs(blob, title);
          }
        }
      } catch (error) {
        // eslint-disable-next-line no-console
        console.log('Error downloading: ', error);
      }
    };
    if (file) {
      run();
    }
  }, [
    affiliates,
    artist,
    commentText,
    deductCredit,
    file,
    genre,
    image,
    tempo,
    title,
  ]);

  const handleCsv = useCallback(() => {
    let csvData = 'data:text/csv;charset=utf-8,';
    const header = `${labels.map(([label]) => label).join(',')}\n`;
    const values = labels.map(([, value]) => (
      typeof value === 'boolean' ? getBoolValue(value) : value
    )).join(',');
    csvData = csvData + header + values;
    const encodedUri = encodeURI(csvData);
    window.open(encodedUri);
  }, [labels]);

  const hasCredits = Number(credits) > 0;

  const canSave = useMemo(() => (
    file !== null
    && !isEmpty(affiliates)
    && !isEmpty(artist)
    && !isEmpty(genre)
    && !isEmpty(tempo)
    && !isEmpty(title)
    && hasCredits
  ), [affiliates, artist, file, genre, tempo, title, hasCredits]);

  return (
    <Container>
      <Header>
        Meta Data Editor
      </Header>
      <FormContainer>
        <CreditsContainer>
          {credits === null ? (
            <LoadingAnimation />
          ) : (
            <CreditsText>
              You have
              {' '}
              <CreditsAmount>
                {credits}
              </CreditsAmount>
              {' '}
              credits remaining.
            </CreditsText>
          )}
        </CreditsContainer>
        <FieldContainer>
          <FieldTitle>
            Upload MP3
          </FieldTitle>
          <FieldFileInput
            accept="audio/mpeg3"
            disabled={!hasCredits}
            onChange={handleUpload}
            type="file"
          />
        </FieldContainer>
        <ButtonContainer>
          <Button
            disabled={!canSave}
            onClick={handleSave}
          >
            Download MP3
          </Button>
          {tier !== 3 ? null : (
            <Button
              disabled={!canSave}
              onClick={handleCsv}
            >
              Download CSV
            </Button>
          )}
        </ButtonContainer>
        <FieldContainer>
          <FieldTitle>
            Song Title
            <RequiredText>
              Required
            </RequiredText>
          </FieldTitle>
          <FieldTextInput
            disabled={!hasCredits}
            onChange={setTitle}
            value={title}
          />
        </FieldContainer>
        <FieldContainer>
          <FieldTitle>
            Artist Name
            <RequiredText>
              Required
            </RequiredText>
          </FieldTitle>
          <FieldTextInput
            disabled={!hasCredits}
            onChange={setArtist}
            value={artist}
          />
          <Disclaimer>
            Singer on the track (comma separate multiple artists)
          </Disclaimer>
        </FieldContainer>
        <FieldContainer>
          <FieldTitle>
            Music Genre
            <RequiredText>
              Required
            </RequiredText>
          </FieldTitle>
          <FieldTextInput
            disabled={!hasCredits}
            onChange={setGenre}
            value={genre}
          />
          <Disclaimer>
            Comma separate multiple genres
          </Disclaimer>
        </FieldContainer>
        <FieldContainer>
          <FieldTitle>
            Tempo
            <RequiredText>
              Required
            </RequiredText>
          </FieldTitle>
          <FieldTextInput
            disabled={!hasCredits}
            onChange={setTempo}
            value={tempo}
          />
        </FieldContainer>
        <FieldContainer>
          <FieldTitle>
            Composers, Affiliates, Publishing
            <RequiredText>
              Required
            </RequiredText>
          </FieldTitle>
          <FieldTextInput
            disabled={!hasCredits}
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
            disabled={!hasCredits}
            onChange={setProducer}
            value={producer}
          />
          <Disclaimer>
            Example: John Doe Merf Music publishing BMI (comma separate multiple composers)
          </Disclaimer>
        </FieldContainer>
        <FieldContainer>
          <FieldTitle>
            Artwork
          </FieldTitle>
          <FieldImageInput
            disabled={!hasCredits}
            onChange={setImage}
          />
        </FieldContainer>
        <FieldContainer>
          <FieldTitle>
            IPI Number
          </FieldTitle>
          <FieldTextInput
            disabled={!hasCredits}
            onChange={setIpi}
            value={ipi}
          />
          <Disclaimer>
            Optional
          </Disclaimer>
        </FieldContainer>
        <FieldContainer>
          <FieldTitle>
            Splits/Shares
          </FieldTitle>
          <FieldTextInput
            disabled={!hasCredits}
            onChange={setSplits}
            value={splits}
          />
          <Disclaimer>
            Example: 50%/50% or 33.3%/33.3%/34%
          </Disclaimer>
        </FieldContainer>
        <FieldContainer>
          <FieldTitle>
            Clearance from all songwriters and publishers
          </FieldTitle>
          <FieldCheckboxInput
            checked={clearance}
            disabled={!hasCredits}
            onChange={handleClearance}
            type="checkbox"
          />
        </FieldContainer>
        <FieldContainer>
          <FieldTitle>
            One-stop Shop
          </FieldTitle>
          <FieldCheckboxInput
            checked={oneStop}
            disabled={!hasCredits}
            onChange={handleOneStop}
            type="checkbox"
          />
        </FieldContainer>
        <FieldContainer>
          <FieldTitle>
            ISRC Number
          </FieldTitle>
          <FieldTextInput
            disabled={!hasCredits}
            onChange={setIsrc}
            value={isrc}
          />
        </FieldContainer>
        <FieldContainer>
          <FieldTitle>
            Contact Name
          </FieldTitle>
          <FieldTextInput
            disabled={!hasCredits}
            onChange={setContactName}
            value={contactName}
          />
        </FieldContainer>
        <FieldContainer>
          <FieldTitle>
            Contact Email
          </FieldTitle>
          <FieldTextInput
            disabled={!hasCredits}
            onChange={setEmail}
            value={email}
          />
        </FieldContainer>
        <FieldContainer>
          <FieldTitle>
            Contact Phone
          </FieldTitle>
          <FieldTextInput
            disabled={!hasCredits}
            onChange={setPhone}
            value={phone}
          />
        </FieldContainer>
        <FieldContainer>
          <FieldTitle>
            Comments
          </FieldTitle>
          <FieldTextInput
            disabled={!hasCredits}
            onChange={setComments}
            value={comments}
          />
          <Disclaimer>
            Any comments you&apos;d like about the song
          </Disclaimer>
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
  color: ${COLOR_BLACK};
  font-size: 14px;
`;

const Header = styled.h1`
  display: inline;
  margin-top: 0px;
  margin-bottom: 10px;
  font-size: 24px;
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
`;

const FieldContainer = styled.div`
  display: flex;
  flex-direction: column;
  margin-bottom: 40px;
  margin-top: 30px;
`;

const ButtonContainer = styled(FieldContainer)`
  flex-direction: row;
  & > button {
    margin-right: 20px;
  }
`;

const FieldTitle = styled(FlexGroup)`
  font-weight: bold;
  margin-bottom: 5px;
  align-items: center;
`;

const FieldFileInput = styled.input`
  
`;

const FieldTextInput = styled(TextInput)`
  border: 1px solid #aaa;
  outline-color: #777;
  height: 16px;
  padding: 5px 10px;
`;

const FieldImageInput = styled(ImageInput)`
  // border: 1px solid #aaa;
  // outline-color: #777;
  // height: 16px;
  // padding: 5px 10px;
`;

const FieldCheckboxInput = styled.input`

`;

const Disclaimer = styled.div`
  font-size: 11px;
  margin-top: 5px;
`;

const CreditsContainer = styled(FieldContainer)`
  min-height: 30px;
  height: 30px;
  justify-content: center;
  margin-bottom: 35px;
`;

const CreditsText = styled.div`
  font-size: 18px;
`;

const CreditsAmount = styled.span`
  font-weight: bold;
`;

const RequiredText = styled.span`
  font-size: 10px;
  color: ${COLOR_RED};
  margin-left: 10px;
`;

export default App;
