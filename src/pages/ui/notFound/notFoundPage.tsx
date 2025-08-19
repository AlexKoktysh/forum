import type { FC } from "react";
import { useNavigate } from "react-router-dom";

import styles from "./styles.module.scss";

export const NotFoundPage: FC = () => {
    const navigate = useNavigate();

    return (
        <div className={styles.container}>
            <div className={styles.content}>
                <div className={styles.header}>Oops! Sorry, page not found</div>
                <div
                    className={styles.redirect}
                    role="button"
                    tabIndex={0}
                    onKeyDown={() => navigate("")}
                    onClick={() => navigate("")}
                >
                    Back to home
                </div>
            </div>
        </div>
    );
};
