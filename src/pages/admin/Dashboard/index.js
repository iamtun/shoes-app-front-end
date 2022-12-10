import React, {useState } from "react";
import {
    MenuFoldOutlined,
    MenuUnfoldOutlined,
    UploadOutlined,
    UserOutlined,
    VideoCameraOutlined,
} from "@ant-design/icons";
import { Layout, Menu } from "antd";
import styles from "./Nav.module.scss";
import Products from "./Products";


const { Header, Content, Sider } = Layout;

function AdminLayout() {
    const [collapsed, setCollapsed] = useState(false);
    const [choose, setChoose] = useState(1);

    const items = [
        {
            key: "1",
            icon: <UserOutlined />,
            label: "Quản lý sản phẩm",
            onClick: () => {
                setChoose(1);
            },
        },
        {
            key: "2",
            icon: <VideoCameraOutlined />,
            label: "Quản lý đơn hàng",
            onClick: () => {
                setChoose(2)
            },
        },
        {
            key: "3",
            icon: <UploadOutlined />,
            label: "nav 3",
        },
    ];

    return (
        <Layout
            style={{ width: "100%", height: "100%", backgroundColor: "#fff" }}
        >
            {/* left nav*/}
            <Sider
                trigger={null}
                collapsible
                collapsed={collapsed}
                style={{ height: "100vh", backgroundColor: "#fff" }}
            >
                <div className={styles.logo_body}>
                    <img
                        src="https://gw.alipayobjects.com/zos/rmsportal/KDpgvguMpGfqaHPjicRK.svg"
                        alt="logo"
                        width="70%"
                        height="50"
                    />
                </div>
                <Menu
                    theme="light"
                    mode="vertical"
                    defaultSelectedKeys={["1"]}
                    items={items}
                    style={{ backgroundColor: "#fff" }}
                />
            </Sider>

            {/* right content */}
            <Layout className="site-layout">
                <Header style={{ padding: 0, backgroundColor: "#fff" }}>
                    {React.createElement(
                        collapsed ? MenuUnfoldOutlined : MenuFoldOutlined,
                        {
                            className: "trigger",
                            onClick: () => setCollapsed(!collapsed),
                        }
                    )}
                </Header>
                <Content
                    className="site-layout-background"
                    style={{
                        margin: "24px 16px",
                        padding: 24,
                        minHeight: 280,
                        backgroundColor: "#fff",
                        borderRadius: 20,
                    }}
                >
                    {choose === 1 ? <Products/> : 'Orders'}
                </Content>
            </Layout>
        </Layout>
    );
}

export default AdminLayout;
