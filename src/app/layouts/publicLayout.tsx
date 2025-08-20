import { type FC, type ReactElement } from "react";
import { Layout } from "antd";
import styles from "./publicStyles.module.scss";

interface IProps {
    children: ReactElement;
}

const { Content } = Layout;

export const PublicLayout: FC<IProps> = ({ children }) => {
    return (
        <Layout className={styles.layout}>
            <Content className={styles.content}>
                <div className={styles.container}>
                    <main className={styles.main}>{children}</main>
                </div>
            </Content>
        </Layout>
    );
};
