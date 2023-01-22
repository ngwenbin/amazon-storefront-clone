import { useEffect, useState } from "react";

export interface paginationSettings {
  offset: number;
  limit: number;
  rawCurrPageIdx: number;
}

interface usePaginationProps {
  pageChangeHandler: (settings: paginationSettings) => void;
  /**
   * Length of data array
   */
  totalCount: number;
  /**
   * Number of data to display per page
   */
  ItemsPerPage: number;
  initialPage?: number;
}

const usePagination = ({
  pageChangeHandler,
  totalCount,
  ItemsPerPage,
  initialPage,
}: usePaginationProps) => {
  const [currentPageIndx, setCurrentPageIndx] = useState(initialPage ?? 0);
  const [pageSize, setPageSize] = useState<number>(ItemsPerPage);
  const [canPrevPage, setCanPrevPage] = useState(false);
  const [canNextPage, setCanNextPage] = useState(true);

  const numOfPages = Math.ceil(totalCount / pageSize);

  const onNextPage = () => setCurrentPageIndx((curr) => curr + 1);
  const onPrevPage = () => setCurrentPageIndx((curr) => curr - 1);
  const onFirstPage = () => setCurrentPageIndx(0);
  const onLastPage = () => setCurrentPageIndx(numOfPages - 1);
  const onPageSelect = (pageIdx: number) => setCurrentPageIndx(pageIdx);
  const getCurrPage = () => currentPageIndx;
  const getPageCount = () => numOfPages;
  const getPageSize = () => ItemsPerPage;

  useEffect(() => {
    setCanNextPage(currentPageIndx < numOfPages - 1);
    setCanPrevPage(currentPageIndx > 0);
  }, [numOfPages, currentPageIndx]);

  useEffect(() => {
    const settings = {
      offset: currentPageIndx * pageSize,
      limit: pageSize,
      rawCurrPageIdx: currentPageIndx,
    };
    pageChangeHandler(settings);
  }, [currentPageIndx, pageSize]);

  return {
    getCurrPage,
    getPageCount,
    getPageSize,
    setPageSize,
    nextPage: onNextPage,
    prevPage: onPrevPage,
    firstPage: onFirstPage,
    lastPage: onLastPage,
    setPage: onPageSelect,
    canPrevPage,
    canNextPage,
  };
};

export default usePagination;
