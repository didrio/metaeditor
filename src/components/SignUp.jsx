import { useState, useEffect, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { useFirebase } from 'react-redux-firebase';
import isEmpty from 'lodash/isEmpty';
import styled from 'styled-components';
import TextInput from './common/TextInput';
import Button from './common/Button';
import ErrorMessage from './common/ErrorMessage';
import FlexGroup from './common/FlexGroup';
import FlexItem from './common/FlexItem';
import LoadingAnimation from './common/LoadingAnimation';
import {
  CREATE_CUSTOMER_ENDPOINT,
  COLOR_BLACK,
  COLOR_DARK_GRAY,
  COLOR_LIGHT_GRAY,
  COLOR_MID_GRAY,
  COLOR_WHITE,
  DEFAULT_USER_DATA,
  HTTP_POST_OPTIONS,
} from '../constants';
import { getErrorMessage } from '../utils';
import useAuth from '../hooks/useAuth';

function SignUp() {
  const [email, setEmail] = useState('1@testtest.com');
  const [password, setPassword] = useState('123askljd');
  const [cNumber, setCNumber] = useState('4242424242424242');
  const [cMonth, setCMonth] = useState('2');
  const [cYear, setCYear] = useState('2024');
  const [cCode, setCCode] = useState('123');
  const [errorMessage, setErrorMessage] = useState('');
  const [tier, setTier] = useState(1);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const auth = useAuth();
  const navigate = useNavigate();
  const firebase = useFirebase();

  useEffect(() => {
    if (auth) {
      navigate('/profile');
    }
  }, [auth, navigate]);

  const handleEmailChange = (value) => {
    setEmail(value);
  };

  const handlePasswordChange = (value) => {
    setPassword(value);
  };

  const handleCNumberChange = (value) => {
    setCNumber(value);
  };

  const handleCMonthChange = (value) => {
    setCMonth(value);
  };

  const handleCYearChange = (value) => {
    setCYear(value);
  };

  const handleCCodeChange = (value) => {
    setCCode(value);
  };

  const handleSignUp = useCallback(() => {
    setIsSubmitting(true);
    const run = async () => {
      try {
        const options = {
          ...HTTP_POST_OPTIONS,
          body: JSON.stringify({
            cNumber,
            cMonth,
            cYear,
            cCode,
            email,
            tier,
          }),
        };
        const response = await fetch(CREATE_CUSTOMER_ENDPOINT, options);
        const result = await response.json();
        const {
          stripeCustomerId,
          stripePaymentId,
        } = result;
        if (!stripeCustomerId) {
          throw Error('Failed creating Stripe customer');
        }
        if (!stripePaymentId) {
          throw Error('Failed creating payment method');
        }
        let credits;
        switch (Number(tier)) {
          case 1: {
            credits = 10;
            break;
          }
          case 2: {
            credits = 30;
            break;
          }
          case 3: {
            credits = 1000000;
            break;
          }
          default:
            response.status(400).send('Invalid tier');
            break;
        }
        await firebase.createUser({ email, password }, {
          ...DEFAULT_USER_DATA,
          credits,
          email,
          stripeCustomerId,
          stripePaymentId,
          tier,
        });
      } catch (error) {
        setErrorMessage(getErrorMessage(error));
        setIsSubmitting(false);
      }
    };
    run();
  }, [email, firebase, password, tier, cNumber, cMonth, cYear, cCode]);

  const handleKeyDown = useCallback(({ code }) => {
    if (code === 'Enter' && !isEmpty(email) && !isEmpty(password)) {
      handleSignUp();
    }
  }, [handleSignUp, email, password]);

  const handleTierSelect = (selectedTier) => () => {
    setTier(selectedTier);
  };

  useEffect(() => {
    if (document) {
      document.addEventListener('keydown', handleKeyDown);
    }
    return () => {
      if (document) {
        document.removeEventListener('keydown', handleKeyDown);
      }
    };
  }, [handleKeyDown]);

  const canRegister = (
    tier !== null
    && !isEmpty(email)
    && !isEmpty(password)
    && !isEmpty(cNumber)
    && !isEmpty(cMonth)
    && !isEmpty(cYear)
    && !isEmpty(cCode)
  );

  if (auth) {
    return null;
  }

  if (isSubmitting) {
    return (
      <LoadingContainer>
        <LoadingAnimation
          size={40}
        />
      </LoadingContainer>
    );
  }

  return (
    <FlexGroup
      vertical
    >
      <TierContainer
        vertical
      >
        <FlexItem>
          Select a tier:
        </FlexItem>
        <TiersContainer>
          <TierItem
            onClick={handleTierSelect(1)}
            selected={tier === 1}
          >
            <FlexItem>
              Tier 1
            </FlexItem>
            <FlexItem>
              10 Credits
            </FlexItem>
            <FlexItem>
              $10 / month
            </FlexItem>
          </TierItem>
          <TierItem
            onClick={handleTierSelect(2)}
            selected={tier === 2}
          >
            <FlexItem>
              Tier 2
            </FlexItem>
            <FlexItem>
              30 Credits
            </FlexItem>
            <FlexItem>
              $20 / month
            </FlexItem>
          </TierItem>
          <TierItem
            onClick={handleTierSelect(3)}
            selected={tier === 3}
          >
            <FlexItem>
              Tier 3
            </FlexItem>
            <FlexItem>
              Unlimited Credits
            </FlexItem>
            <FlexItem>
              $50 / month
            </FlexItem>
          </TierItem>
        </TiersContainer>
      </TierContainer>
      <Container
        vertical
      >
        <ErrorMessage>
          {errorMessage}
        </ErrorMessage>
        <Label>
          Email
        </Label>
        <TextInput
          onChange={handleEmailChange}
          type="email"
          value={email}
        />
        <Spacer />
        <Label>
          Password
        </Label>
        <TextInput
          onChange={handlePasswordChange}
          type="password"
          value={password}
        />
        <Spacer />
        <Label>
          Credit Card Number
        </Label>
        <TextInput
          onChange={handleCNumberChange}
          value={cNumber}
        />
        <Spacer />
        <Label>
          Credit Card Expiry Month
        </Label>
        <TextInput
          onChange={handleCMonthChange}
          value={cMonth}
        />
        <Spacer />
        <Label>
          Credit Card Expiry Year
        </Label>
        <TextInput
          onChange={handleCYearChange}
          value={cYear}
        />
        <Spacer />
        <Label>
          Credit Card CVC
        </Label>
        <TextInput
          onChange={handleCCodeChange}
          type="password"
          value={cCode}
        />
        <Spacer />
        <Button
          disabled={!canRegister}
          onClick={handleSignUp}
        >
          Register
        </Button>
      </Container>
    </FlexGroup>
  );
}

const Container = styled(FlexGroup)`
  align-items: center;
  margin-top: 30px;
  padding-left: 25%;
  padding-right: 25%;
`;

const Label = styled(FlexGroup)`
  font-size: 14px;
  font-weight: bold;
  text-align: left;
  text-transform: uppercase;
  margin-bottom: 5px;
`;

const Spacer = styled.div`
  height: 40px;
`;

const TierContainer = styled(FlexGroup)`
  min-width: 70%;
  max-width: 95%;
  background-color: ${COLOR_LIGHT_GRAY};
  padding: 20px;
  border-radius: 5px;
  box-shadow: 2px 2px 3px rgba(0, 0, 0, 0.1);
  border: 1px solid #ccc;
  margin-bottom: 40px;
  margin-top: 20px;
`;

const TiersContainer = styled(FlexGroup)`
  justify-content: space-between;
  flex-wrap: wrap;
`;

const TierItem = styled(FlexGroup)`
  margin-top: 20px;
  min-width: 200px;
  flex-direction: column;
  background-color: ${COLOR_MID_GRAY};
  font-weight: bold;
  padding: 20px;
  border-radius: 5px;
  box-shadow: 2px 2px 3px rgba(0, 0, 0, 0.1);
  border: 1px solid #ccc;
  cursor: pointer;
  background-color: ${({ selected }) => (selected ? COLOR_DARK_GRAY : COLOR_MID_GRAY)};
  color: ${({ selected }) => (selected ? COLOR_WHITE : COLOR_BLACK)};

  &:hover {
    background-color: ${COLOR_DARK_GRAY};
    color: white;
  }
`;

const LoadingContainer = styled(FlexGroup)`
  width: 100%;
  justify-content: center;
  margin-top: 100px;
`;

export default SignUp;
