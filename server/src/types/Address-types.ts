import type { User } from "./User-types"

export type address = {
    user: User,
    addressLine1: string,
    addressLine2: string,
    city: string,
    state: string,
    country: string,
    pincode: string,
    isPreferred?: boolean
}

export interface UpdateAddressDTO {
  addressLine1?: string;
  addressLine2?: string;
  city?: string;
  state?: string;
  country?: string;
  pincode?: string;
  isPreferred?: boolean;
}