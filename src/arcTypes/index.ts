/**
 * Modify this list if you need more actions
 */
export enum ActionId {
  "http.commerce.customer.address.validation.after",
  "http.commerce.customer.address.validation.before",
  "embedded.platform.applications.install",
}

import { AddressValidationRequest, AddressValidationResponse } from '@kibocommerce/rest-sdk/clients/Customer'

export type RatesContext = {
  response: {
    body: AddressValidationResponse,
    status: number
  }
  request: {
    body: AddressValidationRequest
  },
  configuration: AddressValidationResponse
}

export interface ArcFunction {
  actionName: string;
  customFunction: (
    context: any,
    callback: (errorMessage?: string) => void
  ) => void;
}

export function createArcFunction(
  actionName: ActionId,
  customFunction: (
    context: any,
    callback: (errorMessage?: string) => void
  ) => void
): ArcFunction {
  return { actionName: ActionId[actionName], customFunction: customFunction };
}
