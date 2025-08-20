import { createContext } from "react";
import type { TAuthDto } from "../../entity";

export interface IContext {
    isAuth: boolean;
    signInHandler: (data: TAuthDto) => void;
    signOutHandler: () => void;
}

export const AuthContext = createContext({} as IContext);
