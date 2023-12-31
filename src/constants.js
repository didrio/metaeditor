export const DEFAULT_USER_DATA = {
  admin: false,
  affiliates: '',
  artist: '',
  comments: '',
  contactEmail: '',
  credits: 0,
  email: '',
  name: '',
  phone: '',
  producer: '',
  splits: '',
};

export const ERROR_MESSAGES = {
  'auth/invalid-email': 'The email was incorrectly formatted. Please try again',
};

export const COLOR_BLACK = '#000000';
export const COLOR_BLUE = '2a64f6d9';
export const COLOR_DARK_GRAY = '#a0a0a0';
export const COLOR_MID_GRAY = '#d0d0d0';
export const COLOR_LIGHT_GRAY = '#f0f0f0';
export const COLOR_RED = '#f00';
export const COLOR_WHITE = '#ffffff';

export const HTTP_POST_OPTIONS = {
  method: 'POST',
  'Content-Type': 'application/json',
};

export const CREATE_CUSTOMER_ENDPOINT = (
  window?.location?.hostname?.includes('localhost')
    ? 'http://localhost:5001/mymetadata-380af/us-central1/createCustomer'
    : 'https://us-central1-mymetadata-380af.cloudfunctions.net/createCustomer'
);
