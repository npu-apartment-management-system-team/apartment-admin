import React, { useState } from 'react'
import { Button, Modal } from 'antd';

export default function TableAddList(props) {
    const {tableitems, openAddDrawer, tabletype, addMsg, addfun} = props

    const [open, setOpen] = useState(false);
    const [confirmLoading, setConfirmLoading] = useState(false);
    const [modalText, setModalText] = useState('请在下方补全需要添加的条目 ');
    const showModal = () => {
        setModalText((msg) => {
            return msg + addMsg
        })
        openAddDrawer();
        setOpen(true);
    };
    const handleOk = () => {
        setConfirmLoading(true)
        addfun()
        setConfirmLoading(false)
    };
    const handleCancel = () => {
        setOpen(false);
    };
    return (
        <div>
            <Button type="primary" onClick={showModal}>
                增加条目
            </Button>
            <Modal
                title={tabletype}
                open={open}
                onOk={handleOk}
                okText={'提交'}
                confirmLoading={confirmLoading}
                onCancel={handleCancel}
                cancelText={'关闭'}
            >
                <p>{modalText}</p>
                {tableitems}
            </Modal>
        </div>
    );
}
