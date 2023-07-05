import React from 'react'
import './index.css'
import { Button, Transfer } from 'antd';
import { useState } from 'react';
import TextArea from 'antd/es/input/TextArea';
// const mockData = Array.from({
//   length: 20,
// }).map((_, i) => ({
//   key: i.toString(),
//   title: `content${i + 1}`,
//   description: `description of content${i + 1}`,
// }));
// const initialTargetKeys = mockData.filter((item) => Number(item.key) > 10).map((item) => item.key);
export default function Transferm(props) {
    const {type,transdata,send}=props
    const [targetKeys, setTargetKeys] = useState([]);
    const [selectedKeys, setSelectedKeys] = useState([]);
    const [msg,setMsg]=useState('')
    
    function sendMsg(){
        let receivers=[]
        for(let i=0;i<targetKeys.length;i++){
            for(let j=0;j<transdata.length;j++){
                if(targetKeys[i]===transdata[j].key){
                    receivers.push(transdata[j].id)
                }
            }
        }
        send(receivers,msg,type)
        setMsg('')
    }
    function textonChange(e){
        setMsg(e.target.value)
    }
    const onChange = (nextTargetKeys, direction, moveKeys) => {
      setTargetKeys(nextTargetKeys);
    };
    const onSelectChange = (sourceSelectedKeys, targetSelectedKeys) => {
      setSelectedKeys([...sourceSelectedKeys, ...targetSelectedKeys]);
    };
    const onScroll = (direction, e) => {
    //   console.log('direction:', direction);
    //   console.log('target:', e.target);
    };
    return (
        <div className='transferbox'>
            <div>
                <Transfer
                    dataSource={transdata}
                    titles={['用户列表', '发送给']}
                    targetKeys={targetKeys}
                    selectedKeys={selectedKeys}
                    onChange={onChange}
                    onSelectChange={onSelectChange}
                    onScroll={onScroll}
                    render={(item) => item.title}
                />
            </div>
            <TextArea
                showCount
                maxLength={4096}
                style={{ height: 120, resize: 'none' }}
                onChange={textonChange}
                placeholder="请在此键入发信内容"
                value={msg}
            />
            <Button onClick={sendMsg} >发送</Button>
        </div>
      
    );
}
