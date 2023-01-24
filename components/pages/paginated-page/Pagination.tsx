import React from "react";
import { usePagination } from "../../hooks";

interface PaginationProps {
  pagination: ReturnType<typeof usePagination>;
}

const Pagination = ({ pagination }: PaginationProps) => (
  <div className="flex flex-col items-center md:justify-between w-full">
    <div className="flex items-center gap-2 flex-col md:flex-row w-full justify-center">
      <div className="flex items-center gap-x-2">
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
      </div>
      <div className="flex items-center gap-x-2">
        <p className="whitespace-nowrap">
          Page&nbsp;
          <strong>
            {pagination.getCurrPage + 1} of {pagination.getPageCount}
          </strong>
        </p>
        <div className="flex items-center gap-1">
          | Go to page:
          <input
            type="number"
            defaultValue={pagination.getCurrPage + 1}
            onChange={(e) => {
              const page = e.target.value ? Number(e.target.value) - 1 : 0;
              pagination.setPage(page);
            }}
            className="border p-1 rounded w-16"
          />
        </div>
      </div>

      <select
        onChange={(e) => {
          pagination.setPageSize(Number(e.target.value));
        }}
      >
        {[10, 20, 30, 40, 50].map((pageSize) => (
          <option key={pageSize} value={pageSize}>
            Show {pageSize}
          </option>
        ))}
      </select>
    </div>
  </div>
);

export default Pagination;
