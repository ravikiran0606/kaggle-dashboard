import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { useTable } from 'react-table';
import TableHeader from './components/TableHeader';
import columns from './columns';
import { renderIf } from '../../utils';

const Table = ({ data, loading, error, fetchData }) => {
  useEffect(() => {
    if (data.length === 0 && !loading) {
      fetchData();
    }
  });

  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    rows,
    prepareRow,
  } = useTable({ columns, data });

  return renderIf(() => data.length > 0, () => {
    const tableClass = "table table-striped table-bordered table-hover table-responsive-md"
    return (
      <table { ...getTableProps({ className: tableClass }) }>
        <TableHeader fetchData={fetchData} headerGroups={headerGroups} />
        <tbody { ...getTableBodyProps() }>
          {
            rows.map(row => (
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
    );
  });
};

Table.propTypes = {
  data: PropTypes.arrayOf(PropTypes.object).isRequired,
  loading: PropTypes.bool.isRequired,
  error: PropTypes.object.isRequired,
  fetchData: PropTypes.func.isRequired,
};

export default Table;
