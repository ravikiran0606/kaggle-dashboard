import { connect } from 'react-redux';
import { getAllData, getStats } from '../../actions';

const mapStateToProps = state => ({
  data: state.data,
  stats: state.stats,
  loading: state.loading,
  error: state.error,
});

const mapDispatchToProps = dispatch => ({
  fetchData: (options = {}) => dispatch(getAllData(options)),
  fetchStats: () => dispatch(getStats()),
});

export default connect(mapStateToProps, mapDispatchToProps);
