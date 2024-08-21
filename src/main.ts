
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
  function (context: RatesContext, callback: (errorMessage?: string) => void) {

    // If the address's state or province is "PA", the address is considered valid and the response status is set to 200.
    // Otherwise, the address is considered invalid and the response status is set to 400.

    const shouldPassValidation = context.request.body.address?.stateOrProvince == "PA"

    context.response.body = {
      addressCandidates: [
        {
          ...context.request.body.address,
          isValidated: shouldPassValidation,
        }
      ]
    }

    context.response.status = shouldPassValidation ? 200 : 400

    callback()
  })

const platformApplicationsInstall = createArcFunction(
  ActionId["embedded.platform.applications.install"],
  function (context: any, callback: (errorMessage?: string) => void) {
    console.log("platformApplicationsInstall");
    platformApplicationsInstallImplementation(context, callback).then(() => {
      callback()
    })
  }
);

export default {
  "http.commerce.customer.address.validation.before": validateRequestAfter,
  "http.commerce.customer.address.validation.after": validateRequestAfter,
  "embedded.platform.applications.install": platformApplicationsInstall,
}