import { useEffect, useState } from 'react'
import { Route, Routes, Navigate, useNavigate } from 'react-router-dom'
import MyNavLink from './Component/MyNavLink';
import './App.css'
import Login from './Pages/Login/Login'
import LoginHeader from './Component/LoginHeader/LoginHeader';
import Register from './Pages/Register';
import {PieChartOutlined} from '@ant-design/icons'
import axios from 'axios';
import imgUrl from './assets/images/apartment.svg'
import _axios from './api';
import Home from './Pages/Home';
import DownDrawer from './Component/DownDrawer';
import { Button, Drawer, Input, Space } from 'antd';
import { v4 as uuidv4 } from 'uuid';
import PubSub, { countSubscriptions } from 'pubsub-js';

function getItem(label, key, icon, children, type) {
  return {
    key,icon,children,label,type,
  };
}

const textitem=[
  {},
  {
    id:1,
    name:"超级管理员",
    item:[
      getItem('管理员账号管理', '1', <PieChartOutlined />),
      getItem('外部单位管理', '2', <PieChartOutlined />),
      getItem('公寓管理', '3', <PieChartOutlined />),
      getItem('房间管理', '4', <PieChartOutlined />),
    ]
  },
  {
    id:2,
    name:"入住办理员",
    item:[
      getItem('入住申请审核', '1', <PieChartOutlined />),
      getItem('床位编号录入', '2', <PieChartOutlined />),
      getItem('人脸录入确认', '3', <PieChartOutlined />),
    ],
  },
  {
    id:3,
    name:"宿舍调配员",
    item:[
      getItem('住/调宿申请', '1', <PieChartOutlined />),
      getItem('公寓管理', '2', <PieChartOutlined />),
      getItem('房间管理', '3', <PieChartOutlined />),
      getItem('床位管理', '4', <PieChartOutlined />),
    ],
    routers:[
      {route:'/promise'},
      {route:'/apart'},
      {route:'/room'},
      {route:'/bed'},
    ]
  },
  {
    id:4,
    name:"财务人员",
    item:[
      getItem('缴费统计表', '1', <PieChartOutlined />),
      getItem('催收信', '2', <PieChartOutlined />),
      getItem('宿舍情况查询', '3', <PieChartOutlined />),
    ],
  }
]

