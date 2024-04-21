# 🚧 Testing

{% hint style="warning" %}
Our application is in active development, and while we're continuously improving, it may not yet cover all potential errors.
{% endhint %}

Testing in this project is managed by [Cypress](https://www.cypress.io), a powerful end-to-end testing framework. Cypress provides a robust platform for writing comprehensive tests, and its interactive UI makes debugging a breeze. It allows us to write tests that closely mimic user behavior, ensuring that our application works as expected in real-world scenarios.

Cypress tests are located in the `cypress/` directory of the [`next-app/`](https://vscode-file/vscode-app/Applications/Visual%20Studio%20Code.app/Contents/Resources/app/out/vs/code/electron-sandbox/workbench/workbench.html) folder. The configuration for Cypress is defined in the `cypress.config.ts` file.

To run the tests, use the `npm run test` command in your terminal. This will launch the Cypress Test Runner, where you can see the results of your tests in real time.End-to-End

## Component

Component tests are located in the `next-app/cypress/components` directory, with each component having its own test file. These tests cover all aspects of a component's functionality, including rendering, props, user interaction, and events.

## End-to-End

E2E tests are located in the `next-app/cypress/e2e` directory. These tests simulate user interactions and verify that the application behaves correctly. Through E2E testing, we ensure a seamless and reliable user experience across our application.

## Mock data

In our application, the mock data used for testing is located in the `next-app/cypress/fixtures` directory. This directory contains various JSON files, each representing different data structures and scenarios that our application might interact with. These fixtures are used throughout our test suites to provide consistent and controlled data for our components and services. By centralizing our mock data in one location, we can easily manage and update our test data as our application evolves.
