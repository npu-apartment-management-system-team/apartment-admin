import { useEffect, useState } from 'react'
import { Navigate, Route, Routes, useNavigate } from 'react-router-dom'
import './App.css'
import Login from './Pages/Login/Login'
import Register from './Pages/Register';
import {
    BankOutlined,
    BlockOutlined,
    DeliveredProcedureOutlined,
    HomeOutlined,
    MailOutlined,
    PieChartOutlined,
    SmileOutlined,
    TableOutlined,
    UserOutlined
} from '@ant-design/icons'
import axios from 'axios';
import imgUrl from './assets/images/apartment.svg'
import _axios from './api';
import Home from './Pages/Home';
import DownDrawer from './Component/DownDrawer';
import { Button, Input, message, Space } from 'antd';
import { v4 as uuidv4 } from 'uuid';
import PubSub from 'pubsub-js';

function getItem (label, key, icon, children, type) {
    return {
        key, icon, children, label, type
    };
}

const textitem = [
    {},
    {
        id: 1,
        name: "超级管理员",
        item: [
            getItem('管理员账号管理', '1', <UserOutlined/>),
            getItem('外部单位管理', '2', <BankOutlined/>),
            getItem('公寓管理', '3', <HomeOutlined/>),
            getItem('房间管理', '4', <BlockOutlined/>)
        ]
    },
    {
        id: 2,
        name: "入住办理员",
        item: [
            getItem('住宿申请审核', '1', <DeliveredProcedureOutlined/>),
            getItem('床位编号录入', '2', <PieChartOutlined/>),
            getItem('人脸录入确认', '3', <SmileOutlined/>)
        ],
        routers: [
            {route: '/checkin'},
            {route: '/bedid'},
            {route: '/face'}
        ]
    },
    {
        id: 3,
        name: "宿舍调配员",
        item: [
            getItem('宿舍分配', '1', <DeliveredProcedureOutlined/>),
            getItem('公寓管理', '2', <HomeOutlined/>),
            getItem('房间管理', '3', <BlockOutlined/>),
            getItem('床位管理', '4', <PieChartOutlined/>)
        ],
        routers: [
            {route: '/promise'},
            {route: '/apart'},
            {route: '/room'},
            {route: '/bed'}
        ],
        addmessages: {//表单类项目 添加条目弹窗的提示文字
            apart: 'name为公寓名 position为公寓地址 location为经纬度地址',
            room: 'name为宿舍号 sex为性别，应填写“男”或“女” usage为宿舍用途 type为房间种类，应填写“n人间”，n为整数 isForCadre为干部房标识，应填写“是”或“否” isReserved代表此房间是否保留，应填写“是”或“否” totalFee为宿舍费用 selfPayFee为自费费用 refundFee为单位报销费用 ',
            bed: 'name为床位名 roomId为床位所在的宿舍号 receiptId为押金收据单号 isInUse代表床位是否已被占用，应填写“是”或“否” '
        }
    },
    {
        id: 4,
        name: "财务管理员",
        item: [
            getItem('缴费统计表', '1', <TableOutlined/>),
            getItem('催收信', '2', <MailOutlined/>),
            getItem('宿舍情况查询', '3', <HomeOutlined/>)
        ],
        routers: [
            {route: '/paylist'},
            {route: '/collectmsg'},
            {route: '/roomchexk'}
        ]
    },
    {
        id: 5,
        name: '宿舍管理班组',
        item: [
            getItem('待办申请', '1', <DeliveredProcedureOutlined/>),
            getItem('人脸识别', '2', <SmileOutlined/>)
        ],
        routers: [
            {route: '/checkin'},
            {route: '/face'}
        ]
    },
    {
        id: 6,
        name: '外部单位入住办理员',
        item: [
            getItem('入住申请审核', '1', <DeliveredProcedureOutlined/>)
        ],
        routers: [
            {route: '/checkin'}
        ]
    }
]

