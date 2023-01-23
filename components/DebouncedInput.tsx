import React, { useEffect, useState } from "react";

interface DebouncedInputProps
  extends Omit<React.InputHTMLAttributes<HTMLInputElement>, "onChange"> {
  id: string;
  value: string | number;
  onChange: (value: string | number) => void;
  debounce?: number;
  label?: string;
}

const DebouncedInput = ({
  id,
  value,
  onChange,
  debounce = 400,
  label,
  ...props
}: DebouncedInputProps) => {
  const [val, setVal] = useState<string | number>(value);
  useEffect(() => {
    setVal(value);
  }, []);

  useEffect(() => {
    const timeout = setTimeout(() => {
      onChange(val);
    }, debounce);

    return () => clearTimeout(timeout);
  }, [val]);

  return (
    <>
      {label ? <label htmlFor={id}>{label}</label> : null}
      <input
        id={id}
        className="border rounded py-2 px-3 max-w-md focus:border-blue-500 focus:outline-none"
        placeholder="Search..."
        {...props}
        value={val}
        onChange={(e) => setVal(e.target.value)}
      />
    </>
  );
};

export default DebouncedInput;
