import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { useTable, usePagination } from 'react-table';
import TableHeader from './components/TableHeader';
import Pagination from './components/Pagination';
import columns from './columns';
import { renderIf } from '../../utils';

import './assets/Table.scss';

const Table = ({ data, stats, loading, error, fetchData, fetchStats }) => {
  useEffect(() => {
    if (data.length === 0 && !loading && error === null) {
      fetchData();
      fetchStats();
    }
  });

  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    page,
    prepareRow,
    gotoPage,
    previousPage,
    nextPage,
    state: { pageIndex, pageSize },
    pageCount,
    pageOptions,
    canPreviousPage,
    canNextPage,
    setPageSize,
  } = useTable({ columns, data, initialState: { pageIndex: 0 } }, usePagination);

  return renderIf(() => data.length > 0, () => {
    const tableClass = "table table-striped table-bordered table-hover table-responsive-md"
    return (
      <>
        <Pagination
          gotoPage={gotoPage}
          previousPage={previousPage}
          nextPage={nextPage}
          pageIndex={pageIndex}
          pageSize={pageSize}
          pageCount={pageCount}
          pageOptions={pageOptions}
          canPreviousPage={canPreviousPage}
          canNextPage={canNextPage}
          setPageSize={setPageSize}
        />
        <div className="table-wrapper">
          <table { ...getTableProps({ className: tableClass }) }>
            <TableHeader fetchData={fetchData} headerGroups={headerGroups} stats={stats} />
            <tbody { ...getTableBodyProps() }>
              {
                page.map(row => (
                  prepareRow(row) || (
                    <tr { ...row.getRowProps() }>
                      {
                        row.cells.map(cell => <td { ...cell.getCellProps() }>{cell.render('Cell')}</td>)
                      }
                    </tr>
                  )
                ))
              }
            </tbody>
          </table>
        </div>
      </>
    );
  });
};

Table.propTypes = {
  data: PropTypes.arrayOf(PropTypes.object).isRequired,
  loading: PropTypes.bool.isRequired,
  fetchData: PropTypes.func.isRequired,
  fetchStats: PropTypes.func.isRequired,
  error: PropTypes.object,
  stats: PropTypes.object,
};

Table.defaultProps = {
  error: null,
  stats: null,
}

export default Table;
