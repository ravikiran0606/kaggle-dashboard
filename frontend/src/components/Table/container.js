import { connect } from 'react-redux';
import { getAllData } from '../../actions';

const mapStateToProps = state => ({
  data: state.data,
  loading: state.loading,
  error: state.error,
});

const mapDispatchToProps = dispatch => ({
  fetchData: () => dispatch(getAllData()),
});

export default connect(mapStateToProps, mapDispatchToProps);
