import { Button, Form, Input, Select } from 'antd';
import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { ICategory, IProduct } from '../../types/interface';
import { apiEditPro, apiOnePro } from '../../api/product';

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
    products: IProduct[],
    editPro: (product: IProduct) => void
}

export const ProductEdit = (prop: IProp) => {
    const { id } = useParams();

    const [data, setData] = useState<IProduct>();
    useEffect(() => {
        setData(prop.products.find((pro: IProduct) => pro._id === id))
    }, [prop])

    const [category, setCategory] = useState<ICategory[]>([]);
    useEffect(() => {
        setCategory(prop.categories)
    }, [prop])

    const navigate = useNavigate();

    const [form] = Form.useForm();

    const setFields = () => {
        form.setFieldsValue({
            _id: data?._id,
            name: data?.name,
            image: data?.image,
            price: data?.price,
            desc: data?.desc,
            categoryId: data?.categoryId._id
        })
    }

    useEffect(() => {
        setFields()
    }, [data])

    const onFinish = (values: any) => {
        prop.editPro(values);
        const confirm = window.confirm("Edit successfully");
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
                <h1>Product Edit</h1>
                <Form.Item name="_id" rules={[{ required: true }]} style={{ display: "none" }}>
                    <Input />
                </Form.Item>
                <Form.Item name="name" label="Name" rules={[{ required: true }]}>
                    <Input />
                </Form.Item>
                <Form.Item name="image" label="Image" rules={[{ required: true }]}>
                    <Input />
                </Form.Item>
                <Form.Item name="price" label="Price" rules={[{ required: true }]}>
                    <Input />
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