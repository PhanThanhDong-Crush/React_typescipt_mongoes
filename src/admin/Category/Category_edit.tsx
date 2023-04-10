import { Button, Form, Input } from 'antd';
import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { apiAddCate, apiEditCate, apiOneCate } from '../../api/category';
import { ICategory } from '../../types/interface';

const layout = {
    labelCol: { span: 8 },
    wrapperCol: { span: 16 },
};

const tailLayout = {
    wrapperCol: { offset: 8, span: 16 },
};

interface IProp {
    editCate: (category: ICategory) => void
}
export const CategoryEdit = (prop: IProp) => {
    const { id } = useParams();

    const [data, setData] = useState<ICategory>();
    useEffect(() => {
        apiOneCate(id).then(({ data }) => setData(data))
    }, [])

    const navigate = useNavigate();
    const [form] = Form.useForm();

    const setFields = () => {
        form.setFieldsValue({
            _id: data?._id,
            name: data?.name,
        })
    }

    useEffect(() => {
        setFields()
    }, [data])

    const onFinish = (values: any) => {
        prop.editCate(values);
        alert("Edit successfully");
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
                <h1>Category Edit</h1>
                <Form.Item name="_id" rules={[{ required: true }]} style={{ display: "none" }}>
                    <Input />
                </Form.Item>
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