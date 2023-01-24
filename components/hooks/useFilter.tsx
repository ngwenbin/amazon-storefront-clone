import { useEffect, useState } from "react";

interface UseFilterState {
  search?: string;
  filterArray?: Array<Record<string, string | number>>;
}

interface UseFilterProps {
  filterChangeHandler: (settings: UseFilterState) => void;
}

const useFilter = ({ filterChangeHandler }: UseFilterProps) => {
  const [filters, setFilters] = useState<UseFilterState>();

  const applyFilter = (
    filterKey: string,
    filterValue: string | number | undefined
  ) => {
    const existingFilterArray = filters?.filterArray
      ? [...filters.filterArray]
      : []; // deep copy array over if defined
    const isFilterApplied = existingFilterArray.findIndex(
      (filterObj) => filterKey in filterObj
    );
    if (isFilterApplied !== -1) {
      // remove old filters
      existingFilterArray.splice(isFilterApplied, 1);
    }
    setFilters({
      ...(filters ?? {}),
      filterArray: [...existingFilterArray, { [filterKey]: filterValue ?? "" }],
    });
  };

  const searchFilter = (searchKey: string | number | undefined) =>
    setFilters({
      ...(filters ?? {}),
      search: searchKey.toString() ?? "",
    });

  useEffect(() => {
    if (filters) {
      filterChangeHandler(filters);
    }
  }, [filters]);

  return {
    searchFilter,
    applyFilter,
    getFilters: () => filters,
  };
};

export default useFilter;
