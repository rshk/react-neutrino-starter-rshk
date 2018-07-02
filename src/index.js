import React from 'react';
import {render} from 'react-dom';
import {AppContainer} from 'react-hot-loader';

import ApolloProvider from 'lib/apollo-provider';

import App from './App';
import './index.global.scss';


const root = document.getElementById('root')
const load = () => render((
    <AppContainer>
        <ApolloProvider>
            <App />
        </ApolloProvider>
    </AppContainer>
), root)

// This is needed for Hot Module Replacement
if (module.hot) {
    module.hot.accept('./App', load)
}

load()
