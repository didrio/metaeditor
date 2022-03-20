import { useCallback } from 'react';
import PropTypes from 'prop-types';

function ImageInput({
  className,
  disabled,
  onChange,
}) {
  const handleChange = useCallback((e) => {
    const image = e.target.files[0];
    onChange(image);
  }, [onChange]);

  return (
    <input
      accept="image/png, image/jpeg"
      className={className}
      disabled={disabled}
      onChange={handleChange}
      type="file"
    />
  );
}

ImageInput.propTypes = {
  className: PropTypes.string.isRequired,
  disabled: PropTypes.bool.isRequired,
  onChange: PropTypes.func.isRequired,
};

export default ImageInput;
