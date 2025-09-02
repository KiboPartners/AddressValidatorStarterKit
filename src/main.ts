import { ActionId, RatesContext, createArcFunction } from "./arcTypes/index";
import { platformApplicationsInstallImplementation } from "./platformInstall";

const validateAddressBefore = createArcFunction(
  ActionId["http.commerce.customer.address.validation.before"],
  function (context: RatesContext, callback: (errorMessage?: string) => void) {
    callback();
  }
);

const validateRequestAfter = createArcFunction(
  ActionId["http.commerce.customer.address.validation.after"],
  async function (context: RatesContext, callback: (errorMessage?: string) => void) {

    /**
     * 
     * 
     * Notes:
     * - APPLICATION_KEY must be in lowercase, example - `kupt.myapplication`
     * - The `accessToken` MUST be generated with an `appKey` with the namespace (kupt) in lowercase as well
     *   - If not we will get a 401 response with message `Invalid Credentials: INVALID_CREDENTIALS.additionalErrorDetails.appKeyIdNotMatchAppClaim`
     * - NAME_OF_CREDENTIAL in this example is `apiToken` 
     * 
     * curl --location --request PUT 'https://{{BASE_URL}}/platform/secureappdata/{{APPLICATION_KEY}}/{{NAME_OF_CREDENTIAL}}' \
     --header 'x-vol-site: 1111' \
     --header 'Content-Type: application/json' \
     --header 'Authorization: ••••••' \
     --data '{
        "apiToken": "secretToken"
      }'
     * 
     * 
     * 
     * 
     */

    type SecureAppDataResponse = {
      apiToken: string
    }

    const apiToken = context.getSecureAppData<SecureAppDataResponse>("apiToken")?.apiToken;    
    const addressData = context.request.body.address;
    const apiUrl = "https://api.example.com/validate-address";

    try {
      const response = await fetch(apiUrl, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${apiToken}`,
        },
        body: JSON.stringify(addressData),
      });

      if (!response.ok) {
        throw new Error(`API error: ${response.status} ${response.statusText}`);
      }

      const validationResult = await response.json();

      context.response.body = {
        addressCandidates: [
          {
            ...addressData,
            isValidated: validationResult.isValid,
          },
        ],
      };
      context.response.status = validationResult.isValid ? 200 : 400;

    } catch (error) {
      console.error("Address validation failed:", error);
      context.response.body = {
        addressCandidates: [
          {
            ...addressData,
            isValidated: false,
          },
        ],
      };
      context.response.status = 400;
      return callback("Address validation service is currently unavailable.");
    }


    // const shouldPassValidation = context.request.body.address?.stateOrProvince == "PA"

    // context.response.body = {
    //   addressCandidates: [
    //     {
    //       ...context.request.body.address,
    //       isValidated: shouldPassValidation,
    //     }
    //   ]
    // }

    // context.response.status = shouldPassValidation ? 200 : 400

    callback();
  }
);

const platformApplicationsInstall = createArcFunction(
  ActionId["embedded.platform.applications.install"],
  function (context: any, callback: (errorMessage?: string) => void) {
    console.log("platformApplicationsInstall");
    platformApplicationsInstallImplementation(context, callback).then(() => {
      callback();
    });
  }
);

export default {
  "http.commerce.customer.address.validation.before": validateRequestAfter,
  "http.commerce.customer.address.validation.after": validateRequestAfter,
  "embedded.platform.applications.install": platformApplicationsInstall,
};