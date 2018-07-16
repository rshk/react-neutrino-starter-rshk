# React / Neutrino starter (@rshk)

Basic configuration for starting [React](https://reactjs.org/)
projects based on [Neutrino](https://neutrinojs.org/).

## Quick project setup

**WARNING:** always double-check before running untrusted code from the internet!

```
curl 'https://raw.githubusercontent.com/rshk/react-neutrino-starter-rshk/master/bin/create' | bash -s - new-project-name
```

## Customizations summary

- Base project scaffolding / organization
- Support for SCSS modules
- Eslint configuration (based on ``eslint-config-react-app``)
- Configuration for [Netlify](https://www.netlify.com/) deployment
- [GraphQL](https://graphql.org/index.html) support via [Apollo
  client](https://www.apollographql.com/)


### GraphQL support

Includes:

- GraphQL queries / mutations via http(s)
- Authentication support via ``Bearer`` authorization
- GraphQL uploads (using multipart)
- GraphQL subscriptions via websocket

GraphQL demo components use the API at [graphqlbin.org](https://graphqlbin.org/)


## Usage

Just clone this repository, delete the ``.git`` folder and create a new repo.
