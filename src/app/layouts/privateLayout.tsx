import { type FC, type ReactElement } from "react";
import { Layout } from "antd";
import { Navbar, RightSection } from "../../feature";

import styles from "./styles.module.scss";

interface IProps {
    children: ReactElement;
}

const { Content, Header } = Layout;

export const PrivateLayout: FC<IProps> = ({ children }) => {
    return (
        <Layout className={styles.layout}>
            <Header className={styles.navbar}>
                <div className={styles.navbarContent}>
                    <div className={styles.logo}>
                        <h2>Forum</h2>
                    </div>
                    <Navbar />
                    <RightSection />
                </div>
            </Header>
            <Content className={styles.content}>
                <div className={styles.container}>
                    <main className={styles.main}>{children}</main>
                </div>
            </Content>
        </Layout>
    );
};
