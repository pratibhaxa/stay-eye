import React from "react";
import { Button, Form, Grid, Input, message, theme, Typography } from "antd";
import { LockOutlined, MailOutlined, UserOutlined } from "@ant-design/icons";
import { Link } from "react-router-dom";
import houseIcon from "../../assets/houseIcon.svg";
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { auth } from "../../config/firebase";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { addUser } from "../../store/slices/UserSlice";

const { useToken } = theme;
const { useBreakpoint } = Grid;
const { Text, Title } = Typography;

export default function SignUpPage({ success }) {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { token } = useToken();
    const screens = useBreakpoint();

    const handleAddUser = (payload) => {
        dispatch(addUser(payload));
    }

    const onFinish = async (values) => {
        console.log("Received values of form: ", values);
        try {
            // Create user with email and password
            const userCredential = await createUserWithEmailAndPassword(
                auth,
                values.email,
                values.password
            );
            const user = userCredential.user;

            // Update the user's profile with the display name (name)
            await updateProfile(user, {
                displayName: values.name,
            });

            // Optionally store the user details in your Redux store or database
            handleAddUser({ name: values.name, email: values.email });

            // Show success message
            success("You have signed in successfully! Please login to proceed.");

            // Optional: navigate to the sign-in page
            // navigate('/auth/signin');
            localStorage.setItem("name", values.name);
            console.log("User signed up with name:", values.name);
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
                : `${token.paddingXL}px ${token.padding}px`,
            width: "380px",
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
        signup: {
            marginTop: token.marginLG,
            textAlign: "center",
            width: "100%",
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
        <>
            <section style={styles.section}>
                <div style={styles.container}>
                    <div style={styles.header}>
                        <img src={houseIcon} alt="House Icon" width={40} height={40} />
                        <Title style={styles.title}>Sign up</Title>
                        <Text style={styles.text}>
                            Join us! Create an account to get started.
                        </Text>
                    </div>
                    <Form
                        name="normal_signup"
                        onFinish={onFinish}
                        layout="vertical"
                        requiredMark="optional"
                    >
                        <Form.Item
                            name="name"
                            rules={[
                                {
                                    required: true,
                                    message: "Please input your Name!",
                                },
                            ]}
                        >
                            <Input prefix={<UserOutlined />} placeholder="Name" />
                        </Form.Item>
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
                            extra="Password needs to be at least 8 characters."
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
                        <Form.Item style={{ marginBottom: "0px" }}>
                            <Button block type="primary" htmlType="submit">
                                Sign up
                            </Button>
                            <div style={styles.signup}>
                                <Text style={styles.text}>
                                    Already have an account?
                                </Text>{" "}
                                <Link to="/auth/signin">Sign in</Link>
                            </div>
                        </Form.Item>
                    </Form>
                </div>
            </section>
        </>
    );
}
