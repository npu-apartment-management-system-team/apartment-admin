import React, { useState } from 'react'
import { Button, Drawer, Radio, Spin } from 'antd';

export default function DownDrawer (props) {
    const {apartUpdate, roomUpdate, bedUpdate} = props
    const {type, title, placement, onClose, open, tableitems, records} = props
    const [loadings, setLoadings] = useState(false);
    const [value, setValue] = useState(0)
    const [apartupdateClass, setUpdateClass] = useState({status: 0})

    function apartupdateClick () {
        setLoadings(true)
        apartUpdate(records.index, apartupdateClass)
        setLoadings(false)
    }

    function onapartChange (e) {
        setUpdateClass((updateClass) => {
            updateClass.status = e.target.value
            return updateClass
        })
        setValue(e.target.value)
    }

    function roomupdateClick () {
        setLoadings(true)
        // console.log(records)
        roomUpdate(records.index)
        setLoadings(false)
    }

    function bedupdateClick () {
        setLoadings(true)
        // console.log(records)
        bedUpdate(records.index)
        setLoadings(false)
    }

    if (tableitems.length === 0) {
        return (
            <Drawer title={title} placement={placement} onClose={onClose} open={open}>
                <Spin/>
            </Drawer>
        )
    } else if (type === 'apart') {
        return (
            <Drawer title={title} placement={placement} onClose={onClose} open={open}>
                {/* 复数input分别绑定当前表中内容 */}
                {tableitems}
                此公寓<Radio.Group onChange={onapartChange} value={value}>
                <Radio value={0}>正常使用</Radio>
                <Radio value={1}>启用中</Radio>
                <Radio value={2}>弃用中</Radio>
                <Radio value={3}>已弃用</Radio>
            </Radio.Group>
                <br/>
                <div style={{textAlign: 'center'}}>
                    <Button type="primary" loading={loadings} onClick={apartupdateClick}>修改</Button>
                </div>
            </Drawer>
        )
    } else if (type === 'room') {
        return (
            <Drawer title={title} placement={placement} onClose={onClose} open={open}>
                {tableitems}
                <br/>
                <div style={{textAlign: 'center'}}>
                    <Button type="primary" loading={loadings} onClick={roomupdateClick}>修改</Button>
                </div>
            </Drawer>
        )
    } else if (type === 'bed') {
        return (
            <Drawer title={title} placement={placement} onClose={onClose} open={open}>
                {tableitems}
                <br/>
                <div style={{textAlign: 'center'}}>
                    <Button type="primary" loading={loadings} onClick={bedupdateClick}>修改</Button>
                </div>
            </Drawer>
        )
    }
}
