/* eslint-disable max-len */
import { useState, useEffect } from 'react';
import styled from 'styled-components';
import { useFirebase } from 'react-redux-firebase';
import MarkdownPreview from '@uiw/react-markdown-preview';
import FlexGroup from './common/FlexGroup';

function Landing() {
  const [markdown, setMarkdown] = useState('');

  const firebase = useFirebase();

  useEffect(() => {
    const run = async () => {
      const db = firebase.firestore();
      try {
        const doc = await db.collection('app').doc('content').get();
        const data = doc.data();
        setMarkdown(data?.landing ?? '');
      } catch (error) {
        // eslint-disable-next-line no-console
        console.log('error', error);
      }
    };
    run();
  }, [firebase]);

  return (
    <Container
      vertical
    >
      <MarkdownPreview source={markdown} />
    </Container>
  );
}

const Container = styled(FlexGroup)`

`;

export default Landing;
