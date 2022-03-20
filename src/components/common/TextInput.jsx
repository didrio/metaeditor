import PropTypes from 'prop-types';
import styled from 'styled-components';

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
  background-color: skyblue;
`;

TextInput.propTypes = {
  disabled: PropTypes.bool,
  onChange: PropTypes.func.isRequired,
  type: PropTypes.string.isRequired,
  value: PropTypes.string.isRequired,
};

TextInput.defaultProps = {
  disabled: false,
};

export default TextInput;
