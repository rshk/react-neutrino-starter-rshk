import {ApolloClient} from 'apollo-client';
import {InMemoryCache} from 'apollo-cache-inmemory';
import {onError} from 'apollo-link-error';
import {ApolloLink} from 'apollo-link';
import {createUploadLink} from 'apollo-upload-client';
import {createHttpLink} from 'apollo-link-http';
import {setContext} from 'apollo-link-context';

import {doLogout, getToken} from './auth';


// TODO load from process.env.API_URL or similar
const API_URL = process.env.API_URL || 'https://graphqlbin.org/graphql';

const ENABLE_UPLOADS = true;


const onErrorLink = onError(({graphQLErrors, networkError}) => {
    if (graphQLErrors)
        graphQLErrors.map(({ message, locations, path }) =>
            console.log(
                `[GraphQL error]: Message: ${message}, Location: ${locations}, Path: ${path}`,
            ),
        );

    if (networkError) console.log(`[Network error]: ${networkError}`);

    if (networkError) {
        console.log(`[Network error]: ${networkError}`);

        if (networkError.statusCode === 401) {
            doLogout();  // Force re-login
        }
    }
});


const httpLink = (() => {
    const config = {
        uri: API_URL,
        credentials: 'same-origin'
    };

    if (ENABLE_UPLOADS) {
        return createUploadLink(config);
    }
    return createHttpLink(config);
})();


const authLink = setContext((_, {headers: extraHeaders}) => {
    const token = getToken();
    const headers = {...extraHeaders};
    if (token) {
        headers.authorization = `Bearer ${token}`;
    }
    return {headers};
});


const client = new ApolloClient({
    link: ApolloLink.from([
        onErrorLink,
        httpLink,
        authLink,
    ]),
    cache: new InMemoryCache()
});


export default client;
