import { useCallback, useState } from 'react';
import styled from 'styled-components';
import ID3Writer from 'browser-id3-writer';
import { saveAs } from 'file-saver';

import TextInput from './TextInput';

const App = () => {
  const [file, setFile] = useState(null); //
  const [title, setTitle] = useState(''); //
  const [duration, setDuration] = useState(''); //
  const [artist, setArtist] = useState(''); //
  const [type, setType] = useState('');
  const [sampleRate, setSampleRate] = useState('');
  const [genre, setGenre] = useState('');
  const [tempo, setTempo] = useState(''); //
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
  const [comments, setComments] = useState(''); //

  const handleOneStop = useCallback((e) => {
    setOneStop(!!e.target.value);
  }, []);

  const handleClearance = useCallback((e) => {
    setClearance(!!e.target.value);
  }, []);

  const handleUpload = useCallback((e) => {
    const value = e.target.files[0];
    setFile(value);
  }, []);

  const handleSave = useCallback(() => {
    const run = async () => {
      try {
        const buffer = await file.arrayBuffer();
        const writer = new ID3Writer(buffer);
        writer
          .setFrame('TIT2', title)
          .setFrame('TPE1', [artist])
          .setFrame('TLEN', duration)
          .setFrame('TBPM', tempo)
          .setFrame('COMM', {
            description: 'Comments',
            text: comments,
            language: 'eng'
          });
          // .setFrame('TXXX', {
          //   description: 'description here',
          //   value: 'value here'
          // })
        writer.addTag();
        const blob = writer.getBlob();
        saveAs(blob, title);
      } catch (error) {
        console.log('Error uploading: ', error);
      }
    };
    if (file) {
      run();
    }
  }, [artist, comments, duration, file, tempo, title]);

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
            Length of song
          </Disclaimer>
        </FieldContainer>
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
            Singer on the track
          </Disclaimer>
        </FieldContainer>
        <FieldContainer>
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
        </FieldContainer>
        <FieldContainer>
          <FieldTitle>
            Sample Rate
          </FieldTitle>
          <FieldTextInput
            disabled={file === null}
            onChange={setSampleRate}
            value={sampleRate}
          />
        </FieldContainer>
        <FieldContainer>
          <FieldTitle>
            Music Genre
          </FieldTitle>
          <FieldTextInput
            disabled={file === null}
            onChange={setGenre}
            value={genre}
          />
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
            Example: John Doe Merf Music publishing BMI
          </Disclaimer>
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
          IPI Number
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
            Any comments you'd like about the song
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
};

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
