import React from 'react';
import PropTypes from 'prop-types';
import { renderIf } from '../../../utils';

const FilterForm = ({ type, onChange }) => (
  <div className="filter-form">
    {
      renderIf(() => type === 'number', () => (
        <div className="filter-form__number">
          Start: <input name="start" onChange={e => onChange('start', parseInt(e.target.value, 10))} />
          <br />
          End: <input name="end" onChange={e => onChange('end', parseInt(e.target.value, 10))} />
          <br />
          <button onClick={() => onChange('filter', true)}>Filter</button>
        </div>
      ))
    }
    {
      renderIf(() =>  type === 'string', () => (
        <div className="filter-form__string">
          Value: <input name="value" onChange={e => onChange('value', e.target.value)} />
          <button onClick={() => onChange('filter', true)}>Filter</button>
        </div>
      ))
    }
  </div>
);

FilterForm.propTypes = {
  type: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
};

export default FilterForm;
