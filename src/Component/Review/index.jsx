import React, {useEffect, useState} from 'react'
import {Button, Card, Col, Divider, Drawer, Input, Modal, Pagination, Row, Space, Spin, Table, Tag} from 'antd';
import axios from 'axios';
import _axios from '../../api';
import { v4 as uuidv4 } from 'uuid';
import ApartTable from '../ApartTable';
import { useNavigate } from 'react-router-dom';

/*const columns = {
    id//申请id
    userId//用户id
    name//用户姓名
    type//申请类型。包括0入住、1调宿、2退宿
    applicationStatus//申请进展，应该是一个两段式的结构
    depositStatus//押金缴纳状态 0未缴纳 1已缴纳 2已退回
    paymentId//押金订单号
    createTime//申请创建时间
    updateTime//申请更新时间
    action//按键
    fileUrl//申请详情链接
}*/
const bedcons=[
    {
      title: '床位ID',
      dataIndex: 'id',
      key: 'id',
    },
    {
      title: '床位名',
      dataIndex: 'name',
      key: 'name',
    },
    {
      title: '所属房间的id',
      dataIndex: 'roomId',
      key: 'roomId',
    },
    {
      title: '押金收据单号',
      dataIndex: 'receiptId',
      key: 'receiptId',
    },
    {
      title: '床位使用情况',//0非 1是
      dataIndex: 'isInUse',
      key: 'isInUse',
    },
]

