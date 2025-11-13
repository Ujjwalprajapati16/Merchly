import { getUserDetailWithAddresses } from "../repositories/user-repo.ts";

export const getProfileService = async (id : string) => {
    return await getUserDetailWithAddresses(id);
}