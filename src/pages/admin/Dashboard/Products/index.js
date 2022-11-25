import { Breadcrumb, Button, Layout } from "antd";
import { Content, Header } from "antd/es/layout/layout";
import Link from "antd/es/typography/Link";
import { useState } from "react";
import AddProduct from "./AddProduct";
import Product from "./Product";
import ProductType from "../ProductType";

function Products() {
    const [choose, setChoose] = useState(1);
    const [isModalOpen, setIsModalOpen] = useState(false);

    return (
        <>
            <Layout>
                <Header
                    style={{
                        backgroundColor: "#fff",
                        display: "flex",
                        justifyContent: "space-between",
                    }}
                >
                    <Breadcrumb>
                        <Breadcrumb.Item onClick={() => setChoose(1)}>
                            <Link>Sản phẩm</Link>
                        </Breadcrumb.Item>
                        {choose === 1 ? null : choose === 2 ? (
                            <Breadcrumb.Item>Thêm sản phẩm</Breadcrumb.Item>
                        ) : (
                            <>
                                <Breadcrumb.Item onClick={() => setChoose(2)}>
                                    <Link>Thêm sản phẩm</Link>
                                </Breadcrumb.Item>
                                <Breadcrumb.Item>Loại sản phẩm</Breadcrumb.Item>
                            </>
                        )}
                    </Breadcrumb>

                    {choose === 1 ? (
                        <Button onClick={() => setChoose(2)}>
                            Thêm sản phẩm
                        </Button>
                    ) : choose === 2 ? (
                        <Button onClick={() => setChoose(3)}>
                            Loại sản phẩm
                        </Button>
                    ) : (
                        <Button onClick={() => setIsModalOpen(true)}>
                            Thêm loại sản phẩm
                        </Button>
                    )}
                </Header>

                <Content style={{ backgroundColor: "#fff" }}>
                    {choose === 1 ? (
                        <Product />
                    ) : choose === 2 ? (
                        <AddProduct />
                    ) : (
                        <ProductType
                            isModalOpen={isModalOpen}
                            setIsModalOpen={setIsModalOpen}
                        />
                    )}
                </Content>
            </Layout>
        </>
    );
}

export default Products;
