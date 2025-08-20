import { createContext } from "react";

export interface IRoleContext {
    isAdmin: boolean;
}

export const RoleContext = createContext({} as IRoleContext);
