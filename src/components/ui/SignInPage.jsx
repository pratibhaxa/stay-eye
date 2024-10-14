import React from "react";
import { Button, Checkbox, Form, Grid, Input, theme, Typography } from "antd";
import { LockOutlined, MailOutlined } from "@ant-design/icons";
import { Link, useNavigate } from "react-router-dom";
import houseIcon from "../../assets/houseIcon.svg";
import { useDispatch, useSelector } from "react-redux";
import { validateUser } from "../../store/slices/UserSlice";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../../config/firebase";

const { useToken } = theme;
const { useBreakpoint } = Grid;
const { Text, Title } = Typography;

export default function SignInPage({ success }) {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { token } = useToken();
    const screens = useBreakpoint();
    const users = useSelector((state) => {
        return state.users;
    })

    const handleValidateUser = (payload) => {
        console.log("users: ", users);
        const userExists = users.some(user => user.email === payload.email && user.password === payload.password);
        if (userExists === true) {
            localStorage.setItem("email", payload.email);
            navigate("/dashboard");
        }
    }

    const onFinish = async (values) => {
        console.log("Received values of form: ", values);
        // handleValidateUser(values);
        try {
            const user = await signInWithEmailAndPassword(
                auth,
                values.email,
                values.password
            );
            navigate('/dashboard');
            // window.open("http://localhost:3001/addproperty",'_self');
            console.log(values.email);
            localStorage.setItem("email", values.email);
            success("Welcome " + localStorage.getItem("name") + " !");
        }
        catch (err) {
            console.error(err);
        }
    };

    const styles = {
        container: {
            margin: "0 auto",
            padding: screens.md
                ? `${token.paddingXL}px`
                : `${token.sizeXXL}px ${token.padding}px`,
            width: "380px",
        },
        footer: {
            marginTop: token.marginLG,
            textAlign: "center",
            width: "100%",
        },
        forgotPassword: {
            float: "right",
        },
        header: {
            marginBottom: token.marginXL,
            textAlign: "center",
        },
        section: {
            alignItems: "center",
            backgroundColor: token.colorBgContainer,
            display: "flex",
            minHeight: screens.sm ? "80vh" : "auto",
        },
        text: {
            color: token.colorTextSecondary,
        },
        title: {
            fontSize: screens.md
                ? token.fontSizeHeading2
                : token.fontSizeHeading3,
        },
    };

    return (
        <section style={styles.section}>
            <div style={styles.container}>
                <div style={styles.header}>
                    <img src={houseIcon} alt="House Icon" width={40} height={40} />
                    <Title style={styles.title}>Sign in</Title>
                    <Text style={styles.text}>
                        Welcome back to StayEye! Please enter your details
                        below to sign in.
                    </Text>
                </div>
                <Form
                    name="normal_login"
                    initialValues={{
                        remember: true,
                    }}
                    onFinish={onFinish}
                    layout="vertical"
                    requiredMark="optional"
                >
                    <Form.Item
                        name="email"
                        rules={[
                            {
                                type: "email",
                                required: true,
                                message: "Please input your Email!",
                            },
                        ]}
                    >
                        <Input prefix={<MailOutlined />} placeholder="Email" />
                    </Form.Item>
                    <Form.Item
                        name="password"
                        rules={[
                            {
                                required: true,
                                message: "Please input your Password!",
                            },
                        ]}
                    >
                        <Input.Password
                            prefix={<LockOutlined />}
                            type="password"
                            placeholder="Password"
                        />
                    </Form.Item>
                    <Form.Item>
                        <Form.Item
                            name="remember"
                            valuePropName="checked"
                            noStyle
                        >
                            <Checkbox>Remember me</Checkbox>
                        </Form.Item>
                        <a style={styles.forgotPassword} href="">
                            Forgot password?
                        </a>
                    </Form.Item>
                    <Form.Item style={{ marginBottom: "0px" }}>
                        <Button block type="primary" htmlType="submit">
                            Log in
                        </Button>
                        <div style={styles.footer}>
                            <Text style={styles.text}>
                                Don't have an account?
                            </Text>{" "}
                            <Link to="/auth/signup">Sign up now</Link>
                        </div>
                    </Form.Item>
                </Form>
            </div>
        </section>
    );
}
