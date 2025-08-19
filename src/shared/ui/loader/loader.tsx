import type { FC } from "react";
import Lottie from "lottie-react";
import animationData from "../../../../public/animations/loading.json";

import styles from "./styles.module.scss";

export const BaseLoader: FC = () => {
    return (
        <div className={styles.loader__container}>
            <Lottie animationData={animationData} style={{ height: 200, width: 200 }} />
        </div>
    );
};
