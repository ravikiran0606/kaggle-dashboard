const columns = [
  'ID',
  'Name',
  'Sex',
  'Age',
  'Height',
  'Weight',
  'Team',
  'NOC',
  'Games',
  'Year',
  'Season',
  'City',
  'Sport',
  'Event',
  'Medal',
];

export default columns.map(column => ({ Header: column, accessor: column }));
