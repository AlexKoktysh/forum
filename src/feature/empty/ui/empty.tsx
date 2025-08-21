import type { FC } from "react";
import { MessageOutlined } from "@ant-design/icons";
import { Typography } from "antd";

import styles from "./styles.module.scss";

const { Title, Paragraph } = Typography;

type IProps = {
    title: string;
    description: string;
};

export const Empty: FC<IProps> = ({ description, title }) => {
    return (
        <div className={styles.emptyState}>
            <MessageOutlined className={styles.emptyIcon} />
            <Title level={3} className={styles.emptyTitle}>
                {title}
            </Title>
            <Paragraph className={styles.emptyDescription}>{description}</Paragraph>
        </div>
    );
};
