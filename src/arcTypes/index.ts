/**
 * Modify this list if you need more actions
 */
export enum ActionId {
  "http.commerce.catalog.storefront.shipping.requestRates.before",
  "embedded.platform.applications.install",
}

import { RateRequest } from '@kibocommerce/rest-sdk/clients/ShippingStorefront/models/RateRequest'
import { RatesResponse } from '@kibocommerce/rest-sdk/clients/ShippingStorefront/models/RatesResponse'

/**
 * The following is the structure of the Arc configuration. 
 * rateName is the name of the rate as it will appear in Admin and Storefront
 * rateCode is how the rate will appear on orders
 * shippingGroups is a list of possible prices of the items. 
 *  It will try to match based on product code or product type, and assign the result 
 *  if there is a match, otherwise it will continue on.
 */
export interface CustomRatesConfig {
  carrierId: string;
  rateName: string;
  rateCode: string;
  shippingGroups: ShippingGroupConfig[];
}

/**
 * The structure of the shipping group.
 * productCodes is the list of product codes to match on 
 * shippingPerItem is the amount that the line item will cost
 * productType is the product type to match on
 */
export interface ShippingGroupConfig {
  productCodes?: string[];
  shippingPerItem: number;
  productTypes?: string[];
}


export type RatesContext = {
  response: {
    body: RatesResponse
  }
  request: {
    body: RateRequest
  },
  configuration: CustomRatesConfig
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
