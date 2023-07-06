import React, { useEffect } from 'react'
import { useState } from 'react';
import { Route, Routes, Navigate, useNavigate } from 'react-router-dom'
import { Col, Row } from 'antd';
import Layout, { Content, Header } from 'antd/es/layout/layout';
import Sider from 'antd/es/layout/Sider';
import { Button, Space } from 'antd';
import LeftMenu from '../../Component/LeftMenu';
import Welcome from '../../Component/Welcome';
import ApartTable from '../../Component/ApartTable';
import AddTable from '../../Component/AddTable';
import { countSubscriptions } from 'pubsub-js';
import CollectMsg from '../../Component/CollectMsg';
import ReceiveBox from '../../Component/ReceiveBox';
import Review from '../../Component/Review';
import PayTable from '../../Component/PayTable';


const headerStyle = {
  textAlign: 'center',
  color: '#fff',
  height: 64,
  paddingInline: 50,
  lineHeight: '64px',
  backgroundColor: '#7dbcea',
};
const contentStyle = {
    textAlign: 'center',
    minHeight: 120,
    lineHeight: '120px',
    color: '#000',
    backgroundColor: '#eee',
  };
  const siderStyle = {
    textAlign: 'center',
    lineHeight: '120px',
    // color: '#fff',
    // backgroundColor: '#3ba0e9',
  };

