const columns = {
  ID: 'number',
  Name: 'string',
  Sex: 'string',
  Age: 'number',
  Height: 'number',
  Weight: 'number',
  Team: 'string',
  NOC: 'string',
  Games: 'string',
  Year: 'number',
  Season: 'number',
  City: 'string',
  Sport: 'string',
  Event: 'string',
  Medal: 'string',
};

export default Object.keys(columns).map(column => ({ Header: column, accessor: column, type: columns[column] }));
