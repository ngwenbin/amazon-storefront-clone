import { useEffect, useReducer } from "react";

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

interface PaginationState {
  currPageIdx: number;
  pageSize: number;
  canPrevPage: boolean;
  canNextPage: boolean;
  numOfPages: number;
  totalCount: number;
}

interface PaginationAction {
  type:
    | "onNextPage"
    | "onPrevPage"
    | "onFirstPage"
    | "onLastPage"
    | "onPageSelect"
    | "updatePageSize"
    | "updateTotalCount"
    | "canNextPage"
    | "canPrevPage";
  payload?: Partial<PaginationState>;
}

const paginationReducer = (
  state: PaginationState,
  action: PaginationAction
) => {
  const { type, payload } = action;
  switch (type) {
    case "onNextPage":
      return {
        ...state,
        currPageIdx: state.canNextPage
          ? state.currPageIdx + 1
          : state.currPageIdx,
      };
    case "onPrevPage":
      return {
        ...state,
        currPageIdx: state.canPrevPage
          ? state.currPageIdx - 1
          : state.currPageIdx,
      };
    case "onFirstPage":
      return {
        ...state,
        currPageIdx: 0,
      };
    case "onLastPage":
      return {
        ...state,
        currPageIdx: state.numOfPages - 1,
      };
    case "onPageSelect":
      return {
        ...state,
        currPageIdx: payload.currPageIdx,
      };
    case "updatePageSize":
      return {
        ...state,
        pageSize: payload.pageSize,
        numOfPages: Math.ceil(state.totalCount / payload.pageSize),
      };
    case "updateTotalCount":
      return {
        ...state,
        totalCount: payload.totalCount,
        numOfPages: Math.ceil(payload.totalCount / state.pageSize),
      };
    case "canNextPage":
      return {
        ...state,
        canNextPage: state.currPageIdx < state.numOfPages - 1,
      };
    case "canPrevPage":
      return {
        ...state,
        canPrevPage: state.currPageIdx > 0,
      };
    default:
      return {
        ...state,
      };
  }
};

const usePagination = ({
  pageChangeHandler,
  totalCount,
  ItemsPerPage,
  initialPage,
}: usePaginationProps) => {
  const [state, dispatch] = useReducer(paginationReducer, {
    currPageIdx: initialPage ?? 0,
    pageSize: ItemsPerPage,
    canNextPage: true,
    canPrevPage: false,
    totalCount,
    numOfPages: Math.ceil(totalCount / ItemsPerPage),
  });

  useEffect(() => {
    dispatch({ type: "canNextPage" });
    dispatch({ type: "canPrevPage" });
  }, [state.numOfPages, state.currPageIdx]);

  useEffect(() => {
    dispatch({
      type: "updateTotalCount",
      payload: {
        totalCount,
      },
    });
  }, [totalCount]);

  useEffect(() => {
    if (state.totalCount) {
      const settings = {
        offset: state.currPageIdx * state.pageSize,
        limit: state.pageSize,
        rawCurrPageIdx: state.currPageIdx,
      };
      pageChangeHandler(settings);
    }
  }, [state.currPageIdx]);

  return {
    getCurrPage: state.currPageIdx,
    getPageCount: state.numOfPages,
    getPageSize: state.pageSize,
    setPageSize: (val: number) => {
      dispatch({ type: "updatePageSize", payload: { pageSize: val } });
      const settings = {
        offset: 0,
        limit: val,
        rawCurrPageIdx: 0,
      };
      pageChangeHandler(settings);
    },
    nextPage: () => dispatch({ type: "onNextPage" }),
    prevPage: () => dispatch({ type: "onPrevPage" }),
    firstPage: () => dispatch({ type: "onFirstPage" }),
    lastPage: () => dispatch({ type: "onLastPage" }),
    setPage: (pageIdx: number) =>
      dispatch({ type: "onPageSelect", payload: { currPageIdx: pageIdx } }),
    canPrevPage: state.canPrevPage,
    canNextPage: state.canNextPage,
  };
};

export default usePagination;
