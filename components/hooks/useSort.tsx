import { useEffect, useState } from "react";

interface SortByState {
  sortKey: string;
  sortDirection: "ascending" | "descending";
}

interface UseSortByProps {
  sortByChangeHandler: (settings: SortByState) => void;
}

const useSort = ({ sortByChangeHandler }: UseSortByProps) => {
  const [sortBy, setSortBy] = useState<SortByState>();

  useEffect(() => {
    sortByChangeHandler(sortBy);
  }, [sortBy]);

  return {
    setSortBy,
  };
};

export default useSort;
