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
  COLOR_MID_GRAY,
  DEFAULT_USER_DATA,
  HTTP_POST_OPTIONS,
} from '../constants';
import { getErrorMessage } from '../utils';
import useAuth from '../hooks/useAuth';

function SignUp() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [cNumber, setCNumber] = useState('');
  const [cMonth, setCMonth] = useState('');
  const [cYear, setCYear] = useState('');
  const [cCode, setCCode] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [tier, setTier] = useState(null);
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
        <SelectTierText>
          Select a tier:
        </SelectTierText>
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
          hasBorder
          onChange={handleEmailChange}
          placeholder="you@mymusicmetadata.com"
          type="email"
          value={email}
        />
        <Spacer />
        <Label>
          Password
        </Label>
        <TextInput
          hasBorder
          onChange={handlePasswordChange}
          placeholder="********"
          type="password"
          value={password}
        />
        <Spacer />
        <Label>
          Credit Card Number
        </Label>
        <TextInput
          hasBorder
          onChange={handleCNumberChange}
          placeholder="1244 1244 1244 1244"
          value={cNumber}
        />
        <Spacer />
        <Label>
          Credit Card Expiry Month
        </Label>
        <TextInput
          hasBorder
          onChange={handleCMonthChange}
          placeholder="01"
          value={cMonth}
        />
        <Spacer />
        <Label>
          Credit Card Expiry Year
        </Label>
        <TextInput
          hasBorder
          onChange={handleCYearChange}
          placeholder="24"
          value={cYear}
        />
        <Spacer />
        <Label>
          Credit Card CVC
        </Label>
        <TextInput
          hasBorder
          onChange={handleCCodeChange}
          placeholder="111"
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
  align-items: flex-start;
  justify-content: center;
  padding-left: 25%;
  padding-right: 25%;
  height: 700px;
`;

const Label = styled(FlexGroup)`
  color: #a70003;
  font-size: 14px;
  font-weight: bold;
  text-align: left;
  margin-bottom: 10px;
  margin-left: 5px;
`;

const Spacer = styled.div`
  height: 35px;
`;

const TierContainer = styled(FlexGroup)`
  padding: 20px;
`;

const TiersContainer = styled(FlexGroup)`
  justify-content: space-between;
  flex-wrap: wrap;
`;

const TierItem = styled(FlexGroup)`
  margin-top: 20px;
  margin-right: 20px;
  min-width: 200px;
  flex-direction: column;
  background-color: ${COLOR_MID_GRAY};
  font-weight: bold;
  padding: 20px;
  border-radius: 5px;
  box-shadow: 2px 2px 3px rgba(0, 0, 0, 0.1);
  cursor: pointer;
  background-color: ${({ selected }) => (selected ? '#a70003' : '#e3223c')};
  color: white;

  &:hover {
    background-color: #e3223cbb;
    color: white;
  }
`;

const LoadingContainer = styled(FlexGroup)`
  width: 100%;
  justify-content: center;
  margin-top: 100px;
`;

const SelectTierText = styled(FlexGroup)`
  color: #a70003;
  font-size: 20px;
  font-weight: 700;
`;

export default SignUp;
