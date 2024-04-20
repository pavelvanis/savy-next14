# 👋 Welcome to our docs

{% hint style="warning" %}
The app is currently under development.
{% endhint %}



## Overview

The app is designed to provide a more efficient and user-friendly experience for managing and accessing information about your banking accounts. With this app, you can:

> Retrieve all information about your banking accounts and their balances.
>
> Tink provides comprehensive information about the user's banking accounts, including account balances, transaction history, and more.
>
> —[ Accounts Docs](features/tink-implementation/accounts.md)
>
> — [Transactions Docs](features/tink-implementation/transactions.md)

## Frameworks & Libraries

{% tabs %}
{% tab title="Next.js" %}
The web application is developed using [Next.js](https://nextjs.org) with **app router**. Additionally, the codebase is written in TypeScript, offering enhanced type safety and developer productivity.
{% endtab %}

{% tab title="NextAuth.js" %}
[NextAuth.js](https://next-auth.js.org) is utilized for creating and managing user sessions within the application.

{% hint style="warning" %}
**To establish a complete server-side login procedure, I've selected** [**version 5**](https://authjs.dev/getting-started)**, which is currently in the experimental phase. It's essential to exercise caution regarding potential bugs and flaws.**
{% endhint %}
{% endtab %}

{% tab title="MongoDB" %}
The project utilizes a MongoDB database.

* All database models can be found at _**`/next-app/src/database`**_.
* The database connection is managed in _**`/next-app/src/lib/connect-db.ts`**_.
* To ensure proper data retrieval from the database, include the following code, which establishes a connection if one has not already been created:

{% code overflow="wrap" fullWidth="false" %}
```typescript
await connectDB()
```
{% endcode %}
{% endtab %}

{% tab title="Tink" %}
[Tink](https://tink.com) serves as the intermediary between the app and bank APIs. For further details on its implementation, refer to the [Tink Implementation](features/tink-implementation/) documentation.
{% endtab %}

{% tab title="Other" %}
#### [Tailwind CSS](https://tailwindcss.com)

All styling within the app is crafted using inline styles from Tailwind CSS.

#### [Chart.js](https://www.chartjs.org)

Chart.js is employed to visualize monthly balance trends and other statistical data through line charts.

#### [React-Table](https://tanstack.com/table/v7)

Tanstack's React-Table is used to create sortable and filterable lists that are more user-friendly.

#### [Zod](https://zod.dev)

Zod is utilized to create schemas for validating objects.
{% endtab %}
{% endtabs %}

## Get Started

I've put together some helpful guides for you to get setup with our product quickly and easily.

{% content-ref url="fundamentals/installation.md" %}
[installation.md](fundamentals/installation.md)
{% endcontent-ref %}

{% content-ref url="fundamentals/configuration/" %}
[configuration](fundamentals/configuration/)
{% endcontent-ref %}

{% content-ref url="fundamentals/project-structure.md" %}
[project-structure.md](fundamentals/project-structure.md)
{% endcontent-ref %}
