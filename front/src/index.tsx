import React from 'react';
import ReactDOM from 'react-dom';
import Application from './applications';
import { ApolloProvider } from '@apollo/react-hooks';
import {
  ApolloClient,
  InMemoryCache,
} from "@apollo/client";

const client = new ApolloClient({
  uri: 'http://localhost:3001/graphql',
  cache: new InMemoryCache()
});

ReactDOM.render(
  <React.StrictMode>
    <ApolloProvider client={client}>
      <Application />
    </ApolloProvider>
  </React.StrictMode>,
  document.getElementById('root')
);
