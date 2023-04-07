/* eslint-disable max-len */
import styled from 'styled-components';
import FlexGroup from './common/FlexGroup';
import RouterLink from './common/RouterLink';
import ButtonAlt from './common/ButtonAlt';
import TextInput from './common/TextInput';
import bg from '../images/bg.png';
import heard from '../images/heard-1200-900.png';
import tiers from '../images/tiers-40-430.png';
import speaker from '../images/speaker-350-430.png';

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
          <LearnMoreContainer>
            <RouterLink to="/">
              <ButtonAlt>
                Learn More
              </ButtonAlt>
            </RouterLink>
          </LearnMoreContainer>
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
          <TextInputContainer>
            <TextInput
              placeholder="Phone"
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
                  10 Credits
                </TierTextContainer>
                <TierTextContainer>
                  $10 / Month
                </TierTextContainer>
              </FlexGroup>
              <RouterLink to="/signup">
                <ButtonAlt>
                  Register
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
                  30 Credits
                </TierTextContainer>
                <TierTextContainer>
                  $20 / Month
                </TierTextContainer>
              </FlexGroup>
              <RouterLink to="/signup">
                <ButtonAlt>
                  Register
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
                  Unlimited Credits
                </TierTextContainer>
                <TierTextContainer>
                  $50 / Month
                </TierTextContainer>
              </FlexGroup>
              <RouterLink to="/signup">
                <ButtonAlt>
                  Register
                </ButtonAlt>
              </RouterLink>
            </TierContainer>
          </FlexGroup>
          <SpeakerImage src={speaker} alt="header" />
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

const TopContainer = styled(FlexGroup)`
  background-image: url(${bg});
  background-size: contain;
  height: 610px;
  justify-content: center;
  align-items: center;
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

const SpeakerImage = styled.img`
  width: 350px;
  height: 430px;
  margin-left: 40px;
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

const LearnMoreContainer = styled(FlexGroup)`
  margin-left: 160px;
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
