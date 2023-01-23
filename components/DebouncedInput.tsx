import React, { useEffect, useState } from "react";

interface DebouncedInputProps
  extends Omit<React.InputHTMLAttributes<HTMLInputElement>, "onChange"> {
  value: string | number;
  onChange: (value: string | number) => void;
  debounce?: number;
}

const DebouncedInput = ({
  value,
  onChange,
  debounce,
  ...props
}: DebouncedInputProps) => {
  const [val, setVal] = useState<string | number>(value);
  useEffect(() => {
    setVal(value);
  }, []);

  useEffect(() => {
    const timeout = setTimeout(() => {
      onChange(value);
    }, debounce);

    return () => clearTimeout(timeout);
  }, [val]);

  return (
    <input {...props} value={val} onChange={(e) => setVal(e.target.value)} />
  );
};

export default DebouncedInput;
