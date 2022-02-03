import { useCallback } from 'react';

const TextInput = ({
  className,
  disabled, 
  onChange,
  value
}) => {
  const handleChange = useCallback((e) => {
    const value = e.target.value;
    onChange(value);
  }, [onChange]);

  return (
    <input
      className={className}
      disabled={disabled}
      onChange={handleChange}
      value={value}
    />
  )
};

export default TextInput;
