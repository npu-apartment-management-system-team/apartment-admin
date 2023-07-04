import React, { useEffect, useState } from 'react'
import { Button, Pagination, Space, Spin, Table, Tag } from 'antd';
import PubSub from 'pubsub-js';

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
  const {getApart,getRoom,getBed}=props
  let { tabletype, columns,tabledata,tablepage,tabletitle}=props
  const [returned,changeReturned]=useState(false)
  PubSub.subscribe('tablereturned',(msgname,data)=>{
    changeReturned(()=>{
      return data
    })
    console.log(returned)
  })

  //通过修改空对象实现组件强制刷新
  const [, updateState] = React.useState();
  const forceUpdate = React.useCallback(() => updateState({}), []);

  useEffect(()=>{
    if(tabletype==='apart'){
      changeReturned(false)
      getApart(1,100)
      forceUpdate()
    }else if(tabletype==='room'){
      changeReturned(false)
      getRoom(1,100)
      // console.log(tablepage)
      forceUpdate()
    }else if(tabletype==='bed'){
      changeReturned(false)
      getBed(1,100)
    }
  },[tabletype])
  function onChange(e){
    console.log(e)
  }
  if(!returned){
    return (
      <div>
        <Spin/>
      </div>
    )
  }
  else{
    PubSub.subscribe('tablepage',(msgname,data)=>{
      tablepage=data
      console.log(tablepage)
    })
    return (
      <div>
        <Space direction="vertical" size={16}>
          <h2>{tabletitle}</h2>
          <Button tabletype={tabletype} >增加</Button>
          <Table columns={columns} dataSource={tabledata} pagination={false} />
          {/* <Pagination showQuickJumper defaultCurrent={1} total={tablepage} onChange={onChange} /> */}
        </Space>
      </div>
    )
  }
  
}
