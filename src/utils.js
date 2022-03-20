import { ERROR_MESSAGES } from './constants';

export const doNothing = () => {};

export const getErrorMessage = ({ message }) => {
  const errorKey = Object.keys(ERROR_MESSAGES).find((key) => message.includes(key));
  return errorKey ? ERROR_MESSAGES[errorKey] : '';
};
