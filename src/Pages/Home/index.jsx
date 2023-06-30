import React, { useEffect } from 'react'
import { useState } from 'react';
import { Route, Routes, Navigate, useNavigate } from 'react-router-dom'
import Layout, { Content, Header } from 'antd/es/layout/layout';
import Sider from 'antd/es/layout/Sider';
import { Space } from 'antd';
import LeftMenu from '../../Component/LeftMenu';
import Welcome from '../../Component/Welcome';
import ApartTable from '../../Component/ApartTable';


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
    color: '#fff',
    backgroundColor: '#108ee9',
  };
  const siderStyle = {
    textAlign: 'center',
    lineHeight: '120px',
    // color: '#fff',
    // backgroundColor: '#3ba0e9',
  };

export default function Home(props) {
  const{lognum,textitem,usermsg}=props
  const [collapsed, setCollapsed] = useState(false);
  return (
    <Space direction="vertical" style={{ width: '100%' }} size={[0, 48]}>
        <Layout style={{ minHeight: '100vh' }}>
            <Sider style={siderStyle} collapsible collapsed={collapsed} onCollapse={(value) => setCollapsed(value)}>
            <LeftMenu mode="inline" theme="dark" textitem={textitem[lognum].item} />
            </Sider>
            <Layout>
            <Content style={contentStyle}>
                <Routes>
                    <Route path="/home/welcome" element={<Welcome job={textitem[lognum].name} usermsg={usermsg} />} />
                    <Route path='/home/apart' element={<ApartTable/>} />
                    
                    <Route path="*" element={<Navigate to="/home/welcome" />} />
                </Routes>
            </Content>
            </Layout>
        </Layout>
    </Space>
  )
}
