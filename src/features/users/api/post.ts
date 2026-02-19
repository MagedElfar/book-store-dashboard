import { userApiProvider } from "../constants";
import type { CreateUserPayload } from "../types";

export const createUser = (payload: CreateUserPayload) => userApiProvider.createUser(payload)