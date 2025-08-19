import { Suspense } from "react";
import { createRoot } from "react-dom/client";
import { App } from "./app";

import "./shared/styles/index.scss";

createRoot(document.getElementById("root")!).render(
    <Suspense fallback={<div>LOADER</div>}>
        <App />
    </Suspense>,
);
