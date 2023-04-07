import PropTypes from 'prop-types';
import styled from 'styled-components';
import {
  COLOR_LIGHT_GRAY,
  COLOR_WHITE,
} from '../../constants';

function TextInput({
  hasBorder,
  disabled,
  onChange,
  placeholder,
  type,
  value,
}) {
  const handleChange = (e) => {
    const { value: inputValue } = e.target;
    onChange(inputValue, e);
  };

  return (
    <Container
      hasBorder={hasBorder}
      disabled={disabled}
      onChange={handleChange}
      placeholder={placeholder}
      type={type}
      value={value}
    />
  );
}

const Container = styled.input`
  color: #a70003;
  border-radius: 12px;
  border: ${({ hasBorder }) => (hasBorder ? '2px solid #a70003' : 'none')}};
  box-sizing: border-box;
  height: 40px;
  width: 100%;
  padding: 15px 20px;
  outline: none;
  font-weight: 700;
  background-color: ${({ disabled }) => (disabled ? COLOR_LIGHT_GRAY : COLOR_WHITE)};

  &::placeholder {
    color: #a70003;
    opacity: 0.45;
  }
`;

TextInput.propTypes = {
  hasBorder: PropTypes.bool,
  disabled: PropTypes.bool,
  onChange: PropTypes.func.isRequired,
  placeholder: PropTypes.string,
  type: PropTypes.string,
  value: PropTypes.string.isRequired,
};

TextInput.defaultProps = {
  hasBorder: false,
  disabled: false,
  placeholder: '',
  type: 'text',
};

export default TextInput;
