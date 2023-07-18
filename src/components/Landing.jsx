/* eslint-disable max-len */
import styled from 'styled-components';
import FlexGroup from './common/FlexGroup';
import RouterLink from './common/RouterLink';
import ButtonAlt from './common/ButtonAlt';
import TextInput from './common/TextInput';
import bg from '../images/bg.png';
import heard from '../images/heard-1200-900.png';
import tiers from '../images/tiers-40-430.png';
import grammy from '../images/grammy.png';

function Landing() {
  return (
    <Container
      vertical
    >
      <TopContainer>
        <TopLeftContainer vertical>
          <TopTextContainer>
            Do you have the right meta data
          </TopTextContainer>
          <TopTextContainer margin="0 0 65px 75px">
            in your songs to be heard?
          </TopTextContainer>
          <TopTextContainer margin="0 0 0 30px">
            Want your songs being heard
          </TopTextContainer>
          <TopTextContainer margin="0 0 85px 190px">
            by the right people?
          </TopTextContainer>
        </TopLeftContainer>
        <TopRightContainer vertical>
          <RegisterTextContainer>
            Register Now
          </RegisterTextContainer>
          <TextInputContainer>
            <TextInput
              placeholder="Name"
            />
          </TextInputContainer>
          <TextInputContainer>
            <TextInput
              placeholder="Email"
            />
          </TextInputContainer>
          <RegisterLinkContainer>
            <RouterLink to="/signup">
              <ButtonAlt>
                Submit
              </ButtonAlt>
            </RouterLink>
          </RegisterLinkContainer>
        </TopRightContainer>
      </TopContainer>
      <InfoContainer>
        <InfoHeader>
          Welcome to MyMusicMetaData,
        </InfoHeader>
        <InfoText>
          Your one-stop-shop for accurate and comprehensive music metadata.
        </InfoText>
        <InfoText>
          Who needs music metadata? Anyone who creates and distributes music, whether you&#39;re an
          independent artist, songwriter, a record label, or a music publisher metadata is essential to
          managing your musical and intellectual property which are your most important assets and
          ensures that you will get compensated for your music.
        </InfoText>
        <InfoText>
          What is music metadata? It&#39;s the information that accompanies your music, including song title,
          artist name, album name, release date, genre, and more. Having complete and accurate
          metadata is crucial for getting your music noticed and heard by the right people.
        </InfoText>
      </InfoContainer>
      <InfoAltContainer>
        <InfoText>
          Why is it important to have the correct music metadata? Here are three reasons:
        </InfoText>
        <InfoBullet>
          • Discoverability - Correct metadata helps your music get discovered by music
          supervisors, publishers, and digital service providers (DSPs) such as Spotify, Apple Music,
          and Amazon Music, Youtube, etc. The more accurate and comprehensive your metadata
          is, the easier it is for them to find and consider your music.
        </InfoBullet>
        <InfoBullet>
          • Royalties - Accurate metadata ensures that you receive all the royalties you&#39;re entitled
          to. When your music is played on radio, TV, or streaming platforms, the metadata is
          used to track and report your earnings. If your metadata is incomplete or incorrect, you
          risk missing out on royalties.
        </InfoBullet>
        <InfoBullet>
          • Professionalism - Correct metadata demonstrates that you take your music career
          seriously and that you&#39;re committed to presenting yourself as a professional. It also
          ensures that your music is properly credited, which is crucial for building your
          reputation and gaining recognition in the industry.
        </InfoBullet>
      </InfoAltContainer>
      <InfoContainer>
        <InfoText>
          At MyMusicMetadata.com, we make it easy to enter accurate metadata for your music. Our
          designer has created a new tool allows you to simply fill in the required information and we will
          embed the metadata into your audio file with artwork included. This means you no longer have
          to spend money on expensive software programs or courses to learn how to do it yourself.
        </InfoText>
        <InfoText>
          With our easy-to-use tool, you can ensure that your music is properly tagged and ready to be
          submitted to music supervisors, record labels, music publishers, social media platforms and
          DSPs.
        </InfoText>
        <InfoText>
          Don&#39;t let incorrect or incomplete metadata hold you back. Sign up at MyMusicMetadata.com
          today and rest assured that your music is properly tagged and ready to be discovered by the
          right people.
        </InfoText>
      </InfoContainer>
      <MiddleContainer
        vertical
      >
        <FlexGroup>
          <TiersImage src={tiers} alt="header" />
          <FlexGroup
            vertical
          >
            <TierContainer>
              <FlexGroup vertical>
                <TierTextContainer>
                  Tier 1
                </TierTextContainer>
                <TierTextContainer>
                  10 Songs / Month
                </TierTextContainer>
                <TierTextContainer>
                  $10 / Month
                </TierTextContainer>
              </FlexGroup>
              <RouterLink to="/signup">
                <ButtonAlt>
                  Subscribe Now
                </ButtonAlt>
              </RouterLink>
            </TierContainer>
            <Spacer />
            <TierContainer>
              <FlexGroup vertical>
                <TierTextContainer>
                  Tier 2
                </TierTextContainer>
                <TierTextContainer>
                  30 Songs / Month
                </TierTextContainer>
                <TierTextContainer>
                  $20 / Month
                </TierTextContainer>
              </FlexGroup>
              <RouterLink to="/signup">
                <ButtonAlt>
                  Subscribe Now
                </ButtonAlt>
              </RouterLink>
            </TierContainer>
            <Spacer />
            <TierContainer>
              <FlexGroup vertical>
                <TierTextContainer>
                  Tier 3
                </TierTextContainer>
                <TierTextContainer>
                  Unlimited Songs
                </TierTextContainer>
                <TierTextContainer>
                  $50 / Month
                </TierTextContainer>
              </FlexGroup>
              <RouterLink to="/signup">
                <ButtonAlt>
                  Subscribe Now
                </ButtonAlt>
              </RouterLink>
            </TierContainer>
          </FlexGroup>
          <GrammyImage src={grammy} alt="header" />
        </FlexGroup>
      </MiddleContainer>
      <FlexGroup>
        <HeardImage src={heard} alt="header" />
      </FlexGroup>
    </Container>
  );
}

