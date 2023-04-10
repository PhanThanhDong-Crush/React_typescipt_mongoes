import React, { useEffect, useState } from "react";
import { ICategory } from "../../types/interface";
import { Space, Table, Button, Popconfirm, message } from 'antd';
import type { ColumnsType } from 'antd/es/table';
import { Link } from "react-router-dom";
import { PlusOutlined } from "@ant-design/icons";
import { apiAllCate } from "../../api/category";


interface IProp {
    categories: ICategory[],
    deleteCategory: (id: number) => void
}

export const Categories = (prop: IProp) => {
    const [data, setData] = useState<ICategory[]>([]);
    useEffect(() => {
        apiAllCate().then(({ data }) => setData(data.map((cate: ICategory) => {
            return { ...cate, key: cate._id }
        })))
    }, [prop])

    const OnClickDelete = (_id: any) => {
        const confirm = window.confirm("Are you sure ?")
        if (confirm) {
            prop.deleteCategory(_id)
        }
    }

    const columns: ColumnsType<ICategory> = [
        {
            title: 'Name',
            dataIndex: 'name',
            key: 'name',
        },
        {
            title: 'Action',
            key: 'action',
            render: (_, record) => (
                <Space size="middle">
                    {(record._id == '6430de6584e59b4b4f7f04e3') ? "" : (<Button type="primary" danger onClick={() => OnClickDelete(record._id)}>Delete</Button>)}
                    <Link to={'/admin/categories/' + record._id} ><Button type="primary">Edit</Button></Link>
                </Space>
            ),
        },
    ];

    return (
        <React.Fragment>
            <div style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center"
            }}>
                <h1>Categories</h1>
                <Link to={"/admin/categories/add"} ><Button type="primary" shape="circle"><PlusOutlined /></Button></Link>
            </div>
            <Table columns={columns} dataSource={data} />
        </React.Fragment>
    )
}