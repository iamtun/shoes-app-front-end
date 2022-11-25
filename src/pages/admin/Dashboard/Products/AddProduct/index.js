import React from "react";
import { PlusOutlined } from "@ant-design/icons";
import {
    Form,
    Input,
    Button,
    Select,
    InputNumber,
    Upload,
} from "antd";
const { TextArea } = Input;

function AddProduct() {
    return (
        <>
            <Form
                labelCol={{
                    span: 4,
                }}
                wrapperCol={{
                    span: 16,
                }}
                layout="horizontal"
            >
                <Form.Item label="Tên sản phẩm">
                    <Input placeholder="VD: Nike" allowClear />
                </Form.Item>

                <Form.Item label="Giá">
                    <InputNumber placeholder="VD: 500000" />
                </Form.Item>

                <Form.Item label="Kích thước">
                    <Input placeholder="VD: 39, 40, 41" />
                </Form.Item>

                <Form.Item label="Mô tả">
                    <Input.Group>
                        <Form.Item>
                            <Input placeholder="Tiêu đề" />
                        </Form.Item>
                        <TextArea rows={4} placeholder="Nội dung" />
                    </Input.Group>
                </Form.Item>

                <Form.Item label="Trạng thái">
                    <Select>
                        <Select.Option value="true">Đang bán</Select.Option>
                        <Select.Option value="false">Hết hàng</Select.Option>
                    </Select>
                </Form.Item>

                <Form.Item label="Loại sản phẩm">
                    <Select>
                        <Select.Option value="lsp1">lsp1</Select.Option>
                        <Select.Option value="lsp2">lsp2</Select.Option>
                        <Select.Option value="lsp3">lsp3</Select.Option>
                    </Select>
                </Form.Item>

                <Form.Item label="Ảnh sản phẩm" valuePropName="fileList">
                    <Upload
                        action="/upload.do"
                        listType="picture-card"
                        maxCount={1}
                    >
                        <div>
                            <PlusOutlined />
                            <div
                                style={{
                                    marginTop: 8,
                                }}
                            >
                                Ảnh sản phẩm
                            </div>
                        </div>
                    </Upload>
                </Form.Item>

                <Form.Item label="Ảnh mô tả" valuePropName="fileList">
                    <Upload
                        action="/upload.do"
                        listType="picture-card"
                        maxCount={3}
                        multiple
                    >
                        <div>
                            <PlusOutlined />
                            <div
                                style={{
                                    marginTop: 8,
                                }}
                            >
                                Ảnh mô tả
                            </div>
                        </div>
                    </Upload>
                </Form.Item>

                <Form.Item
                    style={{
                        width: "100%",
                        marginLeft: "17%"
                    }}
                >
                    <Button style={{ width: "100%", backgroundColor: "#1890ff", fontSize: 14, fontWeight: 'bold', color: '#fff' }}>
                        Thêm
                    </Button>
                </Form.Item>
            </Form>
        </>
    );
}
export default AddProduct;
