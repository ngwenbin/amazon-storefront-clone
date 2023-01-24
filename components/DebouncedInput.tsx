import React, { useEffect, useState } from "react";

export interface DebouncedInputProps
  extends Omit<React.InputHTMLAttributes<HTMLInputElement>, "onChange"> {
  id: string;
  value: string | number;
  onChange: (value: string | number) => void;
  trigger: "debounce" | "keydown";
  debounce?: number;
  label?: string;
}

const DebouncedInput = ({
  id,
  value,
  onChange,
  trigger,
  debounce = 400,
  label,
  ...props
}: DebouncedInputProps) => {
  const [val, setVal] = useState<string | number>(value);
  useEffect(() => {
    setVal(value);
  }, []);

  // eslint-disable-next-line consistent-return
  useEffect(() => {
    if (trigger === "debounce") {
      const timeout = setTimeout(() => {
        onChange(val);
      }, debounce);

      return () => clearTimeout(timeout);
    }
  }, [val]);

  return (
    <div>
      {label ? (
        <label htmlFor={id} className="text-sm font-medium mb-1 block">
          {label}
        </label>
      ) : null}
      <input
        id={id}
        className="min-w-[284px] text-sm border rounded py-2 px-3 w-full focus:border-blue-500 focus:outline-none"
        placeholder="Search..."
        {...props}
        value={val}
        onChange={(e) => setVal(e.target.value)}
        onKeyDown={(e) => {
          if (trigger === "keydown" && e.key === "Enter") {
            onChange(val);
          }
        }}
      />
    </div>
  );
};

export default DebouncedInput;
