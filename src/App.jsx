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
import { func } from 'prop-types';

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

  const [openupdate, setOpenUpdate] = useState(false);
  const [drawertitle,setDrawerTitle]=useState("")
  const [records,setRecords]=useState({})
  const [tablekeys,setTableKeys]=useState([])
  const [tableitems,setTableItems]=useState([])
  const [apartupdateclass,setApartUpdateClass]=useState({})
  const [apartidlist,setApartIdList]=useState([])

  //roomtable needs
  // const [rcolumns,setRColums]=useState([])

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
      render: (_,record,index) => (
        <Space size="middle">
          <Button type="primary" onClick={()=>openUpdateDrawer(index,record)}>修改此条目</Button>
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
  function openUpdateDrawer(index,record){
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
        getApart(1,10)
        alert("修改已完成")
      }else{
        const {msg}=response.data
        alert(msg)
      }
    })
  }
  function apartDelete(index){
    _axios({
      method:'DELETE',
      url:`/api/management/apartment/${apartidlist[index]}`,
    }).then(response=>{
      const {code}=response.data
      if(code===2000){
        getApart(1,10)
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
        setTablePage(total/pagesize+1);
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
          tmp.name=list[i].name;
          tmp.position=list[i].position;
          tmp.location=list[i].location;
          data.push(tmp)
        }
        setTableData(data)
      }else{
        alert(msg)
      }
    })
  }

  const roomcons=[
    {
      title: 'Name',
      dataIndex: 'name',
      key: 'name',
    },
    {
      title: 'Sex',//0男 1女
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
  ]

  function getRoom(page,pagesize){
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
      console.log(total)
      if(code===2000){
        setTableTitle("房间列表")
        setTablePage(total/pagesize+1);
        // console.log(list)
        setColums(roomcons)
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
          
          tmp.isForCadre=Boolean(list[i].isForCadre).toString();
          tmp.isReserved=Boolean(list[i].isReserved).toString();
          data.push(tmp)
        }
        setTableData(data)
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
        getApart={getApart} getRoom={getRoom} />
        <DownDrawer title={drawertitle} placement="bottom" onClose={()=>setOpenUpdate(false)} open={openupdate} tableitems={tableitems} records={records} apartUpdate={apartUpdate} />
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
