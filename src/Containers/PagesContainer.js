import { connect } from 'react-redux';
import { setActivePage } from '../actions';
import Pages from '../Components/Pages';

const mapStateToProps = state => ({
    activePage: state.app.activePage,
});

const mapDispatchToProps = dispatch => ({
    setActivePage: page => dispatch(setActivePage(page)),
});

const PagesContainer = connect(
    mapStateToProps,
    mapDispatchToProps,
)(Pages);

export default PagesContainer;