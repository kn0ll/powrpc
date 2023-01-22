# powrpc

**powrpc** is a tool for building type-safe RPC functions using [TypeScript](https://www.typescriptlang.org/) and [fp-ts](https://gcanti.github.io/fp-ts/).

[![Workflow Status](https://github.com/kn0ll/powrpc/actions/workflows/test.yml/badge.svg)](https://github.com/kn0ll/powrpc/actions) [![Gzip Size](https://img.badgesize.io/kn0ll/powrpc/master/packages/client/src/index.ts.svg?compression=gzip)](https://github.com/kn0ll/powrpc/blob/master/packages/client/src/index.ts)

[![Open in GitHub Codespaces](https://github.com/codespaces/badge.svg)](https://github.com/codespaces/new?hide_repo_select=true&ref=master&repo=591863760)

## Features
- **Type-Safe**: A smart client ensures you are sending the correct parameters to invoke a remote function.
- **Ergonomic**: Transpile-time reconciliation means there is no development-time tooling or file watching.
- **Framework Agnostic**: Batteries included, but handlers can be created for any TypeScript HTTP server.
- **Declarative**: Default handlers are declarative, making it simple to test your APIS and reason about them.

## Integrations
- Next.js
- Koa
- React
- Webpack

## TODO
- Automatic API Documentation
- Automatic API Playground
- Streaming Responses