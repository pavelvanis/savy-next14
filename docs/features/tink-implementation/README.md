# Tink Implementation

Tink serves as the intermediary between bank institutions and this app, facilitating connectivity to multiple bank APIs through a unified interface. Tink offers two types of data: Sandbox, for development and testing purposes, and Production, enabling connections to real banks and access to real user data.

> **In my solution, I utilize the Sandbox version of Tink because access to the Production version is limited to businesses. As a solo developer, I only have access to a reduced set of data.**

### Used Tinks features:

* [Accounts](accounts.md)
* [Transactions](transactions.md)

### Tink library

To retrieve data from the [Tink API](https://docs.tink.com/api-introduction), you can either utilize the functions created in _**`/next-app/src/actions/api`**_ or use the prepared functions located in _**`/next-app/src/actions/server/data`**_. These functions automatically generate client and user access tokens required for fetching the data. Additionally, they are designed as[ Server actions](https://nextjs.org/docs/app/building-your-application/data-fetching/server-actions-and-mutations), ensuring data retrieval directly on the server for enhanced security.

