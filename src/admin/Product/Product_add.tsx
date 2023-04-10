import { Button, Form, Input, InputNumber, Select, Upload } from 'antd';
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ICategory, IProduct } from '../../types/interface';
import { apiAddPro } from '../../api/product';
import { UploadOutlined } from '@ant-design/icons';

const { Option } = Select;

const layout = {
    labelCol: { span: 8 },
    wrapperCol: { span: 16 },
};

const tailLayout = {
    wrapperCol: { offset: 8, span: 16 },
};


interface IProp {
    categories: ICategory[],
    addPro: (product: IProduct) => void
}

export const ProductAdd = (prop: IProp) => {
    const [category, setCategory] = useState<ICategory[]>([]);
    useEffect(() => {
        setCategory(prop.categories.filter(cate => cate._id !== "6430de6584e59b4b4f7f04e3"))
    }, [prop])
    const navigate = useNavigate();

    const [form] = Form.useForm();

    const onFinish = (values: any) => {
        prop.addPro(values)
        const confirm = window.confirm("Create successfully");
        if (confirm) {
            navigate("/admin/products");
        }
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
                <h1>Product Add</h1>
                <Form.Item name="name" label="Name" rules={[{ required: true }]}>
                    <Input />
                </Form.Item>
                <Form.Item name="image" label="Image" rules={[{ required: true }]}>
                    <Input />
                </Form.Item>
                {/* <Upload {...upFile}>
                    <Button icon={<UploadOutlined />}>Click to Upload</Button>
                </Upload> */}
                <Form.Item name="price" label="Price" rules={[{ required: true }]}>
                    <InputNumber prefix="$" style={{ width: '100%' }} min={1} />
                </Form.Item>
                <Form.Item name="desc" label="Desc" rules={[{ required: true }]}>
                    <Input />
                </Form.Item>
                <Form.Item name="categoryId" label="Category" rules={[{ required: true }]}>
                    <Select placeholder="Select a option category" allowClear>
                        {category.map(cate => {
                            return (
                                <Option value={cate._id} key={cate._id}>{cate.name}</Option>
                            )
                        })}
                    </Select>
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