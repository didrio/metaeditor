import { useCallback } from 'react';
import PropTypes from 'prop-types';

function TextInput({
  className,
  disabled,
  onChange,
  value,
}) {
  const handleChange = useCallback((e) => {
    const { value: inputValue } = e.target;
    onChange(inputValue);
  }, [onChange]);

  return (
    <input
      className={className}
      disabled={disabled}
      onChange={handleChange}
      value={value}
    />
  );
}

TextInput.propTypes = {
  className: PropTypes.string.isRequired,
  disabled: PropTypes.bool.isRequired,
  onChange: PropTypes.func.isRequired,
  value: PropTypes.string.isRequired,
};

export default TextInput;
