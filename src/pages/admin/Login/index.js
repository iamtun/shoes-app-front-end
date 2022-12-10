import { Form, Input, Checkbox, Button } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";

import styles from "./Login.module.scss";
import { fetchLoginData, fetchUserInfo } from "../../../redux/slice/userSlice";
import { userSelector } from "../../../redux/selector";


function Login() {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const user = useSelector(userSelector);

    useEffect(() => {
        if (user) {
            // defined in routers
            navigate("/admin/dashboard");
            return;
        }

        //check token exist
        const token = localStorage.getItem(process.env.REACT_APP_TOKEN);
        if (token) {
            dispatch(fetchUserInfo(token));
        }
    }, [user]);

    const onFinish = (values) => {
        dispatch(fetchLoginData(values));
    };

    const onFinishFailed = (errorInfo) => {
        console.log("Failed:", errorInfo);
    };

    return (
        <div className={styles.container}>
            <div className={styles.logo}>
                <img
                    src="https://gw.alipayobjects.com/zos/rmsportal/KDpgvguMpGfqaHPjicRK.svg"
                    alt="logo"
                />
            </div>
            <div className={styles.form}>
                <h2 className={styles.title}>Đăng nhập</h2>
                <Form
                    name="basic"
                    labelCol={{
                        span: 4,
                    }}
                    wrapperCol={{
                        span: 16,
                    }}
                    initialValues={{
                        remember: true,
                    }}
                    onFinish={onFinish}
                    onFinishFailed={onFinishFailed}
                    autoComplete="off"
                >
                    <Form.Item
                        label="Tài khoản"
                        name="username"
                        rules={[
                            {
                                required: true,
                                message: "Vui lòng nhập tài khoản!",
                            },
                        ]}
                    >
                        <Input />
                    </Form.Item>

                    <Form.Item
                        label="Mật khẩu"
                        name="password"
                        rules={[
                            {
                                required: true,
                                message: "Vui lòng nhập mật khẩu!",
                            },
                        ]}
                    >
                        <Input.Password />
                    </Form.Item>

                    <Form.Item
                        name="remember"
                        valuePropName="checked"
                        wrapperCol={{
                            offset: 4,
                        }}
                    >
                        <Checkbox>Remember me</Checkbox>
                    </Form.Item>

                    <Form.Item
                        wrapperCol={{
                            offset: 4,
                        }}
                    >
                        <Button type="primary" htmlType="submit">
                            Submit
                        </Button>
                    </Form.Item>
                </Form>
            </div>
        </div>
    );
}

export default Login;
