# powrpc

**powrpc** is a tool for building strongly-typed HTTP servers and clients using [TypeScript](https://www.typescriptlang.org/) and [Effect](https://github.com/Effect-TS).

[![Workflow Status](https://github.com/kn0ll/powrpc/actions/workflows/test.yml/badge.svg)](https://github.com/kn0ll/powrpc/actions) [![Gzip Size](https://img.badgesize.io/kn0ll/powrpc/master/packages/client/src/index.ts.svg?compression=gzip)](https://github.com/kn0ll/powrpc/blob/master/packages/client/src/index.ts)

[![Open in GitHub Codespaces](https://github.com/codespaces/badge.svg)](https://github.com/codespaces/new?hide_repo_select=true&ref=master&repo=591863760)

## Work In Progress

If you happen to come across this project, I have only opened it for feedback and published it for testing. Sans experimentation I would advise against installing this.

## Features
- **Type-Safe**: A smart client provides strong typing for your APIs.
- **Ergonomic**: Transpile-time reconciliation means there is no development-time tooling, code generation, or file watching.
- **Framework Agnostic**: Batteries included, but handlers can be created for any TypeScript HTTP server.
- **Declarative**: Default handlers are declarative, making it simple to test your APIS and reason about them.
- **Portable**: The same APIs can be served by Express, Next.js, or more.

## Integrations
- Next.js
- Express
- Koa
- React
- Webpack

## TODO
- Streaming Responses
- API Generators (docs, playgrounds, etc)