function App() {
  const [loged,changeLoged]=useState(false);
  const [lognum,changeLognum]=useState(0);
  const [usermsg,setUserMsg]=useState(null);

  //ApartTable needs
  const [columns,setColums]=useState([])
  const [tabledata,setTableData]=useState([])
  const [tablepage,setTablePage]=useState(0)
  const [tabletitle,setTableTitle]=useState("")

  //update downdrawer needs
  const [openupdate, setOpenUpdate] = useState(false);
  const [drawertitle,setDrawerTitle]=useState("")
  const [records,setRecords]=useState({})
  const [tablekeys,setTableKeys]=useState([])
  const [tableitems,setTableItems]=useState([])
  const [apartupdateclass,setApartUpdateClass]=useState({})
  const [apartidlist,setApartIdList]=useState([])
  const [updatedrawertype,setType]=useState('')

  const [tablereturned,setTableReturned]=useState(false)

  const navigate = useNavigate()
  useEffect(()=>{//建立长连结
    if(window.localStorage.getItem('token') !== null) {
      // console.log(window.localStorage.getItem('token'))
      let user={}
      user.name=window.localStorage.getItem('user.name')
      user.id=window.localStorage.getItem('user.id')
      user.loginAccountId=window.localStorage.getItem('user.loginAccountId')
      user.email=window.localStorage.getItem('user.email')
      let num=window.localStorage.getItem('role')
      login(num,user)
    }
    axios.defaults.baseURL=import.meta.env.VITE_BASE_URL
    axios.get('/api/auth/hello')
  },[])
  // function changeNav(keyword){
  //   if(keyword=="L"){
  //     navigate('/login')
  //   }else{
  //     navigate('/register')
  //   }
  // }
  const apartcons=[
    {
      title: 'Name',
      dataIndex: 'name',
      key: 'name',
    },
    {
      title: 'Position',
      dataIndex: 'position',
      key: 'position',
    },
    {
      title: 'Location',
      dataIndex: 'location',
      key: 'location',
    },
    {
      title: 'Action',
      key: 'action',
      render: (_,record,index) => (//record 本条目下的所有数据 index 当前条目编号
        <Space size="middle">
          <Button type="primary" onClick={()=>openUpdateDrawer(index,record,'apart')}>修改此条目</Button>
          <Button type="primary" onClick={()=>apartDelete(index)}>删除{record.name}</Button>
        </Space>
      ),
    },
  ]
  function inittablekeys(colus){
    setTableKeys(()=>{
      let keys=[];
      for(let i=0;i<colus.length-1;i++){
        keys.push(colus[i].dataIndex)
      }
      console.log(keys)
      return keys
    })
    setTableKeys((tablekeys)=>{//防止setState的异步更新取到旧值 set函数中收到的参数保证是最新值
      return tablekeys
    })
  }
  function onDownDrawerChange(e){
    setApartUpdateClass(()=>{
      apartupdateclass[e.target.id]=e.target.value
      return apartupdateclass
    })
  }
  function openUpdateDrawer(index,record,type){
    setType(()=>{
      return type;//下方更新框的类型
    })
    setRecords(record)
    setOpenUpdate(true)
    setDrawerTitle(()=>{
      return "修改第"+(index+1)+"条"
    })
    setTableKeys((keys)=>{
      setRecords((records)=>{//同上，为保证取到两个最新值，调用需嵌套在对应set函数中
        setTableItems(()=>{
          let items=[]
          for(let i=0;i<keys.length;i++){
            items.push(
                <div key={uuidv4()}>
                    <p>{keys[i]}</p><Input id={keys[i]} onChange={onDownDrawerChange} defaultValue={records[keys[i]]}/>
                </div>
            )
            setApartUpdateClass((apartupdateclass)=>{
              apartupdateclass[keys[i]]=records[keys[i]]
              return apartupdateclass
            })
          }
          // console.log(items)
          return items
        })
        return records
      })
      return keys
    })
  }
  function apartUpdate(index,datas){
    let lon=[]
    setApartUpdateClass((apartupdateclass)=>{
      // console.log(apartupdateclass)
      lon=apartupdateclass.location.split(',')
      return apartupdateclass
    })
    if(lon.length!=2){
      alert('Location格式不正确！')
      return
    }
    setApartIdList((apartidlist)=>{//防止异步，保证访问到最新的apartidlist
      _axios({
        method:'PUT',
        url:`/api/management/apartment/${apartidlist[index]}`,
        data:{
          foremanAdminId:lognum,
          name:apartupdateclass.name,
          position:apartupdateclass.position,
          positionLongitude:lon[1],
          positionLatitude:lon[0],
          status:datas.status,//宿舍状态，0正常 1启用程序中 2弃用程序中 3已弃用
        }
      }).then(response=>{
        const {code}=response.data
        if(code===2000){
          getApart(1,100)
          alert("修改已完成，请刷新以查看修改结果")
          setOpenUpdate(false)//关闭下方弹出菜单
        }else{
          const {msg}=response.data
          alert(msg)
          setOpenUpdate(false)//关闭下方弹出菜单
        }
      })
      return apartidlist
    })
  }
  function apartDelete(index){
    _axios({
      method:'DELETE',
      url:`/api/management/apartment/${apartidlist[index]}`,
    }).then(response=>{
      const {code}=response.data
      if(code===2000){
        getApart(1,100)
      }else{
        const {msg}=response.data
        alert(msg)
      }
    })
  }
  function getApart(page,pagesize){
    _axios({
      method:'GET',
      url:`/api/management/apartment?pageNum=${page}&pageSize=${pagesize}`,
    }).then(response=>{
      const {code,msg}=response.data
      const {list,total}=response.data.result
      if(code===2000){
        setTableTitle("公寓列表")
        setTablePage(Math.ceil(total/pagesize));
        setColums(apartcons)
        inittablekeys(apartcons)
        setApartIdList((apartidlist)=>{
          apartidlist=[];
          return apartidlist
        })
        let data=[]
        for(let i=0;i<list.length;i++){
          setApartIdList((apartidlist)=>{
            apartidlist.push(list[i].id)
            return apartidlist
          })
          let tmp={};
          tmp.key=uuidv4();
          tmp.index=i;
          tmp.name=list[i].name;
          tmp.position=list[i].position;
          tmp.location=list[i].location;
          data.push(tmp)
        }
        setTableData(data)
        setTableReturned(()=>{//通知子组件数据已经更新完成
          PubSub.publish('tablereturned',true)
          return true
        })
      }else{
        alert(msg)
      }
    })
  }

  const roomcons=[
    {
      title: '宿舍号',
      dataIndex: 'name',
      key: 'name',
    },
    {
      title: '性别',//0男 1女
      dataIndex: 'sex',
      key: 'sex',
    },
    {
      title: '用途',
      dataIndex: 'usage',
      key: 'usage',
    },
    {
      title: '房间规格',// x人间
      dataIndex: 'type',
      key: 'type',
    },
    {
      title: '干部房',//o非 1是
      dataIndex: 'isForCadre',
      key: 'isForCadre',
    },
    {
      title: '保留间',//o非 1是
      dataIndex: 'isReserved',
      key: 'isReserved',
    },
    {
      title:'房间总价',
      dataIndex:'totalFee',
      key: 'totalFee',
    },
    {
      title:'自理部分',
      dataIndex:'selfPayFee',
      key: 'selfPayFee',
    },
    {
      title:'单位报销',
      dataIndex:'refundFee',
      key: 'refundFee',
    },
    {
      title: 'Action',
      key: 'action',
      render: (_,record,index) => (//record 本条目下的所有数据  index 当前条目编号，从0开始
        <Space size="middle">
          <Button type="primary" onClick={()=>openUpdateDrawer(index,record,'room')}>修改此条目</Button>
          <Button type="primary" onClick={()=>roomDelete(index)}>删除{record.name}</Button>
        </Space>
      ),
    }
  ]

  function roomUpdate(index,datas){
    let flag=true;
    setApartUpdateClass((updateclass)=>{
      if(updateclass.sex==='man'||updateclass.sex==='男'){
        updateclass.sex=0
      }else if(updateclass.sex==='woman'||updateclass.sex==='女'){
        updateclass.sex=1
      }else{
        alert('性别格式非法')
        flag=false
      }

      if(updateclass.isForCadre==='是'){
        updateclass.isForCadre=1
      }else if(updateclass.isForCadre==='否'){
        updateclass.isForCadre=0
      }else{
        alert('干部房状态格式非法')
        flag=false
      }

      if(updateclass.isReserved==='是'){
        updateclass.isReserved=1
      }else if(updateclass.isReserved==='否'){
        updateclass.isReserved=0
      }else{
        alert('保留间状态格式非法')
        flag=false
      }

      if(updateclass.type==='单人间'){
        updateclass.type=1
      }else if(updateclass.type==='双人间'){
        updateclass.type=2
      }else{
        updateclass.type=parseInt(updateclass.type.substring(0,updateclass.type.indexOf('人')))
      }

      if(updateclass.totalFee!==updateclass.selfPayFee+updateclass.refundFee){
        alert('总价不等于单位报销部分和个人自理部分之和')
        flag=false
      }

      return updateclass
    })
    if(!flag){return}//存在非法数据，不予发送请求
    setApartIdList((apartidlist)=>{//防止异步，保证访问到最新的apartidlist
      _axios({
        method:'PUT',
        url:`/api/management/room/${apartidlist[index]}`,
        data:{
          apartmentId:1,
          name:apartupdateclass.name,
          sex:apartupdateclass.sex,
          usage:apartupdateclass.usage,
          isForCadre:apartupdateclass.isForCadre,
          isReserved:apartupdateclass.isReserved,
          type:apartupdateclass.type,
          totalFee:apartupdateclass.totalFee,
          selfPayFee:apartupdateclass.selfPayFee,
          refundFee:apartupdateclass.refundFee,
        },
      }).then(response=>{
        const {code}=response.data
        if(code===2000){
          getRoom(1,100)
          alert("修改已完成，请刷新以查看修改结果")
          setOpenUpdate(false)//关闭下方弹出菜单
        }else{
          const {msg}=response.data
          alert(msg)
          setOpenUpdate(false)
        }
      })
      return apartidlist
    })
  }

  function roomDelete(id){
    _axios({
      method:'DELETE',
      url:`/api/management/room/${apartidlist[id]}`,
    }).then(response=>{
      const {code}=response.data
      if(code===2000){
        getRoom(1,100)
      }else{
        const {msg}=response.data
        alert(msg)
      }
    })
  }

  function getRoom(page,pagesize){
    // setTableReturned(()=>{
    //   PubSub.publish('tablereturned',false)
    //   return false
    // })
    _axios.get('/api/management/room',{
      params:{
        pageNum:page,
        pageSize:pagesize,
        apartmentId:1,
        query:"",
        isForCadre:"",//是否干部房 o非 1是
        type:"",//房间类型 （x人间）
      }
    }).then(response=>{
      const {code,msg}=response.data
      const {list,total}=response.data.result
      if(code===2000){
        setTableTitle("房间列表")
        setTablePage(Math.ceil(total/pagesize));//页码求值向上取整
        setTablePage((tablepage)=>{
          PubSub.publish('tablepage',tablepage)
          return tablepage
        })
        setColums(roomcons)
        inittablekeys(roomcons)
        setApartIdList((apartidlist)=>{
          apartidlist=[];
          return apartidlist
        })
        let data=[]
        for(let i=0;i<list.length;i++){
          setApartIdList((apartidlist)=>{
            apartidlist.push(list[i].id)
            return apartidlist
          })
          let tmp={};
          tmp.key=uuidv4();
          tmp.index=i;
          tmp.name=list[i].name;
          if(list[i].sex===0){
            tmp.sex="man";
          }else if(list[i].sex===1){
            tmp.sex="woman"
          }
          tmp.usage=list[i].usage;
          if(list[i].type===1){
            tmp.type='单人间';
          }else if(list[i].type===2){
            tmp.type='双人间';
          }else{
            tmp.type=list[i].type+'人间';
          }
          
          if(list[i].isForCadre){
            tmp.isForCadre='是'
          }else{
            tmp.isForCadre='否'
          }

          if(list[i].isReserved){
            tmp.isReserved='是'
          }else{
            tmp.isReserved='否'
          }

          tmp.totalFee=list[i].totalFee
          tmp.selfPayFee=list[i].selfPayFee
          tmp.refundFee=list[i].refundFee

          data.push(tmp)
        }
        setTableData(data)
        setTableReturned(()=>{//通知子组件数据已经更新完成
          PubSub.publish('tablereturned',true)
          return true
        })
      }else{
        alert(msg)
      }
    })
  }

  const bedcons=[
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
      title: '是否正在使用中',//0非 1是
      dataIndex: 'isInUse',
      key: 'isInUse',
    },
    {
      title: 'Action',
      key: 'action',
      render: (_,record,index) => (//record 本条目下的所有数据  index 当前条目编号，从0开始
        <Space size="middle">
          <Button type="primary" onClick={()=>openUpdateDrawer(index,record,'bed')}>修改此条目</Button>
          <Button type="primary" onClick={()=>bedDelete(index)}>删除{record.name}</Button>
        </Space>
      ),
    }
  ]

  function bedDelete(id){
    _axios({
      method:'DELETE',
      url:`/api/management/bed/${apartidlist[id]}`,
    }).then(response=>{
      const {code}=response.data
      if(code===2000){
        getBed(1,100)
      }else{
        const {msg}=response.data
        alert(msg)
      }
    })
  }

  function getBed(page,pagesize){
    _axios.get('/api/management/bed',{
      params:{
        pageNum:page,
        pageSize:pagesize,
        apartmentId:1,
        query:"",
        roomId:"",
        isInUse:"",
      }
    }).then(response=>{
      const {code,msg}=response.data
      const {list,total}=response.data.result
      if(code===2000){
        setTableTitle("床位列表")
        setTablePage(Math.ceil(total/pagesize));//页码求值向上取整
        setTablePage((tablepage)=>{
          PubSub.publish('tablepage',tablepage)
          return tablepage
        })
        setColums(bedcons)
        inittablekeys(bedcons)
        setApartIdList((apartidlist)=>{
          apartidlist=[];
          return apartidlist
        })
        let data=[]
        for(let i=0;i<list.length;i++){
          setApartIdList((apartidlist)=>{
            apartidlist.push(list[i].id)
            return apartidlist
          })
          let tmp={};
          tmp.key=uuidv4();
          tmp.index=i;
          tmp.name=list[i].name;
          tmp.roomId=list[i].roomId;
          tmp.receiptId=list[i].receiptId;
          tmp.isInUse=list[i].isInUse;

          data.push(tmp)
        }
        setTableData(data)
        setTableReturned(()=>{//通知子组件数据已经更新完成
          PubSub.publish('tablereturned',true)
          return true
        })
      }else{
        alert(msg)
      }
    })
  }
  
  function login(num,user){
    // console.log(user)
    changeLoged(()=>{
      return true;
    })
    changeLognum(num);
    setUserMsg(user.name);
    // getRoom(1,5)
  }
  function logOut(){
    window.localStorage.removeItem('token')
    changeLoged(false)
  }
  // const user = memoryUtils.user;
  if(loged){
    return (
      <div>
        <Home lognum={lognum} usermsg={usermsg} textitem={textitem} 
        columns={columns} tabledata={tabledata} tablepage={tablepage} tabletitle={tabletitle}
        logOut={logOut}
        getApart={getApart} getRoom={getRoom} getBed={getBed} />
        <DownDrawer type={updatedrawertype} title={drawertitle} placement="bottom" 
        onClose={()=>setOpenUpdate(false)} open={openupdate} tableitems={tableitems} records={records}
        apartUpdate={apartUpdate} roomUpdate={roomUpdate} />
      </div>
    )
  }
  else{
    return (
    <div className="login-box">
      <div className='glass'>
        <div className='innerlogin'>
          <p>公寓员工管理系统</p>
          <img src={imgUrl}/>
          {/* <div>
            <LoginHeader changeNav={changeNav}/>
          </div> */}
            {/* <Login/> */}
            {/* <MyNavLink to="/login">login</MyNavLink>
            <MyNavLink to="/register">register</MyNavLink> */}

            {/* React v6新特性，移除了switch和redirect，switch被Routes替代，components被elements替代 */}
          <Routes>
            <Route path="/login" element={<Login login={login}/>} />
            <Route path="/register" element={<Register/>} />
            {/* 重定向的实现需要借助Navigate */}
            <Route path="*" element={<Navigate to="/login" />} />
          </Routes>
        </div>
      </div>
    </div>
    )
  }
}

export default App
