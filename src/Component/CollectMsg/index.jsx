import React, { useEffect, useState } from 'react'
import _axios from '../../api'
import axios from 'axios'
import { v4 as uuidv4 } from 'uuid';
import { Button, message, Space } from 'antd';
import Transferm from '../Transfer';

const usercons = [
    {
        title: 'Id',
        dataIndex: 'id',
        key: 'id'
    },
    {
        title: 'Name',
        dataIndex: 'name',
        key: 'name'
    },
    {
        title: 'LoginAccountId',//登录时使用的用户名
        dataIndex: 'loginAccountId',
        key: 'loginAccountId'
    },
    {
        title: 'PersonalId',//身份证号
        dataIndex: 'personalId',
        key: 'personalId'
    },
    {
        title: 'Action',
        key: 'action',
        render: (_, record, index) => //record 本条目下的所有数据 index 当前条目编号
            <Space size="middle">
                <Button type="primary" onClick={() => send()}>发送给{record.name}</Button>
            </Space>

    }
]

export default function CollectMsg (props) {

    const [transdata, setTransData] = useState([])
    const [admintransdata, setAdminTransData] = useState([])
    const {lognum, userid} = props

    const [messageApi, contextHolder] = message.useMessage();

    useEffect(() => {
        axios.defaults.baseURL = import.meta.env.VITE_BASE_URL
        getUserList(1, 100)
        getAdminList(1, 100)
    }, [])

    function send (recevers, sendMsg, way) {
        if (way === 'user') {
            _axios({
                method: 'POST',
                url: '/api/message/sender/send',
                data: {
                    senderAdminId: userid,
                    receiverAdminIds: [],
                    receiverUserIds: recevers,
                    message: sendMsg
                }
            }).then(response => {
                const {code, msg} = response.data
                if (code === 2000) {
                    messageApi.info('发送成功')
                } else {
                    messageApi.info(msg)
                }
            })
        } else if (way === 'admin') {
            _axios({
                method: 'POST',
                url: '/api/message/sender/send',
                data: {
                    senderAdminId: userid,
                    receiverAdminIds: recevers,
                    receiverUserIds: [],
                    message: sendMsg
                }
            }).then(response => {
                const {code, msg} = response.data
                if (code === 2000) {
                    messageApi.info('发送成功')
                } else {
                    messageApi.info(msg)
                }
            })
        } else {
            messageApi.info('发送对象非法')
        }
    }

    function getUserList (page, pagesize) {
        _axios({
            method: 'GET',
            url: `/api/user/user?pageNum=${page}&pageSize=${pagesize}`
        }).then(response => {
            const {code} = response.data
            if (code === 2000) {
                const {list} = response.data.result
                let tdata = []
                for (let i = 0; i < list.length; i++) {

                    let ttmp = {};
                    ttmp.key = uuidv4();
                    ttmp.title = list[i].name;
                    ttmp.name = list[i].name;
                    ttmp.id = list[i].id;
                    ttmp.loginAccountId = list[i].loginAccountId;
                    ttmp.personalId = list[i].personalId;
                    tdata.push(ttmp)
                }
                setTransData(tdata)
            } else {
                const {msg} = response.data
                messageApi.info(msg)
            }
        })
    }

    function getAdminList (page, pagesize) {
        _axios({
            method: 'GET',
            url: `/api/user/admin?pageNum=${page}&pageSize=${pagesize}`
        }).then(response => {
            const {code} = response.data
            if (code === 2000) {
                const {list} = response.data.result
                let tdata = []
                for (let i = 0; i < list.length; i++) {
                    let ttmp = {};
                    ttmp.key = uuidv4();
                    ttmp.title = list[i].name;
                    ttmp.name = list[i].name;
                    ttmp.id = list[i].id;
                    ttmp.loginAccountId = list[i].loginAccountId;
                    ttmp.departmentId = list[i].departmentId;
                    ttmp.email = list[i].email;
                    tdata.push(ttmp)
                }
                setAdminTransData(tdata)
            } else {
                const {msg} = response.data
                messageApi.info(msg)
            }
        })
    }

    return (
        <div>
            {contextHolder}
            <h3>催收信发送-发送给用户</h3>
            <Transferm type={'user'} transdata={transdata} send={send}/>
            {/* <h3>发送给管理员</h3>
      <Transferm type={'admin'} transdata={admintransdata} send={send} /> */}
            {/* <ApartTable columns={columns} tabledata={tabledata} tabletitle={tabletitle} checkonly={true} /> */}
        </div>
    )
}
