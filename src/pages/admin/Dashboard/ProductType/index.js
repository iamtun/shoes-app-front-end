import {
    Button,
    Form,
    Input,
    Modal,
    Popconfirm,
    Select,
    Table,
    message,
} from "antd";
import { useEffect, useState } from "react";

const columns = [
    {
        title: "STT",
        dataIndex: "id",
        key: "id",
    },
    {
        title: "Tên loại",
        dataIndex: "type",
        key: "type",
    },
    {
        title: "Trạng thái",
        dataIndex: "status",
        key: "status",
    },
    {
        title: "",
        dataIndex: "handle",
        key: "handle",
    },
];

function ProductType({ isModalOpen, setIsModalOpen }) {
    const [resources, setResources] = useState([]);
    const [id, setId] = useState("");
    const [type, setType] = useState("");
    const [status, setStatus] = useState("");

    useEffect(() => {
        fetch("http://localhost:3001/api/v1/product-types/")
            .then((res) => res.json())
            .then((res) => {
                const _res = res.data;
                const _resources = _res.map((res, index) => {
                    return {
                        key: res._id,
                        id: index,
                        type: res.name,
                        status: res.selling ? "Đang bán" : "Hết hàng",
                        handle: (
                            <>
                                <Button onClick={() => setIsModalOpen(true)}>
                                    Sửa
                                </Button>{" "}
                                <Popconfirm
                                    title="Bạn có chắc muốn xóa loại sản phẩm này?"
                                    onConfirm={confirm}
                                    onCancel={cancel}
                                    okText="Đúng"
                                    cancelText="Hủy"
                                >
                                    <Button onClick={() => null}>Xóa</Button>
                                </Popconfirm>
                            </>
                        ),
                    };
                });

                setResources(_resources);
            });
    });

    const handleOk = () => {
        setIsModalOpen(false);
        console.log(id, type, status);
    };

    const handleCancel = () => {
        setIsModalOpen(false);
    };

    const confirm = (e) => {
        console.log(e);
        message.success("Click on Yes");
    };
    const cancel = (e) => {
        console.log(e);
        message.error("Click on No");
    };
    return (
        <>
            <Table
                columns={columns}
                dataSource={resources}
                size="middle"
                onRow={(record, index) => {
                    return {
                        onClick: (event) => {
                            const { key, type, status } = record;
                            setId(key);
                            setType(type);
                            setStatus(status === "Đang bán" ? true : false);
                        }, // click row
                    };
                }}
            ></Table>

            <Modal
                title="Thêm loại sản phẩm"
                open={isModalOpen}
                onOk={handleOk}
                onCancel={handleCancel}
                footer={[
                    <Button key="back" onClick={handleCancel}>
                        Hủy
                    </Button>,
                    <Button key="submit" type="primary" onClick={handleOk}>
                        Thêm
                    </Button>,
                ]}
                width={500}
                style={{ height: 500 }}
            >
                <Form
                    labelCol={{
                        span: 6,
                    }}
                    wrapperCol={{
                        span: 18,
                    }}
                >
                    <Form.Item label="Tên loại sản phẩm">
                        <Input
                            placeholder="VD: Nike"
                            allowClear
                            value={type}
                            onChange={(e) => {
                                setType(e.target.value);
                            }}
                        />
                    </Form.Item>

                    <Form.Item label="Trạng thái">
                        <Select
                            defaultValue={{
                                value: status,
                                label:
                                    status === true ? "Đang bán" : "Hết hàng",
                            }}
                            options={[
                                {
                                    value: "true",
                                    label: "Đang bán",
                                },
                                {
                                    value: "false",
                                    label: "Hết hàng",
                                },
                            ]}
                            onChange={(value) => {
                                setStatus(value);
                            }}
                        ></Select>
                    </Form.Item>
                </Form>
            </Modal>
        </>
    );
}

export default ProductType;
