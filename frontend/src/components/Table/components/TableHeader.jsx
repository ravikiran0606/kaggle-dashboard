import React from 'react';
import PropTypes from 'prop-types';

import './TableHeader.scss';

const TableHeader = ({ headerGroups, fetchData }) => {
  const onClick = (key, order = 'asc') => fetchData({
    sort: true,
    key,
    order,
  });

  return (
    <thead>
      {
        headerGroups.map(headerGroup => (
          <tr { ...headerGroup.getHeaderGroupProps() }>
            {
              headerGroup.headers.map((column) => {
                return (
                  <th scope="col" {...column.getHeaderProps({ className: 'header' })}>
                    <span>
                      {column.render('Header')}
                      <span className="actions">
                        <i className="material-icons" onClick={() => onClick(column.Header)}>keyboard_arrow_up</i>
                        <i className="material-icons" onClick={() => onClick(column.Header, 'desc')}>keyboard_arrow_down</i>
                        <i className="material-icons">filter_list</i>
                      </span>
                    </span>
                  </th>
                );
              })
            }
          </tr>
        ))
      }
    </thead>
  );
};

TableHeader.propTypes = {
  headerGroups: PropTypes.array.isRequired,
  fetchData: PropTypes.func.isRequired,
};

export default TableHeader;
