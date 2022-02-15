import { useCallback } from 'react';

const ImageInput = ({
  className,
  disabled, 
  onChange
}) => {
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
  )
};

export default ImageInput;
