import { Button, Form, Input } from 'antd';
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ISignUp } from '../types/interface';

const layout = {
    labelCol: { span: 8 },
    wrapperCol: { span: 16 },
};

const tailLayout = {
    wrapperCol: { offset: 8, span: 16 },
};

interface IProp {
    submitSignUp: (user: ISignUp) => void
}
export const SignUp = (prop: IProp) => {
    const navigate = useNavigate();

    const [form] = Form.useForm();

    const onFinish = (values: ISignUp) => {
        prop.submitSignUp(values);
        alert("Sign up successfully");
        navigate("/sign_in");
    };

    const onReset = () => {
        form.resetFields();
    };

    return (
        <React.Fragment>
            <Form
                {...layout}
                form={form}
                name="control-hooks"
                onFinish={onFinish}
                style={{ maxWidth: 600, margin: "50px auto", textAlign: "center" }}
            >
                <h1>Sign Up</h1>
                <Form.Item name="name" label="Name" rules={[{ required: true }]}>
                    <Input />
                </Form.Item>
                <Form.Item name="email" label="Email" rules={[{ required: true }]}>
                    <Input />
                </Form.Item>
                <Form.Item name="image" label="Image" rules={[{ required: true }]}>
                    <Input />
                </Form.Item>
                <Form.Item name="password" label="Password" rules={[{ required: true }]}>
                    <Input.Password />
                </Form.Item>
                <Form.Item name="confirmPassword" label="Confirm Password" rules={[{ required: true }]}>
                    <Input.Password />
                </Form.Item>
                <Form.Item {...tailLayout}>
                    <Button type="primary" htmlType="submit">
                        Submit
                    </Button>
                    <Button htmlType="button" onClick={onReset}>
                        Reset
                    </Button>
                </Form.Item>
            </Form>
        </React.Fragment>
    )
}