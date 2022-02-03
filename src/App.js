import { useCallback, useState } from 'react';
import styled from 'styled-components';
import ID3Writer from 'browser-id3-writer';
import { saveAs } from 'file-saver';

import TextInput from './TextInput';

const App = () => {
  const [file, setFile] = useState(null);
  const [title, setTitle] = useState('');
  const [duration, setDuration] = useState('');
  const [artist, setArtist] = useState('');
  const [type, setType] = useState('');
  const [sampleRate, setSampleRate] = useState('');
  const [genre, setGenre] = useState('');
  const [tempo, setTempo] = useState('');
  const [affiliates, setAffiliates] = useState('');
  const [ipi, setIpi] = useState('');
  const [clearance, setClearance] = useState(true);
  const [oneStop, setOneStop] = useState(true);
  const [splits, setSplits] = useState('');
  const [prl, setPrl] = useState('');
  const [iswc, setIswc] = useState('');
  const [isrc, setIsrc] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [comments, setComments] = useState('');

  const handleUpload = useCallback((e) => {
    const value = e.target.files[0];
    setFile(value);
  }, []);

  const handleSave = useCallback((e) => {
    const run = async () => {
      try {
        const file = e.target.files[0];
        const buffer = await file.arrayBuffer();
        const writer = new ID3Writer(buffer);
        writer.setFrame('TIT2', 'Home')
          .setFrame('TPE1', ['Eminem', '50 Cent'])
          .setFrame('TALB', 'Friday Night Lights')
          .setFrame('TYER', 2004);
        writer.addTag();
        // const taggedSongBuffer = writer.arrayBuffer;
        const blob = writer.getBlob();
        // const url = writer.getURL();
        saveAs(blob, 'song with tags.mp3');
      } catch (error) {
        console.log('Error uploading: ', error);
      }
    };
    run();
  }, []);

  return (
    <Container>
      <Header>
        MP3 ID3 Tag Editor
      </Header>
      <FormContainer>
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
        <FieldContainer>
          <FieldTitle>
            Duration
          </FieldTitle>
          <FieldTextInput
            disabled={file === null}
            onChange={setDuration}
            value={duration}
          />
          <Disclaimer>
            * Length of song
          </Disclaimer>
        </FieldContainer>
        <FieldContainer>
          <FieldTitle>
            Artist
          </FieldTitle>
          <FieldTextInput
            disabled={file === null}
            onChange={setArtist}
            value={artist}
          />
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
};

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  color: #333;
`;

const Header = styled.h1`
  display: inline;
`;

const FormContainer = styled.div`
  width: 80%;
  background-color: #ddd;
  padding: 20px;
  border-radius: 5px;
  box-shadow: 2px 2px 3px rgba(0, 0, 0, 0.1);
  border: 1px solid #ccc;
  align-items: center;
`;

const FieldContainer = styled.div`
  display: flex;
  margin-top: 15px;
`;

const FieldTitle = styled.div`
  display: flex;
  font-weight: bold;
  flex-basis: 25%;
  align-items: center;
`;

const FieldFileInput = styled.input`
  flex-basis: 45%;
`; 

const FieldTextInput = styled(TextInput)`
  flex-basis: 45%;
`; 

const SaveButton = styled.button`
  margin-top: 10px;
`;

const Disclaimer = styled.div`
  display: flex;
  align-items: center;
  font-size: 10px;
  margin-left: 10px;
`;

export default App;
