import React, { useEffect, useState } from 'react'
import { Button, Modal } from 'antd';
import axios from 'axios';
import _axios from '../../api';

export default function ReceiveBox () {
    const [open, setOpen] = useState(false);

    useEffect(() => {
        axios.defaults.baseURL = import.meta.env.VITE_BASE_URL
        getMsg(1, 100)
    }, [])

    function getMsg (page, pagesize) {
        _axios({
            method: 'GET',
            url: `/api/message/receiver/inbox?pageNum=${page}&pageSize=${pagesize}`
        }).then(response => {
            const {code, result} = response.data
            if (code === 2000) {
                const {list} = result
                //
            } else {
                const {msg} = response.data
                alert(msg)
            }
        })
    }

    const handleCancel = () => {
        setOpen(false);
    };

    function showModal () {
        setOpen(true);
    }

    if (true) {//此组件已弃用
        return (
            <div></div>
        )
    }
    return (
        <div style={{width: '300px'}}>
            <Button type="primary" onClick={showModal}>
                收件箱
            </Button>
            <Modal
                title={'收件箱'}
                open={open}
                onCancel={handleCancel}
                footer={null}
            >
                {/* <p>{modalText}</p>
                {tableitems} */}
            </Modal>
        </div>
    );

}
