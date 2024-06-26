---
description: Application installation guide.
---

# 💻 Installation

<details>

<summary>Step 1:  Create Tink app</summary>

You need to register in [Tink Console](https://console.tink.com/) and create an app.

</details>

<details>

<summary>Step 2:  Set up Tink redirect URIs</summary>

In [Tink Console](https://console.tink.com/app-settings/client), configure the following redirect URIs:

<img src="../.gitbook/assets/Snímek obrazovky 2024-04-19 v 17.09.44.png" alt="" data-size="original">

* https://localhost:3000/web
* https://localhost:3000/web/accounts
* https://localhost:3000/web/settings/credentials&#x20;

_These URIs are needed for redirection after Tink completes its flow. For more details, refer to the Tink Docs._



</details>

<details>

<summary>Step 3: Install MongoDB Server </summary>

Download [MongoDB Community Server](https://www.mongodb.com/try/download/community) and install it on your device. Additionally, install the [MongoDB Shell](https://www.mongodb.com/try/download/shell) interface for better interaction with the server.

</details>

<details>

<summary>Step 4: Download project</summary>

Download [project](https://github.com/pavelvanis/savy-next14/) from GitHub and install all npm packages using `npm install` command.

</details>

<details>

<summary>Step 5: Create .env file</summary>

Duplicate **.env.local.sample** file, rename to **.env.local** and set all provided values.

</details>

<details>

<summary>Step 6: Run app</summary>

To run the app in development, use `npm run dev,` or use `npm start` to run it in production mode.

</details>
