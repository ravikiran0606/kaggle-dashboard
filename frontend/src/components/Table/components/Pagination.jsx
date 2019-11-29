import React from 'react';
import PropTypes from 'prop-types';

import './assets/Pagination.scss';

const getButtonClass = isDisabled => (
  isDisabled ? `btn btn-primary btn-sm disabled` : `btn btn-primary btn-sm`
);

const Pagination = (props) => {
  const {
    gotoPage,
    previousPage,
    nextPage,
    pageIndex,
    pageCount,
    pageSize,
    pageOptions,
    canPreviousPage,
    canNextPage,
    setPageSize,
  } = props;
  return (
    <div className="pagination">
      <div className="pagination__actions">
        <button type="button" className={getButtonClass(!canPreviousPage)} onClick={() => gotoPage(0)} disabled={!canPreviousPage}>
          {'<<'}
        </button>
        <button type="button" className={getButtonClass(!canPreviousPage)} onClick={() => previousPage()} disabled={!canPreviousPage}>
          {'<'}
        </button>
        <button type="button" className={getButtonClass(!canNextPage)} onClick={() => nextPage()} disabled={!canNextPage}>
          {'>'}
        </button>
        <button type="button" className={getButtonClass(!canNextPage)} onClick={() => gotoPage(pageCount - 1)} disabled={!canNextPage}>
          {'>>'}
        </button>
      </div>
      <div className="pagination__indicator">
        <span>
          Page{' '}
          <strong>
            {pageIndex + 1} of {pageOptions.length}
          </strong>{' '}
        </span>
        <span className="pagination__indicator__goto">
          | Go to page:{' '}
          <input
            className="form-control"
            type="number"
            defaultValue={pageIndex + 1}
            onChange={(e) => {
              const page = e.target.value ? Number(e.target.value) - 1 : 0
              gotoPage(page)
            }}
            style={{ width: '100px' }}
          />
          <select
            className="form-control"
            value={pageSize}
            onChange={e => setPageSize(Number(e.target.value))}
          >
            {
              [10, 20, 30, 40, 50].map((pageSize) => (
                <option key={pageSize} value={pageSize}>
                  Show {pageSize}
                </option>
              ))
            }
          </select>
        </span>
      </div>
    </div>
  );
};

Pagination.propTypes = {
  pageIndex: PropTypes.number.isRequired,
  pageCount: PropTypes.number.isRequired,
  pageSize: PropTypes.number.isRequired,
  pageOptions: PropTypes.array.isRequired,
  canPreviousPage: PropTypes.bool.isRequired,
  canNextPage: PropTypes.bool.isRequired,
  gotoPage: PropTypes.func.isRequired,
  previousPage: PropTypes.func.isRequired,
  nextPage: PropTypes.func.isRequired,
  setPageSize: PropTypes.func.isRequired,
};

export default Pagination;
