import styled from 'styled-components';

export default function Publishers() {
  return (
    <Container>
      <Header>For Publishers</Header>
      <IntroText>
        How Correct metadata can help a publisher in several ways:
      </IntroText>
      <TextBullet>
        • Accuracy: Correct metadata ensures that all relevant information about a song,
        including the songwriter, publisher, and licensing information, is accurate. This allows
        the publisher to properly administer the song and ensure that all royalties are properly
        collected and distributed.
      </TextBullet>
      <TextBullet>
        • Efficiency: With correct metadata, publishers can more easily find and identify the songs
        they represent. This helps streamline the licensing and clearance process and reduces
        the likelihood of errors or disputes.
      </TextBullet>
      <TextBullet>
        • Opportunities: Having accurate metadata can also lead to more opportunities for a
        publisher&#39;s songs to be licensed and placed in various media. Music supervisors and
        other licensing professionals rely on metadata to find and select songs for their projects,
        so having complete and accurate information can make a publisher&#39;s songs more
        attractive for placement.
      </TextBullet>
      <Text>
        With the MyMusicMetadata tool, collecting and organizing songwriter&#39;s data and work
        tapes has never been easier. Instead of the catalog manager manually having to track
        down the necessary information needed to admin a song, songwriters can easily input
        all the essential information themselves using the tool. From lyric content, songwriter
        and publishing info, creation date, and PRO information, to adding their company logo
        at the end of the songwriting session, everything is organized and readily available for
        the catalog manager with just a right click. With all the correct information available on
        the mp3, it is now easier for the publishing company, record label, and artist to give
        proper credit and ensure that everyone involved gets paid properly. This ensures that
        the catalog manager&#39;s job is made simpler and that all the information is available
        at any point in time.
      </Text>
    </Container>
  );
}

const Container = styled.div`
  display: flex;
  flex-direction: column;
  padding: 40px;
  box-sizing: border-box;
  width: 100%;
`;

const Header = styled.h1`
  color: #e3223c;
  font-size: 36px;
`;

const IntroText = styled.p`
  font-size: 20px;
  font-weight: bold;
`;

const Text = styled.p`
  font-size: 20px;
`;

const TextBullet = styled.p`
  font-size: 20px;
  margin-left: 30px;
`;
