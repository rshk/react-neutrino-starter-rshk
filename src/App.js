import React from 'react';

import GraphQLDemo from 'demo/graphql';

import styles from './App.scss';


export default class App extends React.Component {
  state = {
    name: 'react-neutrino-starter-rshk'
  };

  render () {
    return (
        <div className="container">
            <div className={styles.App}>
                <h1 className={styles.Title}>
                    Welcome to {this.state.name}
                </h1>
            </div>
            <button type="button" className="btn btn-primary">
                Themed button
            </button>
            <GraphQLDemo />
        </div>
    );
  }
}
