import imgUrl from './assets/images/apartment.svg'
import _axios from './api';
import Home from './Pages/Home';
import storageUtils from './utils/storageUtils'
import memoryUtils from './utils/memoryUtils'
import { Button, Space } from 'antd';
import DownDrawer from './Component/DownDrawer';
import { Button, Drawer, Input, Space } from 'antd';
import { v4 as uuidv4 } from 'uuid';

function getItem(label, key, icon, children, type) {
  return {
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
    id:4,
    name:"财务人员",
    item:[
      getItem('缴费统计表', '1', <PieChartOutlined />),
      getItem('催收信', '2', <PieChartOutlined />),
      getItem('宿舍情况查询', '3', <PieChartOutlined />),
    ],
  }
]
function apartDelete(){
  _axios({
    method:'DELETE',
    url:'/api/management/apartment/{id}'
  })
}

function App() {
  const [loged,changeLoged]=useState(false);
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

  const navigate = useNavigate()
  useEffect(()=>{//建立长连结
    if(window.localStorage.getItem('token') !== undefined) {
      let result=window.localStorage.getItem('user_key')
    if(window.localStorage.getItem('token') !== null) {
      // console.log(window.localStorage.getItem('token'))
      let user={}
      user.name=window.localStorage.getItem('user.name')
      user.id=window.localStorage.getItem('user.id')
      user.loginAccountId=window.localStorage.getItem('user.loginAccountId')
      user.email=window.localStorage.getItem('user.email')
      let num=window.localStorage.getItem('role')
      login(num,result)
      login(num,user)
    }
    axios.defaults.baseURL="https://apartment-server.wangminan.me"
    axios.get('/api/auth/hello')
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
      // console.log('newesttablekey')
      // console.log(tablekeys)
      return tablekeys
    })
  }
  function onDownDrawerChange(e){
    // console.log(e.target.id)
    setApartUpdateClass(()=>{
      apartupdateclass[e.target.id]=e.target.value
      return apartupdateclass
    })
  }
  function openUpdateDrawer(index,record){
    // console.log(Object.keys(record))
    setRecords(record)
    setOpenUpdate(true)
    setDrawerTitle(()=>{
      return "修改第"+(index+1)+"条"
    })
    setTableKeys((keys)=>{
      setRecords((records)=>{//同上，为保证取到两个最新值，调用需嵌套在对应set函数中
        setTableItems(()=>{
          // console.log("usedtablekey")
          // console.log(tablekeys)
          let items=[]
          for(let i=0;i<keys.length;i++){
            // console.log(records[keys[i]])
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
        positionLongitude:lon[0],
        positionLatitude:lon[1],
        status:datas.status,//宿舍状态，0正常 1启用程序中 2弃用程序中 3已弃用
      }
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
      const {code,msg}=response.data
      const {list,total}=response.data.result
      if(code===2000){
        // console.log('get again')
        // console.log(total)
        console.log(list)
        // console.log(list)
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
          tmp.key=i+1;
          tmp.name=list[i].name;
      }
    })
  }
  
  function login(num,user){
    // console.log(user)
    changeLoged(()=>{
      return true;
    })
    changeLognum(num);
    setUserMsg(user);
    changeLognum(3);
    setUserMsg(user.name);
    getApart(1,10)
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
        columns={columns} tabledata={tabledata} tablepage={tablepage} tabletitle={tabletitle} />
        columns={columns} tabledata={tabledata} tablepage={tablepage} tabletitle={tabletitle}
        logOut={logOut} />
        <DownDrawer title={drawertitle} placement="bottom" onClose={()=>setOpenUpdate(false)} open={openupdate} tableitems={tableitems} records={records} apartUpdate={apartUpdate} />
      </div>
    )
  }