const Container = styled(FlexGroup)`
  width: 100%;
`;

const InfoContainer = styled(FlexGroup)`
  background-color: #e3223c;
  color: #fff;
  display: flex;
  flex-direction: column;
  font-weight: bold;
  padding: 20px 30px;

  a {
    color: white;
  }
`;

const InfoAltContainer = styled(FlexGroup)`
  background-color: #fff;
  color: #e3223c;
  display: flex;
  flex-direction: column;
  font-weight: bold;
  padding: 20px 30px;
`;

const InfoHeader = styled.p`
  font-size: 30px;
`;

const InfoText = styled.p`
  font-size: 24px;
`;

const InfoBullet = styled.p`
  font-size: 20px;
  margin-left: 30px;
  color: black;
  font-weight: 400;
`;

const TopContainer = styled(FlexGroup)`
  background-image: url(${bg});
  background-size: contain;
  height: 610px;
  justify-content: center;
  align-items: center;
  width: 1200px;
`;

const HeardImage = styled.img`
  width: 1200px;
  height: 900px;
`;

const TiersImage = styled.img`
  width: 40px;
  height: 430px;
  margin-right: 40px;
`;

const GrammyImage = styled.img`
  width: 350px;
  height: 430px;
  margin-left: 60px;

  @media (max-width: 1100px) {
    & {
        display: none;
    }
`;

const MiddleContainer = styled(FlexGroup)`
  align-items: center;
  justify-content: center;
  background-color: white;
  height: 550px;
`;

const TierContainer = styled(FlexGroup)`
  align-items: center;
  justify-content: space-between;
  background-color: #e3223c;
  border-radius: 20px;
  width: 480px;
  height: 155px;
  padding: 0 50px;
`;

const Spacer = styled.div`
  height: 10px;
`;

const TierTextContainer = styled(FlexGroup)`
  color: white;
  font-weight: 700;
  font-size: 21px;
`;

const TopTextContainer = styled(FlexGroup)`
  color: white;
  font-weight: 700;
  font-size: 30px;

  margin: ${(props) => props.margin || '0'};
`;

const TopLeftContainer = styled(FlexGroup)`
  align-items: flex-start;
  margin-right: 130px;
`;

const TopRightContainer = styled(FlexGroup)`
  background-color: rgba(255, 255, 255, 0.35);
  border-radius: 20px;
  justify-content: center;
  align-items: center;
  width: 435px;
  height: 485px;
`;

const RegisterLinkContainer = styled(FlexGroup)`
    margin-top: 35px;
`;

const RegisterTextContainer = styled(FlexGroup)`
  color: white;
  font-weight: 700;
  font-size: 22px;
  margin-bottom: 90px;
`;

const TextInputContainer = styled(FlexGroup)`
  margin-bottom: 20px;
  width: 390px;
`;

export default Landing;
