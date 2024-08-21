# Address Validation Starter Kit

This is a starter kit for developing address validation integrations in Kibo. For example, if you need to validate and standardize shipping addresses during the checkout process, you can use API Extensions to implement custom address validation logic or integrate with external address validation services.

This starter kit includes a basic example of address validation for Pennsylvania (PA) addresses as a simple example. The validation logic checks if the logic is state is PA and is considered a valid address, and otherwise fails.

## Getting Started

The starter kit contains a simple application that demonstrates how to validate and standardize addresses using API Extensions. It includes basic validation rules and can be extended to integrate with external address validation services.

You will need to first upload the code to a new application, modify the code to your needs, install, and then test.

## Install

First install the dependencies with: `npm install`

Then build with `grunt`. It will run through eslint and Typescript checks, compile the code into the assets folder, and then upload to your application using mozusync as usual.

Then go to your application in Dev Center, and click Install on your tenant. This will automatically add the API Extensions in the Action Management JSON Editor.

## Tenant Configuration

Then go to your tenant, click "Settings" and then "Applications". Click the application you just installed, and then toggle the "Enable Application" switch.

Then, go to "Settings", then "General Settings", then to the "Storefront" tab, and enable Address Valdation, and optionally to allow invalid addresses.

## Development

First, go to `src/main.ts` and modify from there. You can customize the address validation logic or integrate with external services as needed.