import { Suspense } from "react";
import { createRoot } from "react-dom/client";
import { App } from "./app";
import { BaseLoader } from "./shared";

import "antd/dist/reset.css";
import "./shared/styles/index.scss";
import "@ant-design/v5-patch-for-react-19";

createRoot(document.getElementById("root")!).render(
    <Suspense fallback={<BaseLoader />}>
        <App />
    </Suspense>,
);
