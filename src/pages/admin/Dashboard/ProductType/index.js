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
import { useDispatch, useSelector } from "react-redux"
import { typesInTableSelector } from "../../../../redux/selector";
import { fetchProductTypes } from "../../../../redux/slice/productTypeSlice";

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

    const dispatch = useDispatch();
    const types = useSelector(typesInTableSelector);

    useEffect(() => {
        dispatch(fetchProductTypes());
    }, []);

    useEffect(() => {
        const _resources = types?.map(type => {
            return {
                ...type, handle: (
                    <>
                        <Button
                            style={{ marginRight: 4, background: '#ccc' }}
                            onClick={() => {
                                setIsModalOpen(true);
                                loadDataToModal(type);
                            }}>
                            Sửa
                        </Button>
                        <Popconfirm
                            title="Bạn có chắc muốn xóa loại sản phẩm này?"
                            onConfirm={() => confirm({ id: type.key })}
                            onCancel={cancel}
                            okText="Đúng"
                            cancelText="Hủy"
                        >
                            <Button style={{ background: 'red', color: '#fff' }}
                                onClick={() => null}>Xóa</Button>
                        </Popconfirm>
                    </>
                ),
            }
        })

        setResources(_resources);
    }, [types])

    const loadDataToModal = (val) => {
        const { key, type, status } = val;
        setId(key);
        setType(type);
        setStatus(status);
    }

    const resetInput = () => {
        setId('');
        setType('');
        setStatus('Đang bán');
    }

    const handleOk = () => {
        setIsModalOpen(false);
        console.log({ id, type, status });
        resetInput();
    };

    const handleCancel = () => {
        setIsModalOpen(false);
        resetInput();
    };

    const confirm = (e) => {
        console.log(e);
        message.success("Bạn đã chọn xóa!");
    };

    const cancel = (e) => {
        console.log(e);
        message.error("Bạn đã chọn hủy!");
    };

    return (
        <>
            <Table
                columns={columns}
                dataSource={resources}
                size="middle"
            ></Table>

            <Modal
                title="Thêm loại sản phẩm"
                open={isModalOpen}
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
                                value: status === 'Đang bán' ? true : false,
                                label:
                                    status === '' ? 'Đang bán' : status,
                            }}
                            options={[
                                {
                                    value: true,
                                    label: "Đang bán",
                                },
                                {
                                    value: false,
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
