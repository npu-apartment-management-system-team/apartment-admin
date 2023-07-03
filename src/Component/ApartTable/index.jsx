import React, { useEffect } from 'react'
import { Pagination, Space, Table, Tag } from 'antd';
const columns = [
    {
      title: 'Name',
      dataIndex: 'name',
      key: 'name',
      render: (text) => <a>{text}</a>,
    },
    {
      title: 'Age',
      dataIndex: 'age',
      key: 'age',
    },
    {
      title: 'Address',
      dataIndex: 'address',
      key: 'address',
    },
    {
      title: 'Tags',
      key: 'tags',
      dataIndex: 'tags',
      render: (_, { tags }) => (
        <>
          {tags.map((tag) => {
            let color = tag.length > 5 ? 'geekblue' : 'green';
            if (tag === 'loser') {
              color = 'volcano';
            }
            return (
              <Tag color={color} key={tag}>
                {tag.toUpperCase()}
              </Tag>
            );
          })}
        </>
      ),
    },
    {
      title: 'Action',
      key: 'action',
      render: (_, record) => (
        <Space size="middle">
          <a>Invite {record.name}</a>
          <a>Delete</a>
        </Space>
      ),
    },
  ];
  const data = [
    {
      key: '1',
      name: 'John Brown',
      age: 32,
      address: 'New York No. 1 Lake Park',
      tags: ['nice', 'developer'],
    },
    {
      key: '2',
      name: 'Jim Green',
      age: 42,
      address: 'London No. 1 Lake Park',
      tags: ['loser'],
    },
    {
      key: '3',
      name: 'Joe Black',
      age: 32,
      address: 'Sydney No. 1 Lake Park',
      tags: ['cool', 'teacher'],
    },
  ];

export default function ApartTable(props) {
  const {getApart,getRoom}=props
  let { tabletype, columns,tabledata,tablepage,tabletitle}=props
  useEffect(()=>{
    console.log(tablepage)
    if(tabletype==='apart'){
      // tabledata=[]
      getApart(1,10)
    }else if(tabletype==='room'){
      // tabledata=[]
      getRoom(1,5)
    }
  },[tabletype])
  function onChange(e){
    console.log(e)
  }
  return (
    <div>
      <Space direction="vertical" size={16}>
        <h2>{tabletitle}</h2>
        <Table columns={columns} dataSource={tabledata} pagination={false} />
        <Pagination showQuickJumper defaultCurrent={1} total={tablepage} onChange={onChange} />
      </Space>
    </div>
  )
}
