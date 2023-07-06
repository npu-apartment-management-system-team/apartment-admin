import { Button, Spin, message } from 'antd'
import axios from 'axios'
import React, { useEffect, useState } from 'react'
import _axios from '../../api'
import ApartTable from '../ApartTable'

export default function PayTable(props) {
  const [outpaylink,setOutPayLink]=useState('')
  const [outreturned,setOutReturned]=useState(false)
  const [personallink,setPersonnalLink]=useState('')
  const [personreturned,setPersonReturned]=useState(false)

  const {getOutPay}=props
  const { tabletype, columns,tabledata,tablepage,tabletitle,tableitems}=props
  const [outtablereturned,setOutTableReturned]=useState(false)

  const [messageApi, contextHolder] = message.useMessage();

  useEffect(()=>{
    axios.defaults.baseURL=import.meta.env.VITE_BASE_URL
    getOutPay(1,100)
    getOutPayDown()
    getPersonalPayDown()
  },[])
  function getOutPayDown(){
    _axios({
        method:'GET',
        url:'/api/finance/center/withhold/download',
    }).then(response=>{
        const{code}=response.data
        if(code===2000){
            const {result}=response.data
            setOutPayLink(result)
            setOutReturned(true)
        }else{
            const{msg}=response.data
            messageApi.info(msg)
        }
    })
  }
  function getPersonalPayDown(){
    _axios({
        method:'GET',
        url:'/api/finance/center/charge/download',
    }).then(response=>{
        const{code}=response.data
        if(code===2000){
            const {result}=response.data
            setPersonnalLink(result)
            setPersonReturned(true)
        }else{
            const{msg}=response.data
            messageApi.info(msg)
        }
    })
  }
  function downloadOutPay(){
    window.open(outpaylink)
  }
  function downloadPersonal(){
    window.open(personallink)
  }
//   PubSub.subscribe('tablepage',(msgname,data)=>{
//     setOutTableReturned(data)
//   })
  if(outreturned&&personreturned){
    return (
        <div>
        {/* <a href={outpaylink}>下载外部单位代扣表</a> */}
        {contextHolder}
        <Button onClick={downloadOutPay} >下载外部单位代扣表</Button>
        <ApartTable tableitems={tableitems} checkonly={true} tabletype={'outpay'} getOutPay={getOutPay}
        columns={columns} tabledata={tabledata} tablepage={tablepage} tabletitle={tabletitle} />
        <br/>
        <Button onClick={downloadPersonal} >下载自收表</Button>
        </div>
    )
  }else{
    return(
        <div>
            <Spin/>
        </div>
    )
  }
  
}
