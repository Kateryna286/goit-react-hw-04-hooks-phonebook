import React from 'react';
import './Filter.css';

const Filter = ({ value, onChange }) => (
  <div className="filter">
    <label>
      <span className="filterText">Filter</span>
      <input type="text" value={value} onChange={onChange} />
    </label>
  </div>
);

export default Filter;
