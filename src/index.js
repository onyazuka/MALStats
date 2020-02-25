import React from 'react';
import {render} from 'react-dom';
import { Provider } from 'react-redux';
import { createStore } from 'redux';
import rootReducer from './reducers';
import AppContainer from './Containers/AppContainer';

const store = createStore(rootReducer);

document.addEventListener("DOMContentLoaded", () => {
    render(
        <Provider store={store}>
            <AppContainer />
        </Provider>,
        document.getElementById('root')
    );
});
