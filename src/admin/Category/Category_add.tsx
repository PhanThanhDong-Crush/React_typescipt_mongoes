import { Button, Form, Input, Select } from 'antd';
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { apiAddCate } from '../../api/category';
import { ICategory } from '../../types/interface';

const { Option } = Select;

const layout = {
    labelCol: { span: 8 },
    wrapperCol: { span: 16 },
};

const tailLayout = {
    wrapperCol: { offset: 8, span: 16 },
};

interface IProp {
    addCate: (category: ICategory) => void
}
export const CategoryAdd = (prop: IProp) => {
    const navigate = useNavigate();
    const [form] = Form.useForm();

    const onFinish = (values: any) => {
        prop.addCate(values);
        alert("Add successfully");
        navigate("/admin/categories");
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
                style={{ maxWidth: 600 }}
            >
                <h1>Category Add</h1>
                <Form.Item name="name" label="Name" rules={[{ required: true }]}>
                    <Input />
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