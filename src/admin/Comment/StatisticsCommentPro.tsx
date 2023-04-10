import React, { useEffect, useState } from "react"
import { apiStatisticsCommentPro } from "../../api/product";
import { Link, useParams } from "react-router-dom";
import { Button, Image } from "antd";
import Table, { ColumnsType } from "antd/es/table";

export const StatisticsCommentPro = () => {
    const { id } = useParams();
    const [data, setData] = useState();

    useEffect(() => {
        apiStatisticsCommentPro().then(({ data }) => setData(data.map((pro: any) => {
            return { ...pro, key: pro._id }
        })));
    }, [])

    const columns: ColumnsType<any> = [
        {
            title: 'Name',
            dataIndex: 'name',
            key: 'name',
        },
        {
            title: 'Image',
            dataIndex: 'image',
            key: 'image',
            render: (image) => (<Image
                width={200}
                src={image}
            />)
        },
        {
            title: 'Comment',
            dataIndex: 'comment',
            key: 'comment',
            render: (_, record) => <p>{record.comments.length}</p>
        },
        {
            title: 'Action',
            key: 'action',
            render: (_, record) => (
                <Link to={'/admin/comment/' + record._id} ><Button type="primary">Detail</Button></Link>
            ),
        },
    ];

    return (
        <React.Fragment>
            <h1>Comment Statistics</h1>
            <Table columns={columns} dataSource={data} />
        </React.Fragment>
    )
}