import { Suspense } from "react";
import { createRoot } from "react-dom/client";
import { App } from "./app";
import { BaseLoader } from "./shared";

import "./shared/styles/index.scss";

createRoot(document.getElementById("root")!).render(
    <Suspense fallback={<BaseLoader />}>
        <App />
    </Suspense>,
);
