import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import Popup from 'reactjs-popup';
import FilterForm from './FilterForm';
import { renderIf, renderIfElse } from '../../../utils';

import './assets/TableHeader.scss';

const TableHeader = ({ headerGroups, fetchData, stats }) => {
  const [state, setState] = useState({ filter: false });

  useEffect(() => {
    if (state.filter) {
      if (state.colType === 'number' && state.start && state.end) {
        fetchData({ ...state });
      }
      if (state.colType === 'string' && state.value) {
        fetchData({ ...state });
      }
    }
  }, [fetchData, state]);

  const onClick = (key, order = 'asc') => fetchData({
    sort: true,
    key,
    order,
  });

  const onChange = (col, type) => (key, value) => {
    setState({
      ...state,
      col,
      colType: type,
      [key]: value,
    });
  };

  return (
    <thead>
      {
        headerGroups.map((headerGroup, i) => (
          <React.Fragment key={i}>
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
                          <Popup
                            trigger={<i className="material-icons">filter_list</i>}
                            position="bottom center"
                          >
                            <FilterForm type={column.type} onChange={onChange(column.render('Header'), column.type)} />
                          </Popup>
                        </span>
                      </span>
                    </th>
                  );
                })
              }
            </tr>
            {
              renderIf(() => stats, () => (
                <tr>
                  {
                    headerGroup.headers.map((column, i) => {
                      return (
                        <th key={i} scope="col">
                          {
                            renderIfElse(
                              () => column.Header === 'ID',
                              () => <span />,
                              () => (
                                <>
                                  { Object.keys(stats[column.Header]).map(key => <p key={key}>{`${key}: ${stats[column.Header][key]}`}</p>) }
                                </>
                              ),
                            )
                          }
                        </th>
                      );
                    })
                  }
                </tr>
              ))
            }
          </React.Fragment>
        ))
      }
    </thead>
  );
};

TableHeader.propTypes = {
  headerGroups: PropTypes.array.isRequired,
  fetchData: PropTypes.func.isRequired,
  stats: PropTypes.object,
};

TableHeader.defaultProps = {
  stats: null,
};

export default TableHeader;
