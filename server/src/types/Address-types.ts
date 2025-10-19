import type { User } from "./User-types.ts"

export type address = {
    user: User,
    addressLine1: string,
    addressLine2: string,
    city: string,
    state: string,
    country: string,
    pincode: string
}