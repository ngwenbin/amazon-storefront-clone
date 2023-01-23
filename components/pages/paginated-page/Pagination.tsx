import React from "react";
import { usePagination } from "../../hooks";
import { paginationSettings } from "../../hooks/usePagination";

interface PaginationProps {
  onPageChangeCb: (settings: paginationSettings) => void;
  totalCount: number;
  initialPageSize: number;
}

const Pagination = ({
  onPageChangeCb,
  totalCount,
  initialPageSize,
}: PaginationProps) => {
  const pagination = usePagination({
    pageChangeHandler: (settings) => onPageChangeCb(settings),
    totalCount,
    ItemsPerPage: initialPageSize,
  });

  return (
    <div className="flex flex-col items-center">
      <div className="flex items-center gap-2">
        <button
          type="button"
          className="border rounded p-1 disabled:bg-gray-100"
          onClick={() => pagination.firstPage()}
          disabled={!pagination.canPrevPage}
        >
          {"<<"}
        </button>
        <button
          type="button"
          className="border rounded p-1 disabled:bg-gray-100"
          onClick={() => pagination.prevPage()}
          disabled={!pagination.canPrevPage}
        >
          {"<"}
        </button>
        <button
          type="button"
          className="border rounded p-1 disabled:bg-gray-100"
          onClick={() => pagination.nextPage()}
          disabled={!pagination.canNextPage}
        >
          {">"}
        </button>
        <button
          type="button"
          className="border rounded p-1 disabled:bg-gray-100"
          onClick={() => pagination.lastPage()}
          disabled={!pagination.canNextPage}
        >
          {">>"}
        </button>
        <span className="flex items-center gap-1">
          <div>Page</div>
          <strong>
            {pagination.getCurrPage() + 1} of {pagination.getPageCount()}
          </strong>
        </span>
        <span className="flex items-center gap-1">
          | Go to page:
          <input
            type="number"
            defaultValue={pagination.getCurrPage() + 1}
            onChange={(e) => {
              const page = e.target.value ? Number(e.target.value) - 1 : 0;
              pagination.setPage(page);
            }}
            className="border p-1 rounded w-16"
          />
        </span>
        {/* <select
          onChange={(e) => {
            pagination.setPageSize(Number(e.target.value));
          }}
        >
          {[10, 20, 30, 40, 50].map((pageSize) => (
            <option key={pageSize} value={pageSize}>
              Show {pageSize}
            </option>
          ))}
        </select> */}
      </div>
    </div>
  );
};

export default Pagination;
