import styled from 'styled-components';

export default function FAQ() {
  return (
    <Container>
      <Header>FAQ</Header>
      <IntroText>
        Facts about incorrect metadata:
      </IntroText>
      <TextBullet>
        • While there is no precise figure on how much money is in unclaimed royalties since
        2007, as the amount continues to grow and is constantly changing. However, the
        estimated amount of unclaimed royalties in the music industry is in the billions of
        dollars. In 2017, it was reported that the mechanical licensing collective, which is
        responsible for collecting and distributing royalties for streaming services, estimated
        that over $1.5 billion in unpaid mechanical royalties had accumulated in the US alone.
        Additionally, in 2018, it was reported that the UK music industry had over £100 million
        in unclaimed royalties. The problem of unclaimed royalties is due to various factors such
        as incomplete or inaccurate metadata, lack of knowledge about how to collect royalties,
        and difficulties in tracking and distributing payments.
      </TextBullet>
      <TextBullet>
        • Since there is no specific data or research on the percentage of songs that do not get
        heard due to incorrect metadata. We Conducted an experiment of our own. We
        Conducted an experiment of our own by sending a sync placement opportunity to
        5000 songwriters out of 5000 songwriters 80% responded with a song and out of
        the 80% that responded 3 % responded with the correct metadata. In simple
        figures only 120 songwriters out of 4000 responded with the correct metadata.
        So we decided at that point to figure out a way to change that number as 3,880
        songs potentially would have not even been listened to as they did not have the
        correct metadata on them.
      </TextBullet>
      <TextBullet>
        • Having the correct and complete metadata is crucial for the discoverability and
        distribution of music on digital platforms. Without correct metadata, music may not be
        properly categorized, indexed, or matched with listener preferences, which could result
        in it being buried or overlooked in search results and playlists. Therefore, it is important
        for musicians and music industry professionals to ensure that their metadata is accurate
        and up to date to maximize the potential reach of their music.
      </TextBullet>
      <TextBullet>
        • When a music supervisor receives a song with missing or incorrect metadata, it can
        create several problems and delays in the music licensing process. Here are some
        potential issues that can arise:
      </TextBullet>
      <TextNumbered>
        1. Difficulty identifying the song: Without accurate metadata, the music supervisor may
        struggle to identify the song, its title, artist, and other relevant information.
      </TextNumbered>
      <TextNumbered>
        2. Inability to clear rights: Music supervisors need to obtain clearance for the use of
        copyrighted material, and missing metadata can make this process difficult or
        impossible. This can result in the supervisor having to search for the song&#39;s owner or
        even abandon the song altogether.
      </TextNumbered>
      <TextNumbered>
        3. Payment delays: If the song is licensed, missing metadata can cause delays in payment
        to the rights holders, leading to frustration and confusion.
      </TextNumbered>
      <IntroText>
        Overall, having accurate metadata is crucial in the music licensing process and can help
        streamline the process for all parties involved.
      </IntroText>
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

const TextBullet = styled.p`
  font-size: 20px;
  margin-left: 30px;
`;

const TextNumbered = styled.p`
  font-size: 20px;
  margin-left: 70px;
`;
