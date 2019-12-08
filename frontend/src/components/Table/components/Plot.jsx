import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { BarChart, CartesianGrid, XAxis, YAxis, Tooltip, Bar, Label } from 'recharts';
import _ from 'lodash';

const Plot = ({ data, column }) => {
  const counts = _.entries(_.omit(_.countBy(data, column), 'null')).map(([key, val]) => ({
    x: key,
    y: val,
  }));
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
      <XAxis dataKey="x">
        <Label value="Values" offset={0} position="insideBottom" />
      </XAxis>
      <YAxis>
        <Label value="Count" angle={-90} position="insideLeft" />
      </YAxis>
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
