import React, { useState } from 'react'
import { Button, Drawer, Input, Radio, Spin } from 'antd';

export default function AddTable(props) {
    const {apartAdd,roomAdd,bedAdd}=props
    const {type,title,placement,onClose,open,tableitems}=props
    const [value,setValue]=useState(0)
    const [apartupdateClass,setUpdateClass]=useState({status:0})

    function apartaddClick(){
        setLoadings(true)
        apartAdd(apartupdateClass)
        setLoadings(false)
    }
    function onapartChange(e){
        setUpdateClass((updateClass)=>{
            updateClass.status=e.target.value
            return updateClass
        })
        setValue(e.target.value)
    }

    function roomaddClick(){
        setLoadings(true)
        roomAdd()
        setLoadings(false)
    }

    function bedaddClick(){
        setLoadings(true)
        bedAdd()
        setLoadings(false)
    }

    if(tableitems.length===0){
        return (
            <Drawer title={title} placement={placement} onClose={onClose} open={open} >
                <Spin/>
            </Drawer>
        )
    }else if(type==='apart'){
        return (
            <Drawer title={title} placement={placement} onClose={onClose} open={open} >
                {/* 复数input分别绑定当前表中内容 */}
                {tableitems}
                此公寓<Radio.Group onChange={onapartChange} value={value} >
                <Radio value={0}>正常使用</Radio>
                <Radio value={1}>启用中</Radio>
                <Radio value={2}>弃用中</Radio>
                <Radio value={3}>已弃用</Radio>
                </Radio.Group>
                <br/>
                <div style={{ textAlign: 'center' }}>
                <Button type="primary" loading={loadings} onClick={apartaddClick} >新增</Button>
                </div>
            </Drawer>
        )
    }else if(type==='room'){
        return (
            <Drawer title={title} placement={placement} onClose={onClose} open={open} >
                {tableitems}
                <br/>
                <div style={{ textAlign: 'center' }}>
                <Button type="primary" loading={loadings} onClick={roomaddClick} >新增</Button>
                </div>
            </Drawer>
        )
    }else if(type==='bed'){
        return (
            <Drawer title={title} placement={placement} onClose={onClose} open={open} >
                {tableitems}
                <br/>
                <div style={{ textAlign: 'center' }}>
                <Button type="primary" loading={loadings} onClick={bedaddClick} >新增</Button>
                </div>
            </Drawer>
        )
    }
}
