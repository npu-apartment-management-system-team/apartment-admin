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
import storageUtils from './utils/storageUtils'
import memoryUtils from './utils/memoryUtils'
import { Button, Space } from 'antd';

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
]
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
    render: (_,record) => (
      <Space size="middle">
        <Button>修改</Button>
        <Button>删除{record.name}</Button>
      </Space>
    ),
  },
]
function apartDelete(){
  _axios({
    method:'DELETE',
    url:'/api/management/apartment/{id}'
  })
}

function App() {
  const [loged,changeLoged]=useState(false);
  const [lognum,changeLognum]=useState(0);
  const [usermsg,setUserMsg]=useState(null);
  const [columns,setColums]=useState([])
  const [tabledata,setTableData]=useState([])
  const [tablepage,setTablePage]=useState(0)
  const [tabletitle,setTableTitle]=useState("")
  const navigate = useNavigate()
  useEffect(()=>{//建立长连结
    if(window.localStorage.getItem('token') !== undefined) {
      let result=window.localStorage.getItem('user_key')
      let num=window.localStorage.getItem('role')
      login(num,result)
    }
    axios.defaults.baseURL="https://apartment-server.wangminan.me"
    axios.get('/api/auth/hello')
  },[])
  // function changeNav(keyword){
  //   if(keyword=="L"){
  //     navigate('/login')
  //   }else{
  //     navigate('/register')
  //   }
  // }
  function getApart(page,pagesize){
    _axios({
      method:'GET',
      url:`/api/management/apartment?pageNum=${page}&pageSize=${pagesize}`,
    }).then(response=>{
      const {code,msg}=response.data
      const {list,total}=response.data.result
      if(code===2000){
        // console.log(total)
        console.log(list)
        setTableTitle("公寓列表")
        setTablePage(total/pagesize+1);
        setColums(apartcons)
        let data=[]
        for(let i=0;i<list.length;i++){
          let tmp={};
          tmp.key=i+1;
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
  function login(num,user){
    changeLoged(()=>{
      return true;
    })
    changeLognum(num);
    setUserMsg(user);
    changeLognum(3);
    getApart(1,10)
  }
  // const user = memoryUtils.user;
  if(loged){
    return (
      <div>
        <Home lognum={lognum} usermsg={usermsg} textitem={textitem} 
        columns={columns} tabledata={tabledata} tablepage={tablepage} tabletitle={tabletitle} />
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
