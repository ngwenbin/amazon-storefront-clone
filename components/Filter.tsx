import React from "react";
import DebouncedInput from "./DebouncedInput";

export interface FilterReturnValue {
  filterKey: string;
  filterValue: string | number | undefined;
}

interface FilterOptions {
  label: string;
  value: string | number;
}

interface FilterProps {
  filterKey: string;
  filterOptions: Array<FilterOptions>;
  value: string | number;
  onChange: (selected?: FilterReturnValue) => void;
  label?: string;
}

export const Filter = ({
  filterKey,
  filterOptions,
  value,
  onChange,
  label,
}: FilterProps) => (
  <div>
    <datalist id={`${filterKey}-list`}>
      {Object.values(filterOptions).map((optionObj) => (
        <option value={optionObj.value} key={`option-${optionObj.value}`}>
          {optionObj.label}
        </option>
      ))}
    </datalist>
    <DebouncedInput
      id={filterKey}
      label={label}
      value={value ?? ""}
      trigger="debounce"
      placeholder="Filter..."
      onChange={(value) => onChange({ filterKey, filterValue: value })}
      list={`${filterKey}-list`}
    />
  </div>
);
