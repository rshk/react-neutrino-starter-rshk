import React from 'react';
import {graphql} from 'react-apollo';
import gql from 'graphql-tag';
import styles from './graphql.scss';


export default function GraphQLDemo() {
    return <div>
        <h2>GraphQL component</h2>
        <GraphQLHelloWrapper />

        <h2>GraphQL chat</h2>
        <GraphQLChat channel="hello" />
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
        </div>;
    }
}


const QUERY = gql`
    query hello($name: String) {
        hello(name: $name)
    }
`;


const HelloGQL = graphql(QUERY)((props) => {
    const {data: {hello, error, loading}} = props;

    if (error) {
        return <div className="alert alert-danger">
            {error.message}
        </div>;
    }

    if (loading) {
        return <div className="alert alert-info">
            Loading...
        </div>;
    }

    return <div className="alert alert-success">{hello}</div>;
});


const MESSAGES_QUERY = gql`
    query Messages($channel: String!) {
        messages(channel: $channel) {
            edges {
                text
            }
        }
    }
`;

const MESSAGES_SUBS = gql`
    subscription Message($channel: String!) {
        message: messages(channel: $channel) {
            text
        }
    }
`;

const POST_MESSAGE = gql`
    mutation postMessage($channel: String!, $text: String!) {
        postMessage(channel: $channel, text: $text) {
            ok
        }
    }
`;


class GraphQLChatUI extends React.Component {
    constructor(...args) {
        super(...args);
        this.state = {text: ''};
    }

    componentDidMount() {
        // console.log('DIDMOUNT', this.props);
        this._subscription = this.props.data.subscribeToMore({
            document: MESSAGES_SUBS,
            variables: {channel: this.props.channel},
            updateQuery: (prev={}, newData) => {

                // console.log('===> UPDATE', prev, newData);

                const {subscriptionData: {data: {message}}} = newData;

                // Merge new message to collection
                const {messages = {}, ...extra} = prev;
                return {
                    messages: {
                        ...messages,
                        edges: [...(messages.edges || []), message].slice(-10),
                    },
                    ...extra,
                };

            }
        });
    }

    componentWillUnmount() {
        this._subscription(); // Unsubscribe...
    }

    render() {
        // console.log('PROPS', this.props);
        const {data: {loading, error, messages}} = this.props;

        if (error) {
            return <div>Error: {error.message}</div>;
        }

        if (loading || !messages) {
            return <div>Loading...</div>;
        }

        return <div className={styles.chat}>
            {this._renderMessages(messages)}
            {this._renderInput()}
        </div>;
    }

    _renderMessages(messages) {
        const _refFunc = (el) => {
            if (!el) {
                return;
            }
            // console.log('ELEM', el, el.scrollTop, el.scrollHeight - el.clientHeight);
            el.scrollTo(0, el.scrollHeight);
        };
        return <div className={styles.chat__messages} ref={_refFunc}>
            {messages.edges.map(({text}, idx) =>
                <div key={idx} className={styles.chat__messages__item}>
                    {text}
                </div>)}
        </div>;
    }

    _renderInput() {
        return <form className={styles.chat__input_form} onSubmit={this._submit.bind(this)}>
            <input type="text"
                   className={styles.chat__input_field}
                   value={this.state.text}
                   onChange={evt => this.setState({text: evt.target.value})} />
            <button type="submit">Send</button>
        </form>;
    }

    _submit(evt) {
        evt.preventDefault();
        console.log('Message', this.state.text);
        const {postMessage} = this.props;
        const {text} = this.state;
        postMessage({variables: {channel: 'hello', text}});
        this.setState({text: ''});
    }
}



const GraphQLChat = (
    graphql(MESSAGES_QUERY)(
        graphql(POST_MESSAGE, {name: 'postMessage'})(GraphQLChatUI)));
