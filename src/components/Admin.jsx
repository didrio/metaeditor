/* eslint-disable max-len */
import { useEffect, useState } from 'react';
import styled from 'styled-components';
import isEmpty from 'lodash/isEmpty';
import has from 'lodash/has';
import { useNavigate } from 'react-router-dom';
import MarkdownEditor from '@uiw/react-markdown-editor';
import MarkdownPreview from '@uiw/react-markdown-preview';
import { useFirebase } from 'react-redux-firebase';
import Button from './common/Button';
import FlexGroup from './common/FlexGroup';
import useAuth from '../hooks/useAuth';
import useUser from '../hooks/useUser';

const previewProps = {
  linkTarget: '_blank',
};

function Admin() {
  const [markdown, setMarkdown] = useState('');
  const auth = useAuth();
  const navigate = useNavigate();
  const firebase = useFirebase();

  useEffect(() => {
    if (auth === false) {
      navigate('/');
    }
  }, [auth, navigate]);

  const user = useUser();
  const admin = user?.admin ?? false;
  const email = user?.email ?? '';

  useEffect(() => {
    if (has(user, 'admin') && !admin) {
      navigate('/');
    }
  }, [user, navigate, admin]);

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

  const handleMarkdownChange = (editor, data, value) => {
    setMarkdown(value);
  };

  const handleSave = async () => {
    const db = firebase.firestore();
    try {
      await db
        .collection('app')
        .doc('content')
        .update({ landing: markdown });
    } catch (error) {
      // eslint-disable-next-line no-console
      console.log('error', error);
    }
  };

  if (!auth || isEmpty(email)) {
    return null;
  }

  return (
    <Container
      vertical
    >
      <MarkdownEditor
        onChange={handleMarkdownChange}
        previewProps={{ ...previewProps }}
        value={markdown}
      />
      <SaveButton
        onClick={handleSave}
      >
        Save
      </SaveButton>
      <PreviewText>
        Preview:
      </PreviewText>
      <MarkdownPreview source={markdown} />
    </Container>
  );
}

const Container = styled(FlexGroup)`
  width: 100%;
`;

const SaveButton = styled(Button)`
  margin: 30px 0px;
`;

const PreviewText = styled(FlexGroup)`
  margin-bottom: 50px;
  font-size: 24px;
  font-weight: bold;
`;

export default Admin;
