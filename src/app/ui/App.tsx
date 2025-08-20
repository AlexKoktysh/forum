import type { FC } from "react";
import { Router } from "./Router";
import { AppProvider } from "../providers/provider";

const AppWrapper: FC = () => {
    return <Router />;
};

export const App: FC = () => {
    return (
        <AppProvider>
            <AppWrapper />
        </AppProvider>
    );
};
