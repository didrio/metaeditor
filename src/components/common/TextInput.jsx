import PropTypes from 'prop-types';
import styled from 'styled-components';
import {
  COLOR_DARK_GRAY,
  COLOR_LIGHT_GRAY,
  COLOR_WHITE,
} from '../../constants';

function TextInput({
  disabled,
  onChange,
  type,
  value,
}) {
  const handleChange = (e) => {
    const { value: inputValue } = e.target;
    onChange(inputValue, e);
  };

  return (
    <Container
      disabled={disabled}
      onChange={handleChange}
      type={type}
      value={value}
    />
  );
}

const Container = styled.input`
  border: 1px solid ${COLOR_DARK_GRAY};
  border-radius: 2px;
  box-sizing: border-box;
  height: 30px;
  width: 100%;
  padding: 5px 10px;
  outline: none;
  background-color: ${({ disabled }) => (disabled ? COLOR_LIGHT_GRAY : COLOR_WHITE)};
`;

TextInput.propTypes = {
  disabled: PropTypes.bool,
  onChange: PropTypes.func.isRequired,
  type: PropTypes.string,
  value: PropTypes.string.isRequired,
};

TextInput.defaultProps = {
  disabled: false,
  type: 'text',
};

export default TextInput;
