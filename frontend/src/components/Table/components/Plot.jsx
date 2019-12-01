import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { BarChart, CartesianGrid, XAxis, YAxis, Tooltip, Bar } from 'recharts';
import _ from 'lodash';

const Plot = ({ data, column }) => {
  const counts = _.entries(_.omit(_.countBy(data, column), 'null')).map(([key, val]) => ({
    x: key,
    y: val,
  }));
  console.log(counts);
  // return (
  //   <Plotly
  //     data={[
  //       {
  //         x: counts[0],
  //         y: counts[1],
  //         type: 'bar',
  //       }
  //     ]}
  //   />
  // )
  return (
    <BarChart
      width={500}
      height={300}
      data={counts}
      margin={{
        top: 5, right: 30, left: 20, bottom: 5,
      }}
    >
      <CartesianGrid strokeDasharray="3 3" />
      <XAxis dataKey="x" />
      <YAxis />
      <Tooltip />
      <Bar dataKey="y" fill="#0000ff" />
    </BarChart>
  );
}

Plot.propTypes = {
  data: PropTypes.array.isRequired,
  column: PropTypes.string.isRequired,
};

const mapStateToProps = ({ data }) => ({
  data,
});

const container = connect(mapStateToProps)

export default container(Plot);
