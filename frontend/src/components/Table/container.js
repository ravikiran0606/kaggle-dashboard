import { connect } from 'react-redux';
import { getAllData } from '../../actions';

const mapStateToProps = state => ({
  data: state.data,
  loading: state.loading,
  error: state.error,
});

const mapDispatchToProps = dispatch => ({
  fetchData: (options = {}) => dispatch(getAllData(options)),
});

export default connect(mapStateToProps, mapDispatchToProps);
