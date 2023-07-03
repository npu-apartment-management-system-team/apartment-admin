import React, { useEffect, useState } from 'react'
import { Button, Drawer, Input, Radio, Spin } from 'antd';

export default function DownDrawer(props) {
  const {title,placement,onClose,open,tableitems,records,apartUpdate}=props
  const [loadings, setLoadings] = useState(false);
  const [value,setValue]=useState(0)
  const [updateClass,setUpdateClass]=useState({status:0})
  // console.log(tableitems)
  function updateClick(){
    setLoadings(true)
    apartUpdate(records.key-1,updateClass)
    setLoadings(false)
  }
  function onapartChange(e){
    setUpdateClass(()=>{
      updateClass.status=e.target.value
      return updateClass
    })
    setValue(e.target.value)
  }
  if(tableitems.length===0){
    return (
      <Drawer title={title} placement={placement} onClose={onClose} open={open} >
          <Spin/>
      </Drawer>
    )
  }else{
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
            <Button type="primary" loading={loadings} onClick={updateClick} >修改</Button>
          </div>
      </Drawer>
    )
  }
}
