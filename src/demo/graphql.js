import React from 'react';
import {graphql} from 'react-apollo';
import gql from 'graphql-tag';


export default function GraphQLDemo() {
    return <div>
        <h2>GraphQL component</h2>
        <GraphQLHelloWrapper />
    </div>;
}


class GraphQLHelloWrapper extends React.Component {
    constructor(...args) {
        super(...args);
        this.state = {name: ''};
    }

    render() {
        return <div>
            <div>
                <label>Name:</label>{' '}
                <input type="text"
                       onChange={evt=>this.setState({name: evt.target.value})}
                       value={this.state.name} />
            </div>
            <HelloGQL name={this.state.name || null} />
        </div>
    }
}


const QUERY = gql`
    query hello($name: String) {
        hello(name: $name)
    }
`;


const HelloGQL = graphql(QUERY)((props) => {
    console.log('PROPS', props);
    const {data: {hello, error, loading}} = props;

    if (error) {
        return <div className="alert alert-danger">
            {error.message}
        </div>;
    }

    if (loading) {
        return <div className="alert alert-info">
            Loading...
        </div>
    }

    return <div className="alert alert-success">{hello}</div>;
});