export default function Home(props) {
  const {logOut}=props

  const {openAddDrawer,tableitems}=props
  const {apartAdd,roomAdd,bedAdd}=props

  const {getApart,getRoom,getBed,getOutPay}=props
  const{lognum,userid,textitem,usermsg,columns,tabledata,tablepage,tabletitle}=props
  const routers=textitem[lognum].routers
  const [collapsed, setCollapsed] = useState(false);

  function logOutClick(){
    logOut();
  }

  if(lognum===1){
    return (
      <Space direction="vertical" style={{ width: '100%' }} size={[0, 48]}>
          <Layout style={{ minHeight: '100vh' }}>
              <Sider style={siderStyle} collapsible collapsed={collapsed} onCollapse={(value) => setCollapsed(value)}>
              <LeftMenu mode="inline" theme="dark" textitem={textitem[lognum].item} routers={routers} />
              </Sider>
              <Layout>
              <Header>
                <Row>
                  <Col span={12} style={{ display:'flex', justifyContent: 'start', alignItems:"center" }}>
                    <ReceiveBox />
                  </Col>
                  <Col span={12} style={{ display:'flex', justifyContent: 'end', alignItems:"center" }}>
                    <Button onClick={logOutClick} >LogOut</Button>
                  </Col>
                </Row> 
              </Header>
              <Content style={contentStyle}>
                  <Routes>
                      <Route path="/home/welcome" element={<Welcome job={textitem[lognum].name} usermsg={usermsg} />} />
                      
                      <Route path="*" element={<Navigate to="/home/welcome" />} />
                  </Routes>
              </Content>
              </Layout>
          </Layout>
      </Space>
    )
  }else if(lognum===2){
    return (
      <Space direction="vertical" style={{ width: '100%' }} size={[0, 48]}>
          <Layout style={{ minHeight: '100vh' }}>
              <Sider style={siderStyle} collapsible collapsed={collapsed} onCollapse={(value) => setCollapsed(value)}>
              <LeftMenu mode="inline" theme="dark" textitem={textitem[lognum].item} routers={routers} />
              </Sider>
              <Layout>
              <Header>
                <Row>
                  <Col span={12} style={{ display:'flex', justifyContent: 'start', alignItems:"center" }}>
                    <ReceiveBox />
                  </Col>
                  <Col span={12} style={{ display:'flex', justifyContent: 'end', alignItems:"center" }}>
                    <Button onClick={logOutClick} >LogOut</Button>
                  </Col>
                </Row> 
              </Header>
              <Content style={contentStyle}>
                  <Routes>
                      <Route path="/home/welcome" element={<Welcome job={textitem[lognum].name} usermsg={usermsg} />} />
                      <Route path='/home/checkin' element={<Review lognum={lognum} />} />
                      
                      <Route path="*" element={<Navigate to="/home/welcome" />} />
                  </Routes>
              </Content>
              </Layout>
          </Layout>
      </Space>
    )
  }else if(lognum===3){
    return (
      <Space direction="vertical" style={{ width: '100%' }} size={[0, 48]}>
          <Layout style={{ minHeight: '100vh' }}>
              <Sider style={siderStyle} collapsible collapsed={collapsed} onCollapse={(value) => setCollapsed(value)}>
              <LeftMenu mode="inline" theme="dark" textitem={textitem[lognum].item} routers={routers} />
              </Sider>
              <Layout>
              <Header>
                <Row>
                  <Col span={12} style={{ display:'flex', justifyContent: 'start', alignItems:"center" }}>
                    <ReceiveBox />
                  </Col>
                  <Col span={12} style={{ display:'flex', justifyContent: 'end', alignItems:"center" }}>
                    <Button onClick={logOutClick} >LogOut</Button>
                  </Col>
                </Row> 
              </Header>
              <Content style={contentStyle}>
                  <Routes>
                      <Route path="/home/welcome" element={<Welcome job={textitem[lognum].name} usermsg={usermsg} />} />
                      <Route path='/home/promise' element={<Review lognum={lognum}
                      tableitems={tableitems}
                      getBed={getBed} tabletype={'bed'} columns={columns} tabledata={tabledata} tablepage={tablepage} tabletitle={tabletitle} />} />
                      <Route path='/home/apart' element={<ApartTable tableitems={tableitems} openAddDrawer={()=>openAddDrawer('apart')} addMsg={textitem[lognum].addmessages.apart} addfun={apartAdd}
                      getApart={getApart} tabletype={'apart'} columns={columns} tabledata={tabledata} tablepage={tablepage} tabletitle={tabletitle} />} />
  
                      <Route path='/home/room' element={<ApartTable tableitems={tableitems} openAddDrawer={()=>openAddDrawer('room')} addMsg={textitem[lognum].addmessages.room} addfun={roomAdd}
                      getRoom={getRoom} tabletype={'room'} columns={columns} tabledata={tabledata} tablepage={tablepage} tabletitle={tabletitle} />} />
  
                      <Route path='/home/bed' element={<ApartTable tableitems={tableitems} openAddDrawer={()=>openAddDrawer('bed')} addMsg={textitem[lognum].addmessages.bed} addfun={bedAdd}
                      getBed={getBed} tabletype={'bed'} columns={columns} tabledata={tabledata} tablepage={tablepage} tabletitle={tabletitle} />} />
                      
                      <Route path="*" element={<Navigate to="/home/welcome" />} />
                  </Routes>
              </Content>
              </Layout>
          </Layout>
      </Space>
    )
  }else if(lognum===4){
    return (
      <Space direction="vertical" style={{ width: '100%' }} size={[0, 48]}>
          <Layout style={{ minHeight: '100vh' }}>
              <Sider style={siderStyle} collapsible collapsed={collapsed} onCollapse={(value) => setCollapsed(value)}>
              <LeftMenu mode="inline" theme="dark" textitem={textitem[lognum].item} routers={routers} />
              </Sider>
              <Layout>
              <Header>
                <Row>
                  <Col span={12} style={{ display:'flex', justifyContent: 'start', alignItems:"center" }}>
                    <ReceiveBox />
                  </Col>
                  <Col span={12} style={{ display:'flex', justifyContent: 'end', alignItems:"center" }}>
                    <Button onClick={logOutClick} >LogOut</Button>
                  </Col>
                </Row>   
              </Header>
              <Content style={contentStyle}>
                  <Routes>
                      <Route path="/home/welcome" element={<Welcome job={textitem[lognum].name} usermsg={usermsg} />} />
                      <Route path='/home/paylist' element={<PayTable tableitems={tableitems}
                      getOutPay={getOutPay} tabletype={'bed'} columns={columns} tabledata={tabledata} tablepage={tablepage} tabletitle={tabletitle} />} />
                      <Route path="/home/collectmsg" element={<CollectMsg lognum={lognum} userid={userid} />} />
                      
                      <Route path="*" element={<Navigate to="/home/welcome" />} />
                  </Routes>
              </Content>
              </Layout>
          </Layout>
      </Space>
    )
  }else if(lognum===5){
    return (
      <Space direction="vertical" style={{ width: '100%' }} size={[0, 48]}>
          <Layout style={{ minHeight: '100vh' }}>
              <Sider style={siderStyle} collapsible collapsed={collapsed} onCollapse={(value) => setCollapsed(value)}>
              <LeftMenu mode="inline" theme="dark" textitem={textitem[lognum].item} routers={routers} />
              </Sider>
              <Layout>
              <Header>
                <Row>
                  <Col span={12} style={{ display:'flex', justifyContent: 'start', alignItems:"center" }}>
                    <ReceiveBox />
                  </Col>
                  <Col span={12} style={{ display:'flex', justifyContent: 'end', alignItems:"center" }}>
                    <Button onClick={logOutClick} >LogOut</Button>
                  </Col>
                </Row> 
              </Header>
              <Content style={contentStyle}>
                  <Routes>
                      <Route path="/home/welcome" element={<Welcome job={textitem[lognum].name} usermsg={usermsg} />} />
                      
                      <Route path="*" element={<Navigate to="/home/welcome" />} />
                  </Routes>
              </Content>
              </Layout>
          </Layout>
      </Space>
    )
  }else if(lognum===6){
    return (
      <Space direction="vertical" style={{ width: '100%' }} size={[0, 48]}>
          <Layout style={{ minHeight: '100vh' }}>
              <Sider style={siderStyle} collapsible collapsed={collapsed} onCollapse={(value) => setCollapsed(value)}>
              <LeftMenu mode="inline" theme="dark" textitem={textitem[lognum].item} routers={routers} />
              </Sider>
              <Layout>
              <Header>
                <Row>
                  <Col span={12} style={{ display:'flex', justifyContent: 'start', alignItems:"center" }}>
                    <ReceiveBox />
                  </Col>
                  <Col span={12} style={{ display:'flex', justifyContent: 'end', alignItems:"center" }}>
                    <Button onClick={logOutClick} >LogOut</Button>
                  </Col>
                </Row> 
              </Header>
              <Content style={contentStyle}>
                  <Routes>
                      <Route path="/home/welcome" element={<Welcome job={textitem[lognum].name} usermsg={usermsg} />} />
                      <Route path='/home/checkin' element={<Review lognum={lognum} />} />
                      
                      <Route path="*" element={<Navigate to="/home/welcome" />} />
                  </Routes>
              </Content>
              </Layout>
          </Layout>
      </Space>
    )
  }else if(lognum===7){
    return (
      <Space direction="vertical" style={{ width: '100%' }} size={[0, 48]}>
          <Layout style={{ minHeight: '100vh' }}>
              <Sider style={siderStyle} collapsible collapsed={collapsed} onCollapse={(value) => setCollapsed(value)}>
              <LeftMenu mode="inline" theme="dark" textitem={textitem[lognum].item} routers={routers} />
              </Sider>
              <Layout>
              <Header>
                <Row>
                  <Col span={12} style={{ display:'flex', justifyContent: 'start', alignItems:"center" }}>
                    <ReceiveBox />
                  </Col>
                  <Col span={12} style={{ display:'flex', justifyContent: 'end', alignItems:"center" }}>
                    <Button onClick={logOutClick} >LogOut</Button>
                  </Col>
                </Row> 
              </Header>
              <Content style={contentStyle}>
                  <Routes>
                      <Route path="/home/welcome" element={<Welcome job={textitem[lognum].name} usermsg={usermsg} />} />
                      
                      <Route path="*" element={<Navigate to="/home/welcome" />} />
                  </Routes>
              </Content>
              </Layout>
          </Layout>
      </Space>
    )
  }
}
