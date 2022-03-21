import {
  useCallback, useState, useMemo, useEffect,
} from 'react';
import styled from 'styled-components';
import ID3Writer from 'browser-id3-writer';
import { saveAs } from 'file-saver';
import { useNavigate } from 'react-router-dom';
import TextInput from './common/TextInput';
import ImageInput from './common/ImageInput';
import useAuth from '../hooks/useAuth';

function App() {
  const [file, setFile] = useState(null);
  const [image, setImage] = useState(null);
  const [title, setTitle] = useState('');
  const [artist, setArtist] = useState('');
  const [genre, setGenre] = useState('');
  const [tempo, setTempo] = useState('');
  const [affiliates, setAffiliates] = useState('');
  const [ipi, setIpi] = useState('');
  const [clearance, setClearance] = useState(false);
  const [oneStop, setOneStop] = useState(false);
  const [splits, setSplits] = useState('');
  const [prl, setPrl] = useState('');
  const [iswc, setIswc] = useState('');
  const [isrc, setIsrc] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [comments, setComments] = useState('');
  const [contactName, setContactName] = useState('');

  const auth = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (auth === false) {
      navigate('/');
    }
  }, [auth, navigate]);

  const commentText = useMemo(
    () => (
      `
Contact: ${contactName} ${phone} ${email}
Clearance: ${clearance ? 'Yes' : 'No'}
One-stop: ${oneStop ? 'Yes' : 'No'}
Splits: ${splits}
IPI: ${ipi}
PRL: ${prl}
ISWC: ${iswc}
ISRC: ${isrc}
Genre: ${genre}
Comments: ${comments}
`
    ),
    [clearance, oneStop, splits, ipi, prl, iswc, isrc, comments, contactName, phone, email, genre],
  );

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

  const handleSave = useCallback(() => {
    const run = async () => {
      try {
        const buffer = await file.arrayBuffer();
        const imageBuffer = await image.arrayBuffer();
        const writer = new ID3Writer(buffer);
        writer
          .setFrame('TIT2', title)
          .setFrame('TPE1', artist.split(', '))
          .setFrame('TCOM', affiliates.split(', '))
          .setFrame('TBPM', tempo)
          .setFrame('TCON', genre.split(', '))
          .setFrame('COMM', {
            description: 'Comments',
            text: commentText,
            language: 'eng',
          })
          .setFrame('APIC', {
            type: 3,
            data: imageBuffer,
            description: 'Artwork',
          });
        writer.addTag();
        const blob = writer.getBlob();
        saveAs(blob, title);
      } catch (error) {
        // eslint-disable-next-line no-console
        console.log('Error uploading: ', error);
      }
    };
    if (file) {
      run();
    }
  }, [artist, file, tempo, title, affiliates, commentText, genre, image]);

  return (
    <Container>
      <Header>
        Meta Data Editor
      </Header>
      <FormContainer>
        <FieldContainer>
          <FieldTitle>
            Credits
          </FieldTitle>
          <input
            type="select"
          />
        </FieldContainer>
        <FieldContainer>
          <FieldTitle>
            Upload MP3
          </FieldTitle>
          <FieldFileInput
            accept="audio/mpeg3"
            onChange={handleUpload}
            type="file"
          />
        </FieldContainer>
        <FieldContainer>
          <FieldTitle>
            Song Title
          </FieldTitle>
          <FieldTextInput
            disabled={file === null}
            onChange={setTitle}
            value={title}
          />
        </FieldContainer>
        {/* <FieldContainer>
          <FieldTitle>
            Duration
          </FieldTitle>
          <FieldTextInput
            disabled={file === null}
            onChange={setDuration}
            value={duration}
          />
          <Disclaimer>
            Length of song
          </Disclaimer>
        </FieldContainer> */}
        <FieldContainer>
          <FieldTitle>
            Artist Name
          </FieldTitle>
          <FieldTextInput
            disabled={file === null}
            onChange={setArtist}
            value={artist}
          />
          <Disclaimer>
            Singer on the track (comma separate multiple artists)
          </Disclaimer>
        </FieldContainer>
        {/* <FieldContainer>
          <FieldTitle>
            Type of Mix
          </FieldTitle>
          <FieldTextInput
            disabled={file === null}
            onChange={setType}
            value={type}
          />
          <Disclaimer>
            Mono/Stereo/Surround
          </Disclaimer>
        </FieldContainer> */}
        {/* <FieldContainer>
          <FieldTitle>
            Sample Rate
          </FieldTitle>
          <FieldTextInput
            disabled={file === null}
            onChange={setSampleRate}
            value={sampleRate}
          />
        </FieldContainer> */}
        <FieldContainer>
          <FieldTitle>
            Music Genre
          </FieldTitle>
          <FieldTextInput
            disabled={file === null}
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
          </FieldTitle>
          <FieldTextInput
            disabled={file === null}
            onChange={setTempo}
            value={tempo}
          />
        </FieldContainer>
        <FieldContainer>
          <FieldTitle>
            Composers, Affiliates, Publishing
          </FieldTitle>
          <FieldTextInput
            disabled={file === null}
            onChange={setAffiliates}
            value={affiliates}
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
            disabled={file === null}
            onChange={setImage}
          />
        </FieldContainer>
        <FieldContainer>
          <FieldTitle>
            IPI Number
          </FieldTitle>
          <FieldTextInput
            disabled={file === null}
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
            disabled={file === null}
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
            disabled={file === null}
            type="checkbox"
            onChange={handleClearance}
            value={clearance}
          />
        </FieldContainer>
        <FieldContainer>
          <FieldTitle>
            One-stop Shop
          </FieldTitle>
          <FieldCheckboxInput
            disabled={file === null}
            type="checkbox"
            onChange={handleOneStop}
            value={oneStop}
          />
        </FieldContainer>
        <FieldContainer>
          <FieldTitle>
            PRL Work Number
          </FieldTitle>
          <FieldTextInput
            disabled={file === null}
            onChange={setPrl}
            value={prl}
          />
        </FieldContainer>
        <FieldContainer>
          <FieldTitle>
            ISWC Number
          </FieldTitle>
          <FieldTextInput
            disabled={file === null}
            onChange={setIswc}
            value={iswc}
          />
        </FieldContainer>
        <FieldContainer>
          <FieldTitle>
            ISRC Number
          </FieldTitle>
          <FieldTextInput
            disabled={file === null}
            onChange={setIsrc}
            value={isrc}
          />
        </FieldContainer>
        <FieldContainer>
          <FieldTitle>
            Contact Name
          </FieldTitle>
          <FieldTextInput
            disabled={file === null}
            onChange={setContactName}
            value={contactName}
          />
        </FieldContainer>
        <FieldContainer>
          <FieldTitle>
            Email Address
          </FieldTitle>
          <FieldTextInput
            disabled={file === null}
            onChange={setEmail}
            value={email}
          />
        </FieldContainer>
        <FieldContainer>
          <FieldTitle>
            Phone Number
          </FieldTitle>
          <FieldTextInput
            disabled={file === null}
            onChange={setPhone}
            value={phone}
          />
        </FieldContainer>
        <FieldContainer>
          <FieldTitle>
            Comments
          </FieldTitle>
          <FieldTextInput
            disabled={file === null}
            onChange={setComments}
            value={comments}
          />
          <Disclaimer>
            Any comments you&apos;d like about the song
          </Disclaimer>
        </FieldContainer>
        <SaveButton
          disabled={file === null}
          onClick={handleSave}
        >
          Save MP3
        </SaveButton>
      </FormContainer>
    </Container>
  );
}

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  color: #333;
  font-size: 14px
`;

const Header = styled.h1`
  display: inline;
`;

const FormContainer = styled.div`
  min-width: 70%;
  max-width: 95%;
  background-color: #ddd;
  padding: 20px;
  border-radius: 5px;
  box-shadow: 2px 2px 3px rgba(0, 0, 0, 0.1);
  border: 1px solid #ccc;
  align-items: center;
  margin-bottom: 60px;
`;

const FieldContainer = styled.div`
  display: flex;
  flex-direction: column;
  margin-top: 20px;
`;

const FieldTitle = styled.div`
  font-weight: bold;
  margin-bottom: 5px;
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

const SaveButton = styled.button`
  margin-top: 30px;
`;

const Disclaimer = styled.div`
  font-size: 11px;
  margin-top: 5px;
`;

export default App;
