import React, { useEffect, useState } from 'react'
import _axios from '../../api'
import axios from 'axios'
import { v4 as uuidv4 } from 'uuid';
import PubSub, { countSubscriptions } from 'pubsub-js';
import ApartTable from '../ApartTable'
import { Button, Space } from 'antd';
import Transferm from '../Transfer';

const usercons=[
    {
        title: 'Id',
        dataIndex: 'id',
        key: 'id',
    },
    {
        title: 'Name',
        dataIndex: 'name',
        key: 'name',
    },
    {
        title: 'LoginAccountId',//登录时使用的用户名
        dataIndex: 'loginAccountId',
        key: 'loginAccountId',
    },
    {
        title: 'PersonalId',//身份证号
        dataIndex: 'personalId',
        key: 'personalId',
    },
    {
        title: 'Action',
        key: 'action',
        render: (_,record,index) => (//record 本条目下的所有数据 index 当前条目编号
        <Space size="middle">
            <Button type="primary" onClick={()=>send()}>发送给{record.name}</Button>
        </Space>
        ),
    },
]

export default function CollectMsg(props) {
//   const [columns,setColums]=useState([])
//   const [tabledata,setTableData]=useState([])
//   const [tabletitle,setTableTitle]=useState("")
//   const [tablekeys,setTableKeys]=useState([])
//   const [apartidlist,setApartIdList]=useState([])
//   const [tablereturned,setTableReturned]=useState(false)

  const [transdata,setTransData]=useState([])
  const [admintransdata,setAdminTransData]=useState([])
  const {lognum,userid}=props

  useEffect(()=>{
    axios.defaults.baseURL=import.meta.env.VITE_BASE_URL
    getUserList(1,100)
    getAdminList(1,100)
  },[])
  function send(recevers,sendMsg,way){
    if(way==='user'){
        _axios({
            method:'POST',
            url:'/api/message/sender/send',
            data:{
                senderAdminId:userid,
                receiverAdminIds:[],
                receiverUserIds:recevers,
                message:sendMsg,
            }
        }).then(response=>{
            const{code,msg}=response.data
            if(code===2000){
                alert('发送成功')
            }else{
                alert(msg)
            }
        })
    }else if(way==='admin'){
        _axios({
            method:'POST',
            url:'/api/message/sender/send',
            data:{
                senderAdminId:userid,
                receiverAdminIds:recevers,
                receiverUserIds:[],
                message:sendMsg,
            }
        }).then(response=>{
            const{code,msg}=response.data
            if(code===2000){
                alert('发送成功')
            }else{
                alert(msg)
            }
        })
    }else{
        alert('发送对象非法')
    }
  }
//   function inittablekeys(colus){
//     setTableKeys(()=>{
//       let keys=[];
//       for(let i=0;i<colus.length-1;i++){
//         keys.push(colus[i].dataIndex)
//       }
//       // console.log(keys)
//       return keys
//     })
//     setTableKeys((tablekeys)=>{//防止setState的异步更新取到旧值 set函数中收到的参数保证是最新值
//       return tablekeys
//     })
//   }
  function getUserList(page,pagesize){
    _axios({
        method:'GET',
        url:`/api/user/user?pageNum=${page}&pageSize=${pagesize}`,
    }).then(response=>{
        const {code}=response.data
        if(code===2000){
            const {list}=response.data.result
            // setTableTitle("用户列表")
            // setColums(usercons)
            // inittablekeys(usercons)
            // let data=[]
            let tdata=[]
            for(let i=0;i<list.length;i++){
                // setApartIdList((apartidlist)=>{
                //     apartidlist.push(list[i].id)
                //     return apartidlist
                // })
                // let tmp={};
                // tmp.key=uuidv4();
                // tmp.index=i;
                // tmp.name=list[i].name;
                // tmp.id=list[i].id;
                // tmp.loginAccountId=list[i].loginAccountId;
                // tmp.personalId=list[i].personalId;
                // data.push(tmp)

                let ttmp={};
                ttmp.key=uuidv4();
                ttmp.title=list[i].name;
                ttmp.name=list[i].name;
                ttmp.id=list[i].id;
                ttmp.loginAccountId=list[i].loginAccountId;
                ttmp.personalId=list[i].personalId;
                tdata.push(ttmp)
            }
            setTransData(tdata)
            // setTableData(data)
            // setTableReturned(()=>{//通知子组件数据已经更新完成
            //     PubSub.publish('tablereturned',true)
            //     return true
            // })
        }else{
            const {msg}=response.data
            alert(msg)
        }
    })
  }
  function getAdminList(page,pagesize){
    _axios({
        method:'GET',
        url:`/api/user/admin?pageNum=${page}&pageSize=${pagesize}`,
    }).then(response=>{
        const {code}=response.data
        if(code===2000){
            const {list}=response.data.result
            let tdata=[]
            for(let i=0;i<list.length;i++){
                let ttmp={};
                ttmp.key=uuidv4();
                ttmp.title=list[i].name;
                ttmp.name=list[i].name;
                ttmp.id=list[i].id;
                ttmp.loginAccountId=list[i].loginAccountId;
                ttmp.departmentId=list[i].departmentId;
                ttmp.email=list[i].email;
                tdata.push(ttmp)
            }
            setAdminTransData(tdata)
        }else{
            const {msg}=response.data
            alert(msg)
        }
    })
  }
  return (
    <div>
      <h1>催收信发送</h1>
      <h3>发送给用户</h3>
      <Transferm type={'user'} transdata={transdata} send={send} />
      {/* <h3>发送给管理员</h3>
      <Transferm type={'admin'} transdata={admintransdata} send={send} /> */}
      {/* <ApartTable columns={columns} tabledata={tabledata} tabletitle={tabletitle} checkonly={true} /> */}
    </div>
  )
}
