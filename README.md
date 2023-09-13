# Custom Rates Starter Kit

This is a starter kit for developing custom rates integrations in Kibo. For example, if you have business logic about what rates the user can see when they get to the Shipping Rates section in checkout, you can drop down to API Extensions. You could also call out to another service which can generate the rates for you.


## Getting Started

The starter kit contains a simple application that assigns a flat amount per line item based on certain predicates. The first group in shippingGroup that matches the predicates gets assigned the shippingPerItem amount.

```
{
  "carrierId": "Example",
  "rateName": "Flat Rate",
  "rateCode": "default",
  "shippingGroups": [
    {
      "productCodes": [
        "1001",
        "1002"
      ],
      "shippingPerItem": 17
    },
    {
      "productTypes": [
        "Fulfilment"
      ],
      "shippingPerItem": 30
    },
    {
      "productTypes": [
        "HardwareFulfillment"
      ],
      "shippingPerItem": 90
    }
  ]
}
```
You will need to first upload the code to a new application, modify the code to your needs, install, and then test.

## Install

First install the dependencies with: `npm install`

Then build with `grunt`. It will run through eslint and Typescript checks, compile the code into the assets folder, and then upload to your application using mozusync as usual.

Then go to your application in Dev Center, and click Install on your tenant. This will automaticaly add the API Extensions in the Action Management JSON Editor.

## Development

First, go to `src/main.ts` and modify from there.