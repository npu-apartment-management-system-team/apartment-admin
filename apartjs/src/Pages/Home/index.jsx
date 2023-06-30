import React from 'react'
import { Route, Routes, Navigate, useNavigate } from 'react-router-dom'
import Layout, { Content, Header } from 'antd/es/layout/layout';
import Sider from 'antd/es/layout/Sider';
import { Space } from 'antd';
import LeftMenu from '../../Component/LeftMenu';
import Welcome from '../../Component/Welcome';
import ApartTable from '../../Component/ApartTable';

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
  const [collapsed, setCollapsed] = useState(false);
  return (
    <Space direction="vertical" style={{ width: '100%' }} size={[0, 48]}>
        <Layout style={{ minHeight: '100vh' }}>
            <Sider style={siderStyle} collapsible collapsed={collapsed} onCollapse={(value) => setCollapsed(value)}>
            <LeftMenu mode="inline" theme="dark" textitem={textitem[lognum].item} />
            </Sider>
            <Layout>
            <Content style={contentStyle}>
                <ApartTable/>
                <Routes>
                    <Route path="/welcome" element={<Welcome job={props.textitem[lognum].name} usermsg={usermsg} />} />
                    
                    <Route path="*" element={<Navigate to="/welcome" />} />
                </Routes>
            </Content>
            </Layout>
        </Layout>
    </Space>
  )
}
