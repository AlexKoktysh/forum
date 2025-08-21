import type { FC } from "react";
import { Tag, Typography } from "antd";

import styles from "./styles.module.scss";

const { Title } = Typography;

type IProps = {
    header: string;
    entityName: string;
    count: number;
};

export const Counter: FC<IProps> = ({ count = 0, entityName, header }) => {
    return (
        <div className={styles.header}>
            <Title level={2} className={styles.title}>
                {header}
            </Title>
            <Tag color="white" className={styles.counter}>
                {`${count} ${entityName}`}
            </Tag>
        </div>
    );
};
