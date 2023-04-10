import React, { useEffect, useState } from "react"
import { apiAllPro, apiOnePro, apiStatisticsCommentPro } from "../../api/product";
import { Link, useParams } from "react-router-dom";
import { Avatar, Button, Image } from "antd";
import Table, { ColumnsType } from "antd/es/table";
import { apiDeleteComment } from "../../api/comment";
import { IProductDetail } from "../../types/interface";

export const CommentProdetail = () => {
    const { id } = useParams();
    const [product, setProduct] = useState();
    const [data, setData] = useState();// comment detail

    useEffect(() => {
        apiStatisticsCommentPro().then(({ data }) => {
            data.filter((pro: any) => {
                pro._id === id
                setData(pro.comments.map((cm: any) => {
                    return { ...cm, key: cm._id }
                }))
            })
        });

        apiAllPro().then(({ data }) => setProduct(data.find((pro: IProductDetail) => pro._id == id)));
    }, [])

    const onClickDelete = (id: any) => {
        const confirm = window.confirm("Are you sure ?")
        if (confirm) {
            apiDeleteComment(id)
            alert("Delete successfully")
            location.reload();
        }
    }

    const columns: ColumnsType<any> = [
        {
            title: 'Content',
            dataIndex: 'content',
            key: 'content',
            render: (_, record) => <p style={{ color: "red" }}>{record.content}</p>
        },
        {
            title: 'Times',
            dataIndex: 'times',
            key: 'times',
        },
        {
            title: 'User',
            dataIndex: 'user',
            key: 'user',
            render: (_, record) => <p><Avatar src={record.userId.image} style={{ width: "50px", height: "50px" }} /> {record.userId.name}</p>
        },
        {
            title: 'Email',
            dataIndex: 'email',
            key: 'email',
            render: (_, record) => <p>{record.userId.email}</p>
        },
        {
            title: 'Action',
            key: 'action',
            render: (_, record) => (
                <Button type="primary" onClick={() => onClickDelete(record._id)} danger>Delete</Button>
            ),
        },
    ];

    return (
        <React.Fragment>
            <h1>{product?.name}</h1>
            <Table columns={columns} dataSource={data} />
        </React.Fragment>
    )
}