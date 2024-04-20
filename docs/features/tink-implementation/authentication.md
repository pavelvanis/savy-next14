# 🔑 Authentication

### Credentials

Credentials represent the user's connections to the Tink provider. Within credentials, you can access information such as canceled flows, authenticated connections or credential expiration.

_For additional information regarding credentials, please refer to the_ [_Tink Docs_](https://docs.tink.com/resources/aggregation/credentials)

### User access token

Before fetching data from Tink API you have to get first access token with needed scopes for each endpoint.&#x20;

### Client access token

Client tokens are needed for some actions like authorizing users with Tink Link.

_More about tokens_ [_Tink Tokens_](https://docs.tink.com/resources/api-setup/get-access-token)

### Permanent user

Creating a permanent user enables long-term access to the user's data within the app. A permanent user is established through user registration in the app, and their permanent user ID is stored in the user session as **permanentUserId**. This ID is utilized for fetching the data associated with this user.

[Tink Permanent User](https://docs.tink.com/resources/tink-link-web/tink-link-web-api-reference-account-aggregation#permanent-user-aggregation)&#x20;