function App () {
    const [loged, changeLoged] = useState(false);
    const [lognum, changeLognum] = useState(0);
    const [usermsg, setUserMsg] = useState(null);
    const [userid, setUserId] = useState('');

    //ApartTable needs
    const [columns, setColums] = useState([])
    const [tabledata, setTableData] = useState([])
    const [tablepage, setTablePage] = useState(0)
    const [tabletitle, setTableTitle] = useState("")

    //update downdrawer needs
    const [openupdate, setOpenUpdate] = useState(false);
    const [drawertitle, setDrawerTitle] = useState("")
    const [records, setRecords] = useState({})
    const [tablekeys, setTableKeys] = useState([])
    const [tableitems, setTableItems] = useState([])
    const [apartupdateclass, setApartUpdateClass] = useState({})
    const [apartidlist, setApartIdList] = useState([])
    const [updatedrawertype, setType] = useState('')

    // const [openadd,setOpenAdd]=useState(false)
    const [addButtons, setAddButtons] = useState(null)

    // const [tableaddClass,setTableAddClass]=useState({})

    const [tablereturned, setTableReturned] = useState(false)

    const [messageApi, contextHolder] = message.useMessage();

    const navigate = useNavigate()
    useEffect(() => {//建立长连结
        // if(window.localStorage.getItem('token') !== null) {
        //   // console.log(window.localStorage.getItem('token'))
        //   let user={}
        //   user.name=window.localStorage.getItem('user.name')
        //   user.id=window.localStorage.getItem('user.id')
        //   user.loginAccountId=window.localStorage.getItem('user.loginAccountId')
        //   user.email=window.localStorage.getItem('user.email')
        //   let num=window.localStorage.getItem('role')
        //   login(num,user)
        // }
        axios.defaults.baseURL = import.meta.env.VITE_BASE_URL
        axios.get('/api/auth/hello')
    }, [])
    // function changeNav(keyword){
    //   if(keyword=="L"){
    //     navigate('/login')
    //   }else{
    //     navigate('/register')
    //   }
    // }
    const apartcons = [
        {
            title: 'Name',
            dataIndex: 'name',
            key: 'name'
        },
        {
            title: 'Position',
            dataIndex: 'position',
            key: 'position'
        },
        {
            title: 'Location',
            dataIndex: 'location',
            key: 'location'
        },
        {
            title: 'Action',
            key: 'action',
            render: (_, record, index) => //record 本条目下的所有数据 index 当前条目编号
                <Space size="middle">
                    <Button type="primary" onClick={() => openUpdateDrawer(index, record, 'apart')}>修改此条目</Button>
                    <Button type="primary" onClick={() => apartDelete(index)}>删除{record.name}</Button>
                </Space>

        }
    ]

    function inittablekeys (colus) {
        setTableKeys(() => {
            let keys = [];
            for (let i = 0; i < colus.length - 1; i++) {
                keys.push(colus[i].dataIndex)
            }
            // console.log(keys)
            return keys
        })
        setTableKeys((tablekeys) => {//防止setState的异步更新取到旧值 set函数中收到的参数保证是最新值
            return tablekeys
        })
    }

    function onDownDrawerChange (e) {
        setApartUpdateClass(() => {
            apartupdateclass[e.target.id] = e.target.value
            return apartupdateclass
        })
    }

    function openUpdateDrawer (index, record, type) {
        setType(() => {
            return type;//下方更新框的类型
        })
        setRecords(record)
        setOpenUpdate(true)
        setDrawerTitle(() => {
            return "修改第" + (index + 1) + "条"
        })
        setTableKeys((keys) => {
            setRecords((records) => {//同上，为保证取到两个最新值，调用需嵌套在对应set函数中
                setTableItems(() => {
                    let items = []
                    for (let i = 0; i < keys.length; i++) {
                        items.push(
                            <div key={uuidv4()}>
                                <p>{keys[i]}</p><Input id={keys[i]} onChange={onDownDrawerChange}
                                                       defaultValue={records[keys[i]]}/>
                            </div>
                        )
                        setApartUpdateClass((apartupdateclass) => {
                            apartupdateclass[keys[i]] = records[keys[i]]//update对象初始化
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

    function onAddDrawerChange (e) {
        setApartUpdateClass((addclass) => {
            addclass[e.target.id] = e.target.value
            return addclass
        })
    }

    function openAddDrawer (type) {
        setType(() => {
            return type;//下方更新框的类型
        })

        setDrawerTitle(() => {
            return "新增" + type + "条目"
        })
        setTableKeys((keys) => {
            setRecords((records) => {//同上，为保证取到两个最新值，调用需嵌套在对应set函数中
                setTableItems(() => {
                    let items = []
                    for (let i = 0; i < keys.length; i++) {
                        if (keys[i] === 'receiptId' || keys[i] === 'isInUse') {//增加时不需要的属性值构建增加表时应跳过
                            continue
                        }
                        if (keys[i] === 'location') {
                            items.push(
                                <div key={uuidv4()}>
                                    <p>{keys[i]}</p><Input id={keys[i]} onChange={onAddDrawerChange}
                                                           defaultValue={'请输入合法经纬度,以英文逗号分隔'}/>
                                </div>
                            )
                        } else {
                            items.push(
                                <div key={uuidv4()}>
                                    <p>{keys[i]}</p><Input id={keys[i]} onChange={onAddDrawerChange} defaultValue={''}/>
                                </div>
                            )
                        }
                    }
                    return items
                })
                return records
            })
            return keys
        })
    }

    function apartCheck () {
        let lon = []
        setApartUpdateClass((apartupdateclass) => {
            // console.log(apartupdateclass)
            lon = apartupdateclass.location.split(',')
            if (lon.length != 2) {
                messageApi.info('Location格式不正确！')
                return false
            }
            apartupdateclass.lon0 = lon[0]
            apartupdateclass.lon1 = lon[1]
            return apartupdateclass
        })
        return true
    }

    function apartAdd () {
        if (!apartCheck()) {
            return
        }//存在非法数据，不予发送请求
        _axios({
            method: 'POST',
            url: '/api/management/apartment',
            data: {
                foremanAdminId: lognum,
                name: apartupdateclass.name,
                position: apartupdateclass.position,
                positionLongitude: apartupdateclass.lon1,
                positionLatitude: apartupdateclass.lon0,
                status: 0
            }
        }).then(response => {
            const {code} = response.data
            if (code === 2000) {
                getApart(1, 100)
                messageApi.info("增加已完成,请刷新页面以查看最新结果")
            } else {
                const {msg} = response.data
                messageApi.info(msg)
            }
        })
    }

    function apartUpdate (index, datas) {
        if (!apartCheck()) {
            return
        }//存在非法数据，不予发送请求
        setApartIdList((apartidlist) => {//防止异步，保证访问到最新的apartidlist
            _axios({
                method: 'PUT',
                url: `/api/management/apartment/${apartidlist[index]}`,
                data: {
                    foremanAdminId: lognum,
                    name: apartupdateclass.name,
                    position: apartupdateclass.position,
                    positionLongitude: apartupdateclass.lon1,
                    positionLatitude: apartupdateclass.lon0,
                    status: datas.status//宿舍状态，0正常 1启用程序中 2弃用程序中 3已弃用
                }
            }).then(response => {
                const {code} = response.data
                if (code === 2000) {
                    getApart(1, 100)
                    messageApi.info("修改已完成，请刷新以查看修改结果")
                    setOpenUpdate(false)//关闭下方弹出菜单
                } else {
                    const {msg} = response.data
                    messageApi.info(msg)
                    setOpenUpdate(false)//关闭下方弹出菜单
                }
            })
            return apartidlist
        })
    }

    function apartDelete (index) {
        setApartIdList((apartidlist) => {
            _axios({
                method: 'DELETE',
                url: `/api/management/apartment/${apartidlist[index]}`
            }).then(response => {
                const {code} = response.data
                if (code === 2000) {
                    getApart(1, 100)
                    messageApi.info("删除已完成,请刷新页面以查看最新结果")
                } else {
                    const {msg} = response.data
                    messageApi.info(msg)
                }
            })
        })
    }

    function getApart (page, pagesize) {
        _axios({
            method: 'GET',
            url: `/api/management/apartment?pageNum=${page}&pageSize=${pagesize}`
        }).then(response => {
            const {code, msg} = response.data
            const {list, total} = response.data.result
            if (code === 2000) {
                setTableTitle("公寓列表")
                setTablePage(Math.ceil(total / pagesize));
                setColums(apartcons)
                inittablekeys(apartcons)
                setApartIdList((apartidlist) => {
                    apartidlist = [];
                    return apartidlist
                })
                let data = []
                for (let i = 0; i < list.length; i++) {
                    setApartIdList((apartidlist) => {
                        apartidlist.push(list[i].id)
                        return apartidlist
                    })
                    let tmp = {};
                    tmp.key = uuidv4();
                    tmp.index = i;
                    tmp.name = list[i].name;
                    tmp.position = list[i].position;
                    tmp.location = list[i].location;
                    data.push(tmp)
                }
                setTableData(data)
                setTableReturned(() => {//通知子组件数据已经更新完成
                    PubSub.publish('tablereturned', true)
                    return true
                })
            } else {
                messageApi.info(msg)
            }
        })
    }

    const roomcons = [
        {
            title: '宿舍号',
            dataIndex: 'name',
            key: 'name'
        },
        {
            title: '性别',//0男 1女
            dataIndex: 'sex',
            key: 'sex'
        },
        {
            title: '用途',
            dataIndex: 'usage',
            key: 'usage'
        },
        {
            title: '房间规格',// x人间
            dataIndex: 'type',
            key: 'type'
        },
        {
            title: '干部房',//o非 1是
            dataIndex: 'isForCadre',
            key: 'isForCadre'
        },
        {
            title: '保留间',//o非 1是
            dataIndex: 'isReserved',
            key: 'isReserved'
        },
        {
            title: '房间总价',
            dataIndex: 'totalFee',
            key: 'totalFee'
        },
        {
            title: '自理部分',
            dataIndex: 'selfPayFee',
            key: 'selfPayFee'
        },
        {
            title: '单位报销',
            dataIndex: 'refundFee',
            key: 'refundFee'
        },
        {
            title: 'Action',
            key: 'action',
            render: (_, record, index) => //record 本条目下的所有数据  index 当前条目编号，从0开始
                <Space size="middle">
                    <Button type="primary" onClick={() => openUpdateDrawer(index, record, 'room')}>修改此条目</Button>
                    <Button type="primary" onClick={() => roomDelete(index)}>删除{record.name}</Button>
                </Space>

        }
    ]

    function roomCheck () {
        let flag = true;
        setApartUpdateClass((updateclass) => {
            if (updateclass.sex === 'man' || updateclass.sex === '男') {
                updateclass.sex = 0
            } else if (updateclass.sex === 'woman' || updateclass.sex === '女') {
                updateclass.sex = 1
            } else {
                messageApi.info('性别格式非法')
                flag = false
            }

            if (updateclass.isForCadre === '是') {
                updateclass.isForCadre = 1
            } else if (updateclass.isForCadre === '否') {
                updateclass.isForCadre = 0
            } else {
                messageApi.info('干部房状态格式非法')
                flag = false
            }

            if (updateclass.isReserved === '是') {
                updateclass.isReserved = 1
            } else if (updateclass.isReserved === '否') {
                updateclass.isReserved = 0
            } else {
                messageApi.info('保留间状态格式非法')
                flag = false
            }

            if (updateclass.type === '单人间') {
                updateclass.type = 1
            } else if (updateclass.type === '双人间') {
                updateclass.type = 2
            } else {
                updateclass.type = parseInt(updateclass.type.substring(0, updateclass.type.indexOf('人')))
            }

            if (parseInt(updateclass.totalFee) !== parseInt(updateclass.selfPayFee) + parseInt(updateclass.refundFee)) {
                messageApi.info('总价不等于单位报销部分和个人自理部分之和')
                console.log('总' + updateclass.totalFee + 'B' + updateclass.refundFee + 'S' + updateclass.selfPayFee)
                flag = false
            }

            return updateclass
        })
        return flag
    }

    function roomAdd () {
        if (!roomCheck()) {
            return
        }//存在非法数据，不予发送请求
        _axios({
            method: 'POST',
            url: '/api/management/room',
            data: {
                apartmentId: 1,
                name: apartupdateclass.name,
                sex: apartupdateclass.sex,
                usage: apartupdateclass.usage,
                isForCadre: apartupdateclass.isForCadre,
                isReserved: apartupdateclass.isReserved,
                type: apartupdateclass.type,
                totalFee: apartupdateclass.totalFee,
                selfPayFee: apartupdateclass.selfPayFee,
                refundFee: apartupdateclass.refundFee
            }
        }).then(response => {
            const {code} = response.data
            if (code === 2000) {
                getRoom(1, 100)
                messageApi.info("增加已完成,请刷新页面以查看最新结果")
            } else {
                const {msg} = response.data
                messageApi.info(msg)
            }
        })
    }

    function roomUpdate (index) {
        if (!roomCheck()) {
            return
        }//存在非法数据，不予发送请求
        setApartIdList((apartidlist) => {//防止异步，保证访问到最新的apartidlist
            _axios({
                method: 'PUT',
                url: `/api/management/room/${apartidlist[index]}`,
                data: {
                    apartmentId: 1,
                    name: apartupdateclass.name,
                    sex: apartupdateclass.sex,
                    usage: apartupdateclass.usage,
                    isForCadre: apartupdateclass.isForCadre,
                    isReserved: apartupdateclass.isReserved,
                    type: apartupdateclass.type,
                    totalFee: apartupdateclass.totalFee,
                    selfPayFee: apartupdateclass.selfPayFee,
                    refundFee: apartupdateclass.refundFee
                }
            }).then(response => {
                const {code} = response.data
                if (code === 2000) {
                    getRoom(1, 100)
                    messageApi.info("修改已完成，请刷新以查看修改结果")
                    setOpenUpdate(false)//关闭下方弹出菜单
                } else {
                    const {msg} = response.data
                    messageApi.info(msg)
                    setOpenUpdate(false)
                }
            })
            return apartidlist
        })
    }

    function roomDelete (id) {
        setApartIdList((apartidlist) => {
            _axios({
                method: 'DELETE',
                url: `/api/management/room/${apartidlist[id]}`
            }).then(response => {
                const {code} = response.data
                if (code === 2000) {
                    getRoom(1, 100)
                    messageApi.info("删除已完成,请刷新页面以查看最新结果")
                } else {
                    const {msg} = response.data
                    messageApi.info(msg)
                }
            })
        })
    }

    function getRoom (page, pagesize) {
        _axios.get('/api/management/room', {
            params: {
                pageNum: page,
                pageSize: pagesize,
                apartmentId: 1,
                query: "",
                isForCadre: "",//是否干部房 o非 1是
                type: ""//房间类型 （x人间）
            }
        }).then(response => {
            const {code, msg} = response.data
            const {list, total} = response.data.result
            if (code === 2000) {
                setTableTitle("房间列表")
                setTablePage(Math.ceil(total / pagesize));//页码求值向上取整
                setTablePage((tablepage) => {
                    PubSub.publish('tablepage', tablepage)
                    return tablepage
                })
                setColums(roomcons)
                inittablekeys(roomcons)
                setApartIdList((apartidlist) => {
                    apartidlist = [];
                    return apartidlist
                })
                let data = []
                for (let i = 0; i < list.length; i++) {
                    setApartIdList((apartidlist) => {
                        apartidlist.push(list[i].id)
                        return apartidlist
                    })
                    let tmp = {};
                    tmp.key = uuidv4();
                    tmp.index = i;
                    tmp.name = list[i].name;
                    if (list[i].sex === 0) {
                        tmp.sex = "man";
                    } else if (list[i].sex === 1) {
                        tmp.sex = "woman"
                    }
                    tmp.usage = list[i].usage;
                    if (list[i].type === 1) {
                        tmp.type = '单人间';
                    } else if (list[i].type === 2) {
                        tmp.type = '双人间';
                    } else {
                        tmp.type = list[i].type + '人间';
                    }

                    if (list[i].isForCadre) {
                        tmp.isForCadre = '是'
                    } else {
                        tmp.isForCadre = '否'
                    }

                    if (list[i].isReserved) {
                        tmp.isReserved = '是'
                    } else {
                        tmp.isReserved = '否'
                    }

                    tmp.totalFee = list[i].totalFee
                    tmp.selfPayFee = list[i].selfPayFee
                    tmp.refundFee = list[i].refundFee

                    data.push(tmp)
                }
                setTableData(data)
                setTableReturned(() => {//通知子组件数据已经更新完成
                    PubSub.publish('tablereturned', true)
                    return true
                })
            } else {
                messageApi.info(msg)
            }
        })
    }

    const bedcons = [
        {
            title: '床位ID',
            dataIndex: 'id',
            key: 'id'
        },
        {
            title: '床位名',
            dataIndex: 'name',
            key: 'name'
        },
        {
            title: '所属房间的id',
            dataIndex: 'roomId',
            key: 'roomId'
        },
        {
            title: '押金收据单号',
            dataIndex: 'receiptId',
            key: 'receiptId'
        },
        {
            title: '床位使用情况',//0非 1是
            dataIndex: 'isInUse',
            key: 'isInUse'
        },
        {
            title: 'Action',
            key: 'action',
            render: (_, record, index) => //record 本条目下的所有数据  index 当前条目编号，从0开始
                <Space size="middle">
                    <Button type="primary" onClick={() => openUpdateDrawer(index, record, 'bed')}>修改此条目</Button>
                    <Button type="primary" onClick={() => bedDelete(index)}>删除{record.name}</Button>
                </Space>

        }
    ]

    function bedCheck () {
        let flag = true
        setApartUpdateClass((updateclass) => {
            if (updateclass.isInUse === '是') {
                updateclass.isInUse = 1
            } else if (updateclass.isInUse === '否') {
                updateclass.isInUse = 0
            } else {
                messageApi.info('床位使用情况格式非法')
                flag = false
            }
            return updateclass
        })
        return flag
    }

    function bedAdd () {
        // if(!bedCheck()){return}//存在非法数据，不予发送请求
        _axios({
            method: 'POST',
            url: '/api/management/bed',
            data: {
                name: apartupdateclass.name,
                roomId: apartupdateclass.roomId
                // receiptId:apartupdateclass.receiptId,
                // isInUse:apartupdateclass.isInUse,
            }
        }).then(response => {
            const {code} = response.data
            if (code === 2000) {
                getBed(1, 100)
                messageApi.info("增加已完成,请刷新页面以查看最新结果")
            } else {
                const {msg} = response.data
                messageApi.info(msg)
            }
        })
    }

    function bedUpdate (index) {
        if (!bedCheck()) {
            return
        }//存在非法数据，不予发送请求

        setApartIdList((apartidlist) => {//防止异步，保证访问到最新的apartidlist
            _axios({
                method: 'PUT',
                url: `/api/management/bed/${apartidlist[index]}`,
                data: {
                    name: apartupdateclass.name,
                    roomId: apartupdateclass.roomId,
                    receiptId: apartupdateclass.receiptId,
                    isInUse: apartupdateclass.isInUse
                }
            }).then(response => {
                const {code} = response.data
                if (code === 2000) {
                    getBed(1, 100)
                    messageApi.info("修改已完成，请刷新以查看修改结果")
                    setOpenUpdate(false)//关闭下方弹出菜单
                } else {
                    const {msg} = response.data
                    messageApi.info(msg)
                    setOpenUpdate(false)
                }
            })
            return apartidlist
        })
    }

    function bedDelete (id) {
        setApartIdList((apartidlist) => {
            _axios({
                method: 'DELETE',
                url: `/api/management/bed/${apartidlist[id]}`
            }).then(response => {
                const {code} = response.data
                if (code === 2000) {
                    getBed(1, 100)
                    messageApi.info("删除已完成,请刷新页面以查看最新结果")
                } else {
                    const {msg} = response.data
                    messageApi.info(msg)
                }
            })
        })
    }

    function getBed (page, pagesize) {
        _axios.get('/api/management/bed', {
            params: {
                pageNum: page,
                pageSize: pagesize,
                apartmentId: "",
                query: "",
                roomId: "",
                isInUse: ""
            }
        }).then(response => {
            const {code, msg} = response.data
            const {list, total} = response.data.result
            if (code === 2000) {
                setTableTitle("床位列表")
                setTablePage(Math.ceil(total / pagesize));//页码求值向上取整
                setTablePage((tablepage) => {
                    PubSub.publish('tablepage', tablepage)
                    return tablepage
                })
                setColums(bedcons)
                inittablekeys(bedcons)
                setApartIdList((apartidlist) => {
                    apartidlist = [];
                    return apartidlist
                })
                let data = []
                for (let i = 0; i < list.length; i++) {
                    setApartIdList((apartidlist) => {
                        apartidlist.push(list[i].id)
                        return apartidlist
                    })
                    let tmp = {};
                    tmp.key = uuidv4();
                    tmp.index = i;
                    tmp.id = list[i].id;
                    tmp.name = list[i].name;
                    tmp.roomId = list[i].roomId;
                    tmp.receiptId = list[i].receiptId;
                    if (list[i].isInUse === 1) {
                        tmp.isInUse = '是'
                    } else {
                        tmp.isInUse = '否'
                    }

                    data.push(tmp)
                }
                setTableData(data)
                setTableReturned(() => {//通知子组件数据已经更新完成
                    PubSub.publish('tablereturned', true)
                    return true
                })
            } else {
                messageApi.info(msg)
            }
        })
    }

    const outpaycons = [
        {
            title: '支票ID',
            dataIndex: 'chequeId',
            key: 'chequeId'
        },
        {
            title: '公寓ID',
            dataIndex: 'departmentId',
            key: 'departmentId'
        },
        {
            title: '是否已支付',//0非 1是
            dataIndex: 'hasPaid',
            key: 'hasPaid'
        },
        {
            title: '创建时间',
            dataIndex: 'createTime',
            key: 'createTime'
        },
        {
            title: '支付时间',
            dataIndex: 'payTime',
            key: 'payTime'
        },
        {
            title: '金额',
            dataIndex: 'price',
            key: 'price'
        }
    ]

    function getOutPay (page, pagesize) {
        _axios.get('/api/finance/center/withhold', {
            params: {
                pageNum: page,
                pageSize: pagesize
            }
        }).then(response => {
            const {code, msg} = response.data
            const {list, total} = response.data.result
            if (code === 2000) {
                setTableTitle("外部单位代扣表")
                // console.log(list)
                setColums(outpaycons)
                inittablekeys(outpaycons)

                setApartIdList((apartidlist) => {
                    apartidlist = [];
                    return apartidlist
                })
                let data = []
                for (let i = 0; i < list.length; i++) {
                    setApartIdList((apartidlist) => {
                        apartidlist.push(list[i].id)
                        return apartidlist
                    })
                    let tmp = {};
                    tmp.key = uuidv4();
                    tmp.index = i;
                    tmp.id = list[i].id;
                    tmp.chequeId = list[i].chequeId;
                    tmp.departmentId = list[i].departmentId;

                    if (list[i].hasPaid === 1) {
                        tmp.hasPaid = '是'
                    } else {
                        tmp.hasPaid = '否'
                    }

                    tmp.createTime = list[i].createTime;
                    tmp.payTime = list[i].payTime;
                    tmp.price = list[i].price;

                    data.push(tmp)
                }
                setTableData(data)

                setTableReturned(() => {//通知子组件数据已经更新完成
                    PubSub.publish('tablereturned', true)
                    return true
                })
            } else {
                messageApi.info(msg)
            }
        })
    }

    function login (num, user) {
        changeLoged((loged) => {
            // console.log(loged)
            return true;
        })
        changeLognum(num);
        setUserId(user.id)
        // console.log('usernum'+num)
        // console.log(loged)
        setUserMsg(user.name);
    }

    function logOut () {
        window.localStorage.removeItem('token')
        changeLoged(false)
    }

    // console.log(loged)
    if (loged) {
        return (
            <div>
                {contextHolder}
                <Home lognum={lognum} userid={userid} usermsg={usermsg} textitem={textitem}
                      columns={columns} tabledata={tabledata} tablepage={tablepage} tabletitle={tabletitle}
                      logOut={logOut}
                      getApart={getApart} getRoom={getRoom} getBed={getBed} getOutPay={getOutPay}
                      openAddDrawer={openAddDrawer} addButtons={addButtons} tableitems={tableitems}
                      apartAdd={apartAdd} roomAdd={roomAdd} bedAdd={bedAdd}/>
                <DownDrawer type={updatedrawertype} title={drawertitle} placement="bottom"
                            onClose={() => setOpenUpdate(false)} open={openupdate} tableitems={tableitems}
                            records={records}
                            apartUpdate={apartUpdate} roomUpdate={roomUpdate} bedUpdate={bedUpdate}/>
            </div>
        )
    }
    return (
        <div className="login-box">
            <div className='glass' style={{borderRadius: '10px'}}>
                <div className='innerlogin'>
                    <p>公寓员工管理系统</p>
                    <img alt={ '员工公寓管理系统' } src={imgUrl}/>
                    {/* <div>
            <LoginHeader changeNav={changeNav}/>
          </div> */}
                    {/* <Login/> */}
                    {/* <MyNavLink to="/login">login</MyNavLink>
            <MyNavLink to="/register">register</MyNavLink> */}

                    {/* React v6新特性，移除了switch和redirect，switch被Routes替代，components被elements替代 */}
                    <Routes>
                        <Route path="/login" element={<Login login={login}/>}/>
                        <Route path="/register" element={<Register/>}/>
                        {/* 重定向的实现需要借助Navigate */}
                        <Route path="*" element={<Navigate to="/login"/>}/>
                    </Routes>
                </div>
            </div>
        </div>
    )

}

export default App
