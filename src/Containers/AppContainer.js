import { connect } from 'react-redux';
import { setLoading, setLoadingStatus, updateUserInfos, updateSearchTerm, 
    updateCurrentUsername, setError, setActivePage } from '../actions';
import App from '../App';

const mapStateToProps = state => ({
    activePage: state.app.activePage,
    userInfos: state.app.userInfos,
    loadingStatus: state.app.loadingStatus,
    curUsername: state.app.curUsername,
    searchTerm: state.app.searchTerm,
    error: state.app.error,
});

const mapDispatchToProps = dispatch => ({
    setLoadingStatus: loadingStatus => dispatch(setLoadingStatus(loadingStatus)),
    updateUserInfos: newUserInfos => dispatch(updateUserInfos(newUserInfos)),
    updateSearchTerm: newSearchTerm => dispatch(updateSearchTerm(newSearchTerm)),
    updateCurrentUsername: newUsername => dispatch(updateCurrentUsername(newUsername)),
    setError: newError => dispatch(setError(newError)),
    setActivePage: page => dispatch(setActivePage(page)),
});

const AppContainer = connect(
    mapStateToProps,
    mapDispatchToProps,
)(App);

export default AppContainer;