export default function Review(props){
    const {lognum}=props

    const [open, setOpen] = useState(false);
    const {id,name,userId,type,applicationStatus,depositStatus,paymentId,createTime,updateTime,fileUrl} = props
    const [reviewdata,setReviewData]=useState([{id:'',userId:'',name:'',type:'',applicationStatus:'',depositStatus:'',paymentId:'',createTime:'',updateTime:'',fileUrl:''}])
    const [carditems,setCaedItems]=useState([])
    const [index,setIndex]=useState(0)
    const [cardsreturned,setCardsReturned]=useState(false)

    const [modelopen,setModelOpen]=useState(false)
    const [confirmLoading, setConfirmLoading] = useState(false);
    const [givebedId,setBedId]=useState('')

    const {tableitems,tabledata,tablepage,tabletitle}=props
    const {getBed}=props

    const [canpass,changePass]=useState(true)

    const [noApps,setNoApps]=useState(false)

    const navigate=useNavigate()

    useEffect(()=>{
        axios.defaults.baseURL=import.meta.env.VITE_BASE_URL
        if(lognum===3){
            getReview(1,100)
        }else{
            getOtherReview(1,100)
        }
        
    },[])

    function buildCards(){
        let items=[]
        setReviewData((data)=>{
            for(let i=0;i<data.length;i++){
                items.push(
                    <Col className="gutter-row" span={8}>
                        <Card title={data[i].type+"申请"} bordered={false}>
                            <DescriptionItem title="ID" content={data[i].id} />
                            <DescriptionItem title="Type" content={data[i].type} />
                            <DescriptionItem title="ApplicationStatus" content={data[i].applicationStatus} />
                            <p></p>
                            <Button onClick={()=>showDrawer(i)}>查看</Button>
                        </Card>
                    </Col>
                )
            }
            setCaedItems(items)
            return data
        })
    }
    function getReview(page,pagesize){//宿舍分配员专用
        _axios({
            method:'GET',
            url:`/api/application/apply/status/center?pageNum=${page}&pageSize=${pagesize}`,
        }).then(response=>{
            const{code,result}=response.data
            if(code===2000){
                const {list}=result
                if(list.length===0){
                    setNoApps(true)
                    PubSub.publish('cardsreturned',true)
                    return 
                }
                let data=[]
                for(let i=0;i<list.length;i++){
                    let tmp={}
                    tmp.key=uuidv4()

                    tmp.id=list[i].id;
                    tmp.userId=list[i].userId;
                    tmp.paymentId=list[i].paymentId;

                    if(list[i].type===0){
                        tmp.type='入住';
                    }else if(list[i].type===1){
                        tmp.type='调宿'
                    }else if(list[i].type===2){
                        tmp.type='退宿'
                    }
                    
                    tmp.fileUrl=list[i].fileUrl;
                    tmp.applicationStatus=list[i].applicationStatus;

                    if(list[i].depositStatus===0){
                        tmp.depositStatus='未缴纳'
                    }else if(list[i].depositStatus===1){
                        tmp.depositStatus='已缴纳'
                    }else if(list[i].depositStatus===2){
                        tmp.depositStatus='已退回'
                    }
                    
                    tmp.createTime=list[i].createTime;
                    tmp.updateTime=list[i].updateTime;

                    data.push(tmp)
                }
                setReviewData(data)
                buildCards()
                PubSub.publish('cardsreturned',true)
            }else{
                const{msg}=response.data
                alert(msg)
            }
        })
    }
    function getOtherReview(page,pagesize){
        _axios({
            method:'GET',
            url:`/api/application/apply/status/center/checkin?pageNum=${page}&pageSize=${pagesize}`
        }).then(response=>{
            const{code,result}=response.data
            if(code===2000){
                const {list}=result
                if(list.length===0){
                    setNoApps(true)
                    PubSub.publish('cardsreturned',true)
                    return 
                }
                let data=[]
                for(let i=0;i<list.length;i++){
                    let tmp={}
                    tmp.key=uuidv4()

                    tmp.id=list[i].id;
                    tmp.userId=list[i].userId;
                    tmp.paymentId=list[i].paymentId;

                    if(list[i].type===0){
                        tmp.type='入住';
                    }else if(list[i].type===1){
                        tmp.type='调宿'
                    }else if(list[i].type===2){
                        tmp.type='退宿'
                    }
                    
                    tmp.fileUrl=list[i].fileUrl;
                    tmp.applicationStatus=list[i].applicationStatus;

                    if(list[i].depositStatus===0){
                        tmp.depositStatus='未缴纳'
                    }else if(list[i].depositStatus===1){
                        tmp.depositStatus='已缴纳'
                    }else if(list[i].depositStatus===2){
                        tmp.depositStatus='已退回'
                    }
                    
                    tmp.createTime=list[i].createTime;
                    tmp.updateTime=list[i].updateTime;

                    data.push(tmp)
                }
                setReviewData(data)
                buildCards()
                PubSub.publish('cardsreturned',true)
            }else{
                const{msg}=response.data
                alert(msg)
            }
        })
    }

    function giveBed(){
        setModelOpen(true)
    }
    function handleOk(){
        setConfirmLoading(true)
        _axios({
            method:'POST',
            url:'/api/application/apply/status/center',
            data:{
                id:reviewdata[index].id,
                bedId:givebedId
            }
        }).then(response=>{
            const {code}=response.data
            if(code===2000){
                alert('分配完成')
                setConfirmLoading(false)
                getReview(1,100)
            }else{
                const{msg}=response.data
                alert(msg)
                setConfirmLoading(false)
            }
        })
    }
    function handleCancel(){
        setModelOpen(false)
    }
    function bedIdChage(e){
        setBedId(e.target.value)
    }

    const showDrawer = (id) => {
        setIndex(()=>{
            return id
        })
        setOpen(true);
    };
    const onClose = () => {
        setOpen(false);
    };

    function reviewTheApp(){
        _axios({
            method:'POST',
            url:'/api/application/apply/status/center/checkin',
            data:{
                id:reviewdata[index].id,
                pass:canpass
            }
        }).then(response=>{
            const {code}=response.data
            if(code===2000){
                alert('审批完成')
                getOtherReview(1,100)
            }else{
                const{msg}=response.data
                alert(msg)
            }
        })
    }
    function agree(){
        changePass(true)
        reviewTheApp()
    }
    function reject(){
        changePass(false)
        reviewTheApp()
    }

    function flushf5(){
        navigate('/home/welcome')
        // navigate('/home/checkin')
    }

    PubSub.subscribe('cardsreturned',(msgname,data)=>{
        setCardsReturned(data)
    })
    if(!cardsreturned){
        return(
            <div>
                <Divider orientation="middle">申请页面</Divider>
                <Spin />
            </div>
        )
    }else if(noApps===true){
        return (
            <div>
                <Divider orientation="middle">申请页面</Divider>
                <p>暂时没有新的申请，休息一下吧</p>
                <Button onClick={flushf5} >刷新</Button>
            </div>
        )
    }else if(lognum===3){
        return (
            <div>
                <Divider orientation="middle">申请页面</Divider>
                <Row gutter={[16, 20]}>
                    {carditems}
                </Row>
                <Drawer width={640} placement="right" closable={false} onClose={onClose} open={open}>
                    <p
                        className="site-description-item-profile-p"
                        style={{
                            marginBottom: 24,
                        }}
                    >
                        申请表
                    </p>
                    <br/>
                    <Row>
                        <Col span={12}>
                            <DescriptionItem title="ID" content={reviewdata[index].id} />
                        </Col>
                        <Col span={12}>
                            <DescriptionItem title="UserID" content={reviewdata[index].userId} />
                        </Col>
                    </Row>
                    <Row>
                        <Col span={12}>
                            <DescriptionItem title="Type" content={reviewdata[index].type} />
                        </Col>
                        <Col span={12}>
                            <DescriptionItem title="ApplicationStatus" content={reviewdata[index].applicationStatus} />
                        </Col>
                    </Row>
                    <Row>
                        <Col span={24}>
                            <DescriptionItem title="DepositStatus" content={reviewdata[index].depositStatus} />
                        </Col>
                        <Col span={24}>
                            <DescriptionItem title="PaymentId" content={reviewdata[index].paymentId} />
                        </Col>
                    </Row>
                    <Row>
                        <Col span={24}>
                            <DescriptionItem title="createTime" content={reviewdata[index].createTime} />
                        </Col>
                        <Col span={24}>
                            <DescriptionItem title="updateTime" content={reviewdata[index].updateTime} />
                        </Col>
                    </Row>
                    <Row>
                        <Col span={24}>
                            <a href={reviewdata[index].fileUrl}>申请详情</a>
                        </Col>
                    </Row>
                    <Divider />
                    <Button onClick={onClose}>Back</Button><Button type='primary' onClick={giveBed}>分配床位</Button>
                </Drawer>
                <Modal
                    title="Title"
                    open={modelopen}
                    onOk={handleOk}
                    okText='提交'
                    confirmLoading={confirmLoading}
                    onCancel={handleCancel}
                    cancelText={'关闭'}
                >
                    <p>请在此键入要分配给{reviewdata[index].userId}号用户的床位</p>
                    <Input onChange={bedIdChage} />
                    <ApartTable checkonly={true} tableitems={tableitems}
                    getBed={getBed} tabletype={'bed'} columns={bedcons} tabledata={tabledata} tablepage={tablepage} tabletitle={tabletitle} />
                </Modal>
            </div>
        )
    }else if(lognum===2){
        return (
            <div>
                <Divider orientation="middle">申请页面</Divider>
                <Row gutter={[16, 20]}>
                    {carditems}
                </Row>
                <Drawer width={640} placement="right" closable={false} onClose={onClose} open={open}>
                    <p
                        className="site-description-item-profile-p"
                        style={{
                            marginBottom: 24,
                        }}
                    >
                        申请表
                    </p>
                    <br/>
                    <Row>
                        <Col span={12}>
                            <DescriptionItem title="ID" content={reviewdata[index].id} />
                        </Col>
                        <Col span={12}>
                            <DescriptionItem title="UserID" content={reviewdata[index].userId} />
                        </Col>
                    </Row>
                    <Row>
                        <Col span={12}>
                            <DescriptionItem title="Type" content={reviewdata[index].type} />
                        </Col>
                        <Col span={12}>
                            <DescriptionItem title="ApplicationStatus" content={reviewdata[index].applicationStatus} />
                        </Col>
                    </Row>
                    <Row>
                        <Col span={24}>
                            <DescriptionItem title="DepositStatus" content={reviewdata[index].depositStatus} />
                        </Col>
                        <Col span={24}>
                            <DescriptionItem title="PaymentId" content={reviewdata[index].paymentId} />
                        </Col>
                    </Row>
                    <Row>
                        <Col span={24}>
                            <DescriptionItem title="createTime" content={reviewdata[index].createTime} />
                        </Col>
                        <Col span={24}>
                            <DescriptionItem title="updateTime" content={reviewdata[index].updateTime} />
                        </Col>
                    </Row>
                    <Row>
                        <Col span={24}>
                            <a href={reviewdata[index].fileUrl}>申请详情</a>
                        </Col>
                    </Row>
                    <Divider />
                    <Button onClick={onClose}>Back</Button>
                    <Button type='primary' onClick={agree}>批准</Button>
                    <Button onClick={reject}>驳回</Button>
                </Drawer>
            </div>
        )
    }

    
}

const DescriptionItem = ({ title, content }) => (
    <div className="site-description-item-profile-wrapper">
        <p className="site-description-item-profile-p-label">{title}:</p>
        {content}
    </div